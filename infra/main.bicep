// ---------------------------------------------------------------------------
// Portfolio – Static Web App (vinirossado.dev)
// ---------------------------------------------------------------------------
//
// Deploy:
//   az deployment group create \
//     --resource-group urlshortener-dev \
//     --template-file infra/main.bicep
//
// After the resource is created, deploy content with deploy.sh.
//
// DNS setup:
//   After first deploy, update your domain registrar's nameservers to the
//   Azure DNS nameservers printed in the deployment output.
// ---------------------------------------------------------------------------

@description('Name of the Static Web App resource')
param appName string = 'vinirossado-portfolio'

@description('Azure region (Static Web Apps support a limited set of regions)')
@allowed([
  'centralus'
  'eastus2'
  'eastasia'
  'westeurope'
  'westus2'
])
param location string = 'westeurope'

@description('SKU for the Static Web App')
@allowed([
  'Free'
  'Standard'
])
param sku string = 'Free'

@description('Custom domain (empty string to skip DNS zone creation)')
param customDomain string = 'vinirossado.dev'

// ---------------------------------------------------------------------------
// Static Web App
// ---------------------------------------------------------------------------
resource staticWebApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: appName
  location: location
  sku: {
    name: sku
    tier: sku
  }
  properties: {
    stagingEnvironmentPolicy: 'Disabled'
    allowConfigFileUpdates: true
    buildProperties: {
      skipGithubActionWorkflowGeneration: true
    }
  }
  tags: {
    project: 'portfolio'
    purpose: 'website'
  }
}

// ---------------------------------------------------------------------------
// Azure DNS Zone
// ---------------------------------------------------------------------------
resource dnsZone 'Microsoft.Network/dnsZones@2018-05-01' = if (!empty(customDomain)) {
  name: customDomain
  location: 'global'
  tags: {
    project: 'portfolio'
  }
}

// ---------------------------------------------------------------------------
// DNS Records
// ---------------------------------------------------------------------------

// CNAME for www subdomain → Azure SWA default hostname
resource wwwCname 'Microsoft.Network/dnsZones/CNAME@2018-05-01' = if (!empty(customDomain)) {
  parent: dnsZone
  name: 'www'
  properties: {
    TTL: 3600
    CNAMERecord: {
      cname: staticWebApp.properties.defaultHostname
    }
  }
}

// Apex domain — ALIAS record via Azure DNS A record with targetResource
resource apexAlias 'Microsoft.Network/dnsZones/A@2018-05-01' = if (!empty(customDomain)) {
  parent: dnsZone
  name: '@'
  properties: {
    TTL: 3600
    targetResource: {
      id: staticWebApp.id
    }
  }
}

// NOTE: The _dnsauth TXT record and custom domain binding are handled by
// deploy.sh because the validation token is only available after the SWA
// resource is created (not accessible as a Bicep property).

// ---------------------------------------------------------------------------
// Outputs
// ---------------------------------------------------------------------------
@description('Default hostname of the Static Web App')
output defaultHostname string = staticWebApp.properties.defaultHostname

@description('Custom domain URL')
output customDomainUrl string = !empty(customDomain) ? 'https://${customDomain}' : 'https://${staticWebApp.properties.defaultHostname}'

@description('Resource ID')
output resourceId string = staticWebApp.id

@description('Azure DNS name servers (set these at your domain registrar)')
output nameServers array = !empty(customDomain) ? dnsZone.properties.nameServers : []
