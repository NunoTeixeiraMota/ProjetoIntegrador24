#!/bin/sh

# MongoDB connection string
. ./config.sh
# Set the backup path
BACKUP_PATH="/srv/MongoDB/Backup"

# Lista os backups disponíveis
echo "Backups disponíveis:"
BACKUPS=$(ls -1t "$BACKUP_PATH")
index=0

for backup in $BACKUPS; do
    echo "$index) $backup"
    index=$((index + 1))
done

# Solicita ao usuário que escolha um backup
read -rp "Escolha o número do backup que deseja restaurar: " SELECTED_BACKUP_NUM

# Verifica se a escolha do usuário é válida
if [ "$SELECTED_BACKUP_NUM" -ge 0 ] && [ "$SELECTED_BACKUP_NUM" -lt "$index" ]; then
    SELECTED_BACKUP=$(echo "$BACKUPS" | sed -n "$((SELECTED_BACKUP_NUM + 1))p")
    
    # Restaura o backup selecionado
    echo "Restaurando o backup selecionado: $SELECTED_BACKUP"
    if mongorestore --drop --uri "$MONGO_CONN_STRING" "$BACKUP_PATH/$SELECTED_BACKUP"; then
        echo "Restauração do banco de dados concluída com sucesso."
        
        # Verifica a existência da coleção 'buildings' usando mongoexport
        if mongoexport --uri "$MONGO_URI" --collection=buildings --limit=1 --authenticationDatabase=admin --quiet; then
            echo "A coleção 'buildings' foi restaurada com sucesso no banco de dados."
        else
            echo "Erro: A coleção 'buildings' não foi encontrada após a restauração do banco de dados."
        fi
    else
        echo "Erro durante a restauração do banco de dados."
        exit 1
    fi
else
    echo "Seleção inválida."
    exit 1
fi

