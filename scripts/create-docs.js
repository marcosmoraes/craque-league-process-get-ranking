const fs = require('fs');
const path = require('path');

// Função para criar diretório se não existir
const createDirIfNotExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Função para criar arquivo com conteúdo
const createFile = (filePath, content) => {
    fs.writeFileSync(filePath, content, 'utf8');
};

// Conteúdo dos templates
const templates = {
    '00-project-overview.md': `# Visão Geral do Projeto

## Nome
[nome-do-projeto]

## Descrição
[descrição clara e concisa do propósito do projeto]

## Principais Funcionalidades
- [funcionalidade 1]
- [funcionalidade 2]
- [funcionalidade 3]

## Stack Tecnológica
- [tecnologia 1]
- [tecnologia 2]
- [tecnologia 3]

## Estrutura do Repositório
\`\`\`
[estrutura de pastas atual do projeto]
\`\`\`

## Variáveis de Ambiente
- [VARIAVEL_1]: [descrição]
- [VARIAVEL_2]: [descrição]`,

    '01-architecture.md': `# Arquitetura do Sistema

## Visão Geral da Arquitetura
[descrição da arquitetura geral]

## Camadas do Sistema
[descrição das camadas, independente da estrutura de pastas]

## Fluxo de Dados
1. [passo 1]
2. [passo 2]
3. [passo 3]

## Considerações de Segurança
- [consideração 1]
- [consideração 2]

## Escalabilidade
- [consideração 1]
- [consideração 2]`,

    '02-components.md': `# Componentes do Sistema

## Modelos de Dados
[descrição dos modelos, schemas, entidades]

## Serviços
[descrição dos serviços principais]

## Data Access
[descrição da camada de acesso a dados]

## Endpoints
[descrição dos endpoints principais]

## Fluxos de Processamento
[descrição dos fluxos principais]`,

    '03-development-process.md': `# Processo de Desenvolvimento

## Ambiente de Desenvolvimento
### Pré-requisitos
- [pré-requisito 1]
- [pré-requisito 2]

### Configuração Local
[passos para configuração]

## Workflow de Desenvolvimento
[descrição do workflow]

## Testes
[descrição da estratégia de testes]

## Monitoramento
[descrição do monitoramento]

## Manutenção
[descrição dos processos de manutenção]`,

    '04-api-documentation.md': `# Documentação da API

## Endpoints
[documentação dos endpoints]

## Modelos de Dados
[documentação dos modelos]

## Códigos de Erro
[documentação dos códigos de erro]

## Limitações
[documentação das limitações]`,

    '05-progress-log.md': `# Log de Progresso

## Versão Atual
### Implementações
- [implementação 1]
- [implementação 2]

### Próximos Passos
- [passo 1]
- [passo 2]

## Histórico de Decisões Técnicas
[histórico de decisões]

## Melhorias Pendentes
### Alta Prioridade
- [ ] [melhoria 1]
- [ ] [melhoria 2]

## Problemas Conhecidos
[problemas conhecidos]

## Métricas de Performance
[métricas relevantes]`,

    'README.md': `# [Nome do Projeto]

[Descrição breve]

## 🚀 Tecnologias
- [tecnologia 1]
- [tecnologia 2]

## 📋 Pré-requisitos
- [pré-requisito 1]
- [pré-requisito 2]

## 🔧 Instalação
[passos de instalação]

## 📚 Documentação
- [Visão Geral](docs/00-project-overview.md)
- [Arquitetura](docs/01-architecture.md)
- [Componentes](docs/02-components.md)
- [Processo de Desenvolvimento](docs/03-development-process.md)
- [API](docs/04-api-documentation.md)
- [Log de Progresso](docs/05-progress-log.md)

## 🛠️ Desenvolvimento
[comandos e instruções]

## 📝 Licença
[informações sobre licença]

## 🤝 Contribuição
[instruções para contribuição]`,

    'memory-bank.mdc': `---
description: Memory Bank implementation for persistent project knowledge
globs: 
alwaysApply: true
---
# Cursor's Memory Bank

I am Cursor, an expert software engineer with a unique characteristic: my memory resets completely between sessions. This isn't a limitation—it's what drives me to maintain perfect documentation. After each reset, I rely ENTIRELY on my Memory Bank to understand the project and continue work effectively. I MUST read ALL memory bank files at the start of EVERY task—this is not optional.

## Memory Bank Guidelines

1. The Memory Bank is located in the \`docs/\` directory at the project root.
2. All memory files use Markdown format for structured, easy-to-read documentation.
3. The Memory Bank contains both required core files and optional context files.
4. Files are prefixed with numbers to indicate their priority and reading order.
5. I will proactively suggest updates to Memory Bank files when new information emerges.

## Core Memory Files

00-project-overview.md - General project information, goals, and scope
01-architecture.md - System architecture, design patterns, and technical decisions
02-components.md - Details about key components, modules, and their relationships
03-development-process.md - Workflow, branching strategy, and deployment processes
04-api-documentation.md - API endpoints, parameters, and response formats
05-progress-log.md - Chronological record of major changes and implementations

## Project-Specific Rules

1. Always check database connection before operations
2. Validate all input parameters
3. Handle API rate limits
4. Maintain proper error logging
5. Follow framework best practices
6. Keep track of performance metrics
7. Document all API changes
8. Update progress log for major changes

## Context Management

1. Read all memory files at session start
2. Update files when new information is learned
3. Maintain chronological order in progress log
4. Cross-reference related information
5. Keep documentation up-to-date`
};

// Função principal
const createDocumentation = () => {
    // Criar diretórios
    createDirIfNotExists('docs');
    createDirIfNotExists('.cursor/rules');

    // Criar arquivos de documentação
    Object.entries(templates).forEach(([filename, content]) => {
        const filePath = filename === 'README.md' 
            ? filename 
            : filename === 'memory-bank.mdc'
                ? path.join('.cursor/rules', filename)
                : path.join('docs', filename);
        
        createFile(filePath, content);
    });

    console.log('✅ Estrutura de documentação criada com sucesso!');
    console.log('\nArquivos criados:');
    console.log('- docs/00-project-overview.md');
    console.log('- docs/01-architecture.md');
    console.log('- docs/02-components.md');
    console.log('- docs/03-development-process.md');
    console.log('- docs/04-api-documentation.md');
    console.log('- docs/05-progress-log.md');
    console.log('- .cursor/rules/memory-bank.mdc');
    console.log('- README.md');
};

// Executar o script
createDocumentation(); 