#!/bin/bash

# Incluir o arquivo de configuração
source ./config.sh

# Lista os backups disponíveis
echo "Backups disponíveis:"
BACKUPS=($(ls -1t $BACKUP_PATH))
for ((i=0; i<${#BACKUPS[@]}; i++)); do
  echo "$i) ${BACKUPS[i]}"
done

# Solicita ao usuário que escolha um backup
read -p "Escolha o número do backup que deseja restaurar: " SELECTED_BACKUP_NUM

# Verifica se a escolha do usuário é válida
if [[ ! "$SELECTED_BACKUP_NUM" =~ ^[0-9]+$ ]] || [ "$SELECTED_BACKUP_NUM" -ge "${#BACKUPS[@]}" ]; then
  echo "Seleção inválida."
  exit 1
fi

SELECTED_BACKUP="${BACKUPS[SELECTED_BACKUP_NUM]}"

# Restaura o backup selecionado
echo "Restaurando o backup selecionado: $SELECTED_BACKUP"
mongorestore --host $MONGO_HOST --port $MONGO_PORT --username $MONGO_USER --password $MONGO_PASSWORD --db $MONGO_DB $BACKUP_PATH/$SELECTED_BACKUP/$MONGO_DB

# Verifica se a restauração foi bem-sucedida
if [ $? -eq 0 ]; then
  echo "Restauração do banco de dados $DB_NAME concluída com sucesso."

  # Verifique a existência da coleção "buildings" no banco de dados restaurado
  EXISTS_BUILDINGS=$(mongo --host $MONGO_HOST --port $MONGO_PORT --username $MONGO_USER --password $MONGO_PASSWORD --eval "db.getCollectionNames().indexOf('buildings') != -1")

  if [ "$EXISTS_BUILDINGS" = "true" ]; then
    echo "A coleção 'buildings' foi restaurada com sucesso no banco de dados."
  else
    echo "Erro: A coleção 'buildings' não foi encontrada após a restauração do banco de dados."
  fi

  # Verifique o número de coleções no backup
  COLLECTION_COUNT_BACKUP=$(ls -1 $BACKUP_PATH/$SELECTED_BACKUP/$MONGO_DB | grep '.bson' | wc -l)

  # Verifique o número atual de coleções no banco de dados
  COLLECTION_COUNT_CURRENT=$(mongo --host $MONGO_HOST --port $MONGO_PORT --username $MONGO_USER --password $MONGO_PASSWORD --eval "db.getCollectionNames().length")

  if [ "$COLLECTION_COUNT_BACKUP" -eq "$COLLECTION_COUNT_CURRENT" ]; then
    echo "O número de coleções no backup é igual ao número atual no banco de dados."
  else
    echo "Erro: O número de coleções no backup não corresponde ao número atual no banco de dados."
  fi

else
  echo "Erro durante a restauração do banco de dados $DB_NAME."
  exit 1
fi
