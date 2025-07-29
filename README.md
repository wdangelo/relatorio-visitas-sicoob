# Formulário de Relatório de Visitas - Sicoob

Sistema de captura de dados de campo desenvolvido em Next.js com TypeScript, Tailwind CSS e componentização completa.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Framework CSS utilitário
- **React Hooks** - Gerenciamento de estado moderno
- **Componentização** - Arquitetura modular e reutilizável

## 📱 Funcionalidades

### ✅ Seções do Formulário
1. **Informações do Cooperado** - Dados pessoais e empresariais
2. **Informações Bancárias** - Relacionamento bancário dinâmico
3. **Informações da Visita** - Detalhes da visita realizada
4. **Fotos e Anexos** - Upload múltiplo de imagens

### ✅ Funcionalidades Avançadas
- **Máscaras automáticas** (CPF/CNPJ, CEP, telefone, valores monetários)
- **Validações em tempo real** com feedback visual
- **Consulta automática de CEP** via API ViaCEP
- **Busca de municípios** por UF via API IBGE
- **Campos condicionais** que aparecem conforme seleção
- **Sistema de mensagens** para feedback do usuário
- **Auto-salvamento** de rascunho a cada 2 minutos
- **Geração de PDF** com layout profissional
- **Layout responsivo** otimizado para mobile

## 🎨 Identidade Visual

O projeto utiliza as cores oficiais do Sicoob:
- **Turquesa:** #00AE9D
- **Verde Escuro:** #003641  
- **Verde Médio:** #7DB61C

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Acessar no navegador
http://localhost:3000
```

### Build para Produção
```bash
# Gerar build otimizado
npm run build

# Executar versão de produção
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes de interface
│   │   ├── Input.tsx     # Input reutilizável
│   │   ├── Select.tsx    # Select reutilizável
│   │   ├── Textarea.tsx  # Textarea reutilizável
│   │   ├── FileInput.tsx # Upload de arquivos
│   │   └── MessageContainer.tsx # Sistema de mensagens
│   ├── sections/         # Seções do formulário
│   │   ├── InformacoesCooperado.tsx
│   │   ├── InformacoesBancarias.tsx
│   │   ├── InformacoesVisita.tsx
│   │   └── FotosAnexos.tsx
│   ├── FormHeader.tsx    # Cabeçalho
│   ├── FormSection.tsx   # Wrapper de seção
│   ├── FormGrid.tsx      # Grid responsivo
│   └── FormActions.tsx   # Botões de ação
├── hooks/                # Hooks customizados
│   ├── useFormData.ts    # Gerenciamento de dados
│   ├── useMasks.ts       # Máscaras de input
│   ├── useMessages.ts    # Sistema de mensagens
│   ├── useValidation.ts  # Validações
│   ├── useApi.ts         # Integrações com APIs
│   └── usePDF.ts         # Geração de PDF
├── lib/                  # Utilitários e APIs
│   ├── constants.ts      # Constantes do projeto
│   ├── utils.ts          # Funções utilitárias
│   ├── api.ts            # Integrações com APIs
│   └── pdfGenerator.ts   # Gerador de PDF
└── types/                # Definições TypeScript
    └── index.ts          # Tipos do projeto
```

## 🔧 Funcionalidades Técnicas

### Validações
- CPF/CNPJ com dígitos verificadores
- CEP com formato brasileiro
- Telefone com máscaras dinâmicas
- Campos obrigatórios destacados
- Validação em tempo real

### Integrações
- **ViaCEP:** Consulta automática de endereços
- **IBGE:** Busca de municípios por UF
- **jsPDF:** Geração de relatórios em PDF

### Responsividade
- Layout adaptativo para desktop, tablet e mobile
- Grids flexíveis que se reorganizam automaticamente
- Componentes otimizados para toque
- Performance otimizada para dispositivos móveis

## 📄 Geração de PDF

O sistema gera automaticamente um PDF profissional contendo:
- Todas as informações preenchidas
- Layout formatado e organizado
- Cabeçalho com logo do Sicoob
- Rodapé com numeração de páginas
- Quebras de página automáticas

## 💾 Persistência de Dados

- **Auto-salvamento:** Rascunho salvo automaticamente a cada 2 minutos
- **LocalStorage:** Dados persistidos localmente no navegador
- **Recuperação:** Rascunho carregado automaticamente ao abrir

## 🔒 Segurança

- Validação de dados no frontend
- Sanitização de inputs
- Prevenção de XSS
- Tipagem TypeScript para maior segurança

## 📱 Compatibilidade

- **Navegadores:** Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos:** Desktop, tablet, smartphone
- **Sistemas:** Windows, macOS, Linux, iOS, Android

## 🚀 Deploy

O projeto está pronto para deploy em plataformas como:
- Vercel (recomendado para Next.js)
- Netlify
- AWS Amplify
- Heroku

## 📞 Suporte

Para dúvidas ou suporte técnico, consulte a documentação do Next.js ou entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido para o Sicoob** - Sistema Cooperativo de Crédito

