#!/bin/bash

db_name="Campus"
db_host="vsgate-s1.dei.isep.ipp.pt"
db_port="11147"
db_user="mongoadmin"
db_password="105711abb1e672194c53cbe4"

date_format=$(date +"%Y%m%d")

cloud_destination="<caminho_destino_cloud>"
cloud_account="<nome_conta_cloud>"
cloud_key="<chave_acesso_cloud>"

backup_file="${db_name}_${date_format}.dump"

mongodump --host $db_host --port $db_port --username $db_user --password $db_password --authenticationDatabase admin --db $db_name --out $backup_file

# Compacta o backup 
tar -czvf $backup_file.tar.gz $backup_file
 # Faz Dwld para a Cloud
scp -i $cloud_key $backup_file.tar.gz $cloud_account@cloud.example.com:/caminho/na/nuvem/

rm -r $backup_file $backup_file.tar.gz
