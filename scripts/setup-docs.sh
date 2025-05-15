#!/bin/bash

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Executar o script de criação de documentação
node scripts/create-docs.js

# Verificar se a execução foi bem sucedida
if [ $? -eq 0 ]; then
    echo "✨ Documentação criada com sucesso!"
    echo "📝 Agora você pode começar a editar os arquivos na pasta docs/"
else
    echo "❌ Ocorreu um erro ao criar a documentação."
    exit 1
fi 