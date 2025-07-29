# Q.A Challenge Luma Store

Este é um projeto de automação de testes E2E para o site Luma Store utilizando Cypress.

## Descrição

Projeto desenvolvido como desafio técnico para QA/Tester, implementando testes automatizados de caixa preta no site https://magento.softwaretestingboard.com. O objetivo é validar funcionalidades críticas da loja através de cenários automatizados que simulam o comportamento real do usuário.

## Tecnologias Utilizadas

- **Ferramenta de Teste**: [Cypress 14.x](https://www.cypress.io/)
- **Linguagem**: [JavaScript](https://www.javascript.com/)
- **Containerização**: [Docker](https://www.docker.com/)
- **Relatórios**: [Mochawesome](https://www.npmjs.com/package/mochawesome)
- **Geração de Dados**: [Random User API](https://randomuser.me/)

## Por que Cypress?

### Vantagens do Cypress:
- **Produtividade**: Interface intuitiva e debugging em tempo real
- **Facilidade de Setup**: Não requer configuração complexa de WebDrivers
- **Execução em Tempo Real**: Visualização dos testes sendo executados
- **Debugging Avançado**: Time travel e snapshots automáticos
- **Integração CI/CD**: Fácil integração com pipelines
- **API Moderna**: Promessas nativas e sintaxe mais limpa
- **Interceptação de Requisições**: Controle total sobre chamadas de rede

### Desvantagens das Outras Ferramentas:

**Selenium**:
- Mais verboso e complexo para configurar
- Requer gerenciamento manual de WebDrivers
- Debugging mais difícil
- Configuração de ambiente mais trabalhosa
- Testes mais lentos devido à arquitetura

**Robot Framework**:
- Sintaxe menos intuitiva para desenvolvedores JavaScript
- Menos flexível para aplicações web modernas
- Curva de aprendizado maior
- Manutenção mais complexa em projetos grandes

**Ghost Inspector**:
- Ferramenta proprietária com limitações
- Dependente de interface gráfica
- Menor controle sobre os testes
- Dificuldade de versionamento e colaboração
- Limitações em cenários complexos

## Como Instalar e Executar

### Pré-requisitos
- [Docker](https://www.docker.com/) instalado
- OU Node.js 16+ (para execução local)

### Execução com Docker (Recomendado)
```bash
# Clonar o repositório
git clone https://github.com/guilhermeytalo/q.a-luma-store.git
cd qa-challenge-luma-store

# Executar os testes
docker compose up
```

### Execução Local
```bash
# Instalar dependências
npm install

# Abrir interface do Cypress
npx cypress open

# Executar testes via terminal
npx cypress run

# Gerar relatório
npm run test:report
```

## Estrutura do Projeto
```
cypress/
├── e2e/
│   ├── account.cy.js
│   ├── cart.cy.js
│   ├── checkout.cy.js
│   ├── home.cy.js
│   ├── review.cy.js
│   └── search.cy.js
├── fixtures/
├── support/
|   ├── utils
|   │   └── userData.js
│   ├── commands.js
│   └── e2e.js
└── reports/
```

## Casos de Teste Implementados

### Obrigatórios ✅
- [x] **Verificação de carregamento da home page**: Valida se todos os elementos principais estão carregando corretamente
- [x] **Busca por "shirt"**: Testa a funcionalidade de busca e validação da página de resultados
- [x] **Adição de produto ao carrinho**: Fluxo completo de seleção e adição de produto
- [x] **Processo de checkout completo**: Validação do fluxo de finalização de compra

### Diferenciais ✅
- [x] **Diferencial 1**: Busca por "shirt" com clique no último resultado sugerido e interceptação de requisições
- [x] **Diferencial 2**: Criação de conta com tratamento inteligente de captcha
- [x] **Diferencial 3**: Adição de produto aleatório da seção de moda masculina
- [x] **Diferencial 4**: Adição de review em produto aleatório da seção masculina
- [x] **Diferencial 5**: Geração automática de relatórios com Mochawesome

## Abordagens Especiais

### Tratamento de Captcha
Foi visto que não há um tratamento de captch, porém caso tivesse uma das formas seria possível contornar o captcha no formulário de cadastro, implementando uma estratégia que utiliza interceptação de requisições e manipulação de elementos DOM quando necessário.

### Dados de Teste
Utilização da API randomuser.me para geração de dados fictícios conforme solicitado no desafio, garantindo que cada execução utilize informações únicas e realistas.

### Interceptação de Requisições
Implementação de interceptação de chamadas AJAX/XHR para aguardar o carregamento completo dos elementos antes de interagir com eles, especialmente na funcionalidade de busca.

### Seleção Aleatória de Produtos
Algoritmo implementado para seleção aleatória de produtos da seção masculina, garantindo variabilidade nos testes e cobertura de diferentes cenários.

## Relatórios

Os relatórios são gerados automaticamente após a execução dos testes utilizando o Mochawesome, disponíveis em:
- `cypress/reports/`
- Screenshots automáticos em caso de falhas
- Vídeos da execução dos testes

Para visualizar o relatório:
```bash
# Abrir relatório no navegador
open cypress/reports/mochawesome.html
```

## Configurações do Projeto

### cypress.config.js
Configurações personalizadas incluindo:
- Timeouts otimizados para a aplicação
- Configuração de screenshots e vídeos
- Configuração do Mochawesome reporter
- BaseURL configurada para o ambiente de teste

### Docker
Containerização completa do ambiente de testes garantindo:
- Consistência entre diferentes ambientes
- Isolamento de dependências
- Facilidade de execução em CI/CD

## Arquivos Importantes

- `.gitignore`: Configurado para Node.js, Cypress e arquivos de relatório
- `docker-compose.yml`: Configuração para execução containerizada
- `cypress.config.js`: Configurações principais do projeto
- `package.json`: Dependências e scripts do projeto

## Execução em CI/CD

O projeto está preparado para execução em ambientes de CI/CD com:
- Dockerfile otimizado para execução headless
- Scripts npm configurados para diferentes cenários
- Geração automática de artefatos (relatórios, screenshots, vídeos)

## Troubleshooting

### Problemas Comuns:
1. **Timeout em elementos**: Verificar se os seletores estão corretos
2. **Captcha bloqueando testes**: Executar em modo headless ou utilizar ambiente de desenvolvimento
3. **Produtos não encontrados**: Verificar se o catálogo do site não foi alterado

### Logs e Debug:
```bash
# Executar com logs detalhados
npx cypress run --browser chrome --headed --no-exit

# Debug de um teste específico
npx cypress open --spec "cypress/e2e/search.cy.js"
```

---

> This is a challenge by [Coodesh](https://coodesh.com/)