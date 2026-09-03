# Arquitetura do site RPE6

## Visão geral

RPE6 é uma landing page estática da RPE6 Strength Academy. A RPE6 Strength é a marca do treinador; o RPE6 Strength Club é sua equipe de competição e a Academy é um produto educacional independente, sem acesso ou vínculo ao Club. Usa HTML e CSS vanilla, sem JavaScript, backend, banco de dados, framework, build ou dependências de runtime. Domínio e hospedagem permanecem pendentes.

Existe uma única rota pública na raiz. Os destinos comerciais ainda não foram aprovados e as duas CTAs permanecem como botões desabilitados.

## Estrutura atual

- `index.html`: estrutura semântica, conteúdo e metadados básicos.
- `styles.css`: identidade visual, componentes e responsividade.
- `assets/brand/`: logo da RPE6 Strength Academy no cabeçalho.
- `assets/images/`: foto única do Hero, foto do Método, imagens da plataforma, foto da comunidade e backgrounds globais.
- `documentacao/interno/`: fonte de verdade operacional.

Diretórios-placeholder e arquivos `.gitkeep` foram removidos. Novas áreas devem ser criadas somente quando receberem implementação real.

## Composição pública

A página possui, nesta ordem, Hero, Academy, Método, Biblioteca, Público, FAQ e CTA final. Todas as sete seções estão dentro de `main.site-frame`, usam painéis de leitura translúcidos e molduras vermelhas locais.

O Hero é um banner único em todos os breakpoints: a fotografia horizontal do atleta preenche a seção inteira, encostada às quatro bordas, e a copy se sobrepõe levemente à área esquerda. Uma camada em degradê e sombra atrás do texto mantém a leitura sem retirar o protagonismo da foto. A Academy combina a ilustração do notebook com um título `h2` visível. O Método posiciona uma fotografia de levantamento terra, com recorte central, ao lado do título e apresenta três cards uniformes. A Biblioteca fixa o rótulo no topo esquerdo, prioriza a visão geral visual da plataforma e mantém três painéis enxutos de módulos. Público e FAQ mantêm seus grids próprios; o FAQ explica que Academy e Club são produtos independentes. A CTA final preserva a foto coletiva como prova da experiência da RPE6 Strength com atletas, sem convidar para o Club, e mantém botão desabilitado.

Os IDs públicos `#inicio`, `#conteudo`, `#hero-title`, `#academy-title`, `#method-title`, `#library-title`, `#audience-title`, `#faq-title` e `#cta-title` permanecem estáveis.

O background global usa a arte de 4096 × 4096 px acima de 760 px e a arte de 1844 × 4096 px até esse breakpoint. Ambos usam `cover`, não repetem, permanecem fixos e recebem sobreposição preta de 25%.

## Linha de base de performance

Medição local após a refatoração de 2026-08-29:

- `index.html`: 10.538 bytes.
- `styles.css`: 12.188 bytes.
- HTML + CSS: 22.726 bytes após o ajuste de leitura da máscara do Hero.
- DOM inicial: 180 elementos descendentes de `html` (181 contando o elemento raiz).
- Imagens públicas: oito arquivos e 8.746.456 bytes.
- Hero: uma imagem PNG de 1400 × 840 px, com prioridade alta em todos os breakpoints.
- Quatro imagens abaixo da dobra: `loading="lazy"`, `decoding="async"` e `fetchpriority="low"`.
- Fontes externas: Barlow Condensed 500, 600, 700, 800 e 900, mais Oswald 500.
- JavaScript e dependências de runtime: zero.

## Regras de manutenção

- Usar nomes ASCII minúsculos e hifens para arquivos e diretórios públicos.
- Manter funcionamento por servidor HTTP estático.
- Não introduzir JavaScript, framework, build ou backend sem necessidade documentada.
- Solicitar somente pesos tipográficos efetivamente usados.
- Declarar dimensões, texto alternativo, prioridade e estratégia de carregamento das imagens HTML.
- Registrar links, preços e dados comerciais primeiro em `funnel_and_offers.md`.
- Manter CTAs sem destino como botões desabilitados, nunca como `href="#"`.
- Não criar diretórios-placeholder nem armazenar dados sensíveis de alunos no repositório.
