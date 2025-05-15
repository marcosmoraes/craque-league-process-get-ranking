# Arquitetura do Sistema

## Visão Geral da Arquitetura
O sistema segue uma arquitetura serverless baseada em AWS Lambda, utilizando o Serverless Framework para gerenciamento de infraestrutura. A arquitetura é composta por três funções Lambda principais, cada uma responsável por um endpoint específico de consulta de rankings e pontuações.

## Camadas do Sistema
1. **API Layer (handler.js)**
   - Recebe requisições HTTP
   - Valida parâmetros de entrada
   - Trata erros e formata respostas
   - Roteia para os serviços apropriados

2. **Domain Layer (domain/)**
   - Contém a lógica de negócio
   - Implementa regras de cálculo de pontuações
   - Gerencia a lógica de ranking
   - Processa dados de múltiplos bolões

3. **Infrastructure Layer (infrastructure/)**
   - Configurações de conexão com banco de dados
   - Configurações de serviços externos
   - Gerenciamento de dependências

4. **Utils Layer (utils/)**
   - Funções utilitárias
   - Logging e monitoramento
   - Helpers de processamento

## Fluxo de Dados
1. Requisição HTTP recebida pelo endpoint Lambda
2. Validação dos parâmetros de entrada (bubbleId, leagueId, bubbleIds)
3. Chamada ao serviço apropriado na camada de domínio
4. Processamento da lógica de negócio
5. Consulta ao banco de dados (quando necessário)
6. Formatação e retorno da resposta
7. Logging do estado do processamento

## Considerações de Segurança
- Validação de parâmetros de entrada
- Tratamento adequado de erros
- Logging de estados de processamento para auditoria
- Timeout configurado para operações longas (600s para getUserRankingByBubbleIds)

## Escalabilidade
- Arquitetura serverless permite escalabilidade automática
- Processamento assíncrono de rankings
- Timeout adequado para operações pesadas
- Logging para monitoramento de performance