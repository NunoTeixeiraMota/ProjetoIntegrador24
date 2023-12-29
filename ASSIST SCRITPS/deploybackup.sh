#!/bin/bash

# MongoDB connection string
MONGO_CONN_STRING="mongodb://mongoadmin:105711abb1e672194c53cbe4@vsgate-s1.dei.isep.ipp.pt:11147/?authMechanism=DEFAULT"

# Set the backup path
BACKUP_PATH="/srv/MongoDB/Backup" # Update this to your backups directory

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
mongorestore --uri "$MONGO_CONN_STRING" $BACKUP_PATH/$SELECTED_BACKUP

# Verifica se a restauração foi bem-sucedida
if [ $? -eq 0 ]; then
  echo "Restauração do banco de dados concluída com sucesso."

  # Verifique a existência da coleção "buildings" no banco de dados restaurado
  EXISTS_BUILDINGS=$(mongo "$MONGO_CONN_STRING" --eval "db.getCollectionNames().indexOf('buildings') != -1")

  if [ "$EXISTS_BUILDINGS" = "true" ]; then
    echo "A coleção 'buildings' foi restaurada com sucesso no banco de dados."
  else
    echo "Erro: A coleção 'buildings' não foi encontrada após a restauração do banco de dados."
  fi

  # Outras verificações podem ser adicionadas aqui conforme necessário

else
  echo "Erro durante a restauração do banco de dados."
  exit 1
fi
