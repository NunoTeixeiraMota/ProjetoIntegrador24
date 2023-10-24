#!/bin/bash

GH_USERNAME="JoseTeixeira1200941"
GH_REPO="SEM_5_PI"

issues=(
  "Gestão de Campus 150 Criar edifício"
  "Gestão de Campus 160 Editar edifício"
  "Gestão de Campus 170 Listar todos os edifícios"
  "Gestão de Campus 180 Listar edifícios com min e max de pisos"
  "Gestão de Campus 190 Criar piso de edifício"
  "Gestão de Campus 200 Editar informação de piso de edifício"
  "Gestão de Campus 210 Listar todos os pisos de um edifício"
  "Gestão de Campus 220 Listar pisos de edifício com passagem para outros edifícios"
  "Gestão de Campus 230 Carregar mapa de piso"
  "Gestão de Campus 240 Criar passagem entre edifícios"
  "Gestão de Campus 250 Editar passagem entre edifícios"
  "Gestão de Campus 260 Listar passagens entre 2 edifícios"
  "Gestão de Campus 270 Criar elevador em edifício"
  "Gestão de Campus 280 Editar elevador em edifício"
  "Gestão de Campus 290 Listar elevadores em edifício"
  "Gestão de Campus 300 Listar pisos de edifício servidos por elevador"
  "Gestão de Campus 310 Criar sala de piso de edifício"
  "Gestão de Frota 350 Como gestor de frota pretendo adicionar um novo tipo de robot indicando a sua designação e que tipos de tarefas pode executar da lista prédefinida de tarefas"
  "Gestão de Frota 360 Como gestor de frota pretendo adicionar um novo robot à frota indicando o seu tipo, designação, etc."
  "Gestão de Frota 370 Como gestor de frota pretendo inibir um robot"
  "Gestão de Frota 380 Como gestor de frota pretendo consultar todos os robots da frota"
  "Gestão de Frota 390 Como gestor de frota pretendo pesquisar todos os robots da frota por designação ou tarefa que pode executar"
  "Integração 760 Como arquiteto da solução pretendo um diagrama devidamente justificado e elucidativo que de que componentes existirão na solução e quais as suas interfaces de integração com indicação do tipo de informação e estrutura de informação a partilhar"
)

for issue in "${issues[@]}"; do
  title=$(echo "$issue" | cut -d ' ' -f 2-)
  body=$(echo "$issue" | cut -d ' ' -f 1)
  echo "gh issue create --title \"$title\" --body \"$body\" --repo $GH_USERNAME/$GH_REPO"
done
