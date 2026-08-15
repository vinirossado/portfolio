#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Deploy Portfolio (Next.js) to Azure Static Web Apps
# ---------------------------------------------------------------------------
# Usage:
#   ./infra/deploy.sh [resource-group]
#
# Example:
#   ./infra/deploy.sh urlshortener-dev
# ---------------------------------------------------------------------------
set -euo pipefail

RESOURCE_GROUP="urlshortener-dev"
APP_NAME="vinirossado-portfolio"
CUSTOM_DOMAIN="vinirossado.dev"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
OUT_DIR="$PROJECT_DIR/out"

echo "==> Building Next.js app..."
cd "$PROJECT_DIR"
npm ci --silent
npm run build
cd "$SCRIPT_DIR"

echo ""
echo "==> Deploying infrastructure (Bicep)..."
az deployment group create \
  --resource-group "$RESOURCE_GROUP" \
  --template-file "$SCRIPT_DIR/main.bicep" \
  --parameters appName="$APP_NAME" \
  --output table

echo ""
echo "==> Setting up custom domain..."
# Check if domain is already bound
EXISTING=$(az staticwebapp hostname list \
  --name "$APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --query "[?domainName=='$CUSTOM_DOMAIN'].domainName" \
  --output tsv 2>/dev/null || true)

if [ -z "$EXISTING" ]; then
  # Start the hostname binding (this generates the validation token)
  echo "  Initiating domain binding for $CUSTOM_DOMAIN..."
  az staticwebapp hostname set \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --hostname "$CUSTOM_DOMAIN" \
    --validation-method "dns-txt-token" \
    --no-wait \
    --output none 2>/dev/null || true

  # Wait a moment for the validation token to be generated
  sleep 5

  # Get the validation token
  VALIDATION_TOKEN=$(az staticwebapp hostname show \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --hostname "$CUSTOM_DOMAIN" \
    --query "validationToken" \
    --output tsv 2>/dev/null || true)

  if [ -n "$VALIDATION_TOKEN" ]; then
    echo "  Validation token: $VALIDATION_TOKEN"

    # Create/update _dnsauth TXT record in Azure DNS
    az network dns record-set txt add-record \
      --resource-group "$RESOURCE_GROUP" \
      --zone-name "$CUSTOM_DOMAIN" \
      --record-set-name "_dnsauth" \
      --value "$VALIDATION_TOKEN" \
      --output none 2>/dev/null || true

    echo "  TXT record _dnsauth.$CUSTOM_DOMAIN set."
    echo "  Domain validation in progress (may take a few minutes)."
  else
    echo "  WARNING: Could not retrieve validation token yet."
    echo "  Re-run this script once the SWA resource is fully provisioned."
  fi
else
  echo "  Custom domain $CUSTOM_DOMAIN is already bound."
fi

echo ""
echo "==> Deploying to Azure Static Web Apps..."
DEPLOY_TOKEN=$(az staticwebapp secrets list \
  --name "$APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --query "properties.apiKey" \
  --output tsv)

swa deploy "$OUT_DIR" \
  --deployment-token "$DEPLOY_TOKEN" \
  --env production

echo ""
echo "==> Done!"
echo ""
echo "  Website: https://$CUSTOM_DOMAIN"
echo ""
echo "  Azure hostname: https://$(az staticwebapp show --name "$APP_NAME" --resource-group "$RESOURCE_GROUP" --query defaultHostname --output tsv)"
echo ""
echo "==> Azure DNS Name Servers (set these at your domain registrar):"
az network dns zone show \
  --name "$CUSTOM_DOMAIN" \
  --resource-group "$RESOURCE_GROUP" \
  --query "nameServers" \
  --output tsv
echo ""
