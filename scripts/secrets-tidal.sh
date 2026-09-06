#!/usr/bin/env bash
# Envia as variaveis do Tidal do .env.local para os secrets do repositorio.
#
# Os dois lugares precisam ter o mesmo conteudo porque o site le a API do Tidal
# durante o build, e o build roda nos dois: na sua maquina (lendo .env.local) e
# no GitHub Actions (lendo os secrets). Este script existe para nao depender de
# copiar e colar valor a valor — foi assim que a primeira tentativa deu errado.
#
#   ./scripts/secrets-tidal.sh
#
# Use tambem ao trocar a playlist: edite TIDAL_PLAYLIST no .env.local, rode
# isto, e dispare um deploy. Nenhum commit necessario.
set -euo pipefail

REPO="vinirossado/portfolio"
ENV_FILE="$(cd "$(dirname "$0")/.." && pwd)/.env.local"

if [ ! -f "$ENV_FILE" ]; then
  echo "nao achei $ENV_FILE" >&2
  exit 1
fi

for CHAVE in TIDAL_CLIENT_ID TIDAL_CLIENT_SECRET TIDAL_PLAYLIST; do
  # `cut -f2-` preserva '=' dentro do valor (o client secret do Tidal termina
  # em '='); `tr -d` remove o \n final, que viraria parte do segredo.
  VALOR=$(grep "^${CHAVE}=" "$ENV_FILE" | head -1 | cut -d= -f2- | tr -d '\n\r')
  if [ -z "$VALOR" ]; then
    echo "  vazio no .env.local: ${CHAVE} — pulando" >&2
    continue
  fi
  # Pelo pipe: o valor nunca aparece na linha de comando nem no historico do
  # shell, e nao fica visivel em `ps`.
  printf '%s' "$VALOR" | gh secret set "$CHAVE" --repo "$REPO"
done
