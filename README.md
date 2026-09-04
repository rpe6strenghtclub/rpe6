# RPE6 Strength Academy

Landing page estática e responsiva para a RPE6 Strength Academy, voltada a treinamento de força, periodização e powerlifting.

## Estado atual

- Uma rota pública em `index.html`, com estilos em `styles.css` e comportamento em `script.js`.
- Sem framework, backend, etapa de build ou dependências de runtime.
- Ordem publicada: Hero, Academy, Módulos, Método, oferta de lançamento, FAQ e CTA final.
- Preço de lançamento de **R$ 39,90 por mês**, preservado enquanto a assinatura permanecer ativa.
- Duas CTAs “Conheça a Academy” ativas para o checkout Kiwify.
- Contato flutuante pelo WhatsApp e, no rodapé, telefone, CREF e Linktree.
- Carrosséis automáticos na Academy, no Método e no CTA final; FAQ nativo; brilho e zoom nos CTAs.
- Parallax desktop controlado por `requestAnimationFrame`; no mobile o background permanece estático.
- Entrada progressiva única por blocos com `IntersectionObserver`, fallback visível sem JavaScript e respeito a `prefers-reduced-motion`.
- Hero e logo do cabeçalho carregados imediatamente; as 13 imagens secundárias usam carregamento tardio, dimensões intrínsecas e decodificação assíncrona.
- Fontes externas: Barlow Condensed variável de 500 a 900 e Oswald 500, ambas com `display=swap`.

## Destinos ativos

- Checkout: `https://pay.kiwify.com.br/Lxz6VDm`
- WhatsApp: `https://wa.me/message/DQ3XQCHDIIOME1`
- Telefone: `tel:+5512981521537`
- Linktree: `https://linktr.ee/gabduques`

## Métricas da refatoração de 2026-09-04

- HTML: **16.344 bytes**.
- CSS: **20.874 bytes**.
- JavaScript: **2.729 bytes**.
- Código local total: **39.947 bytes**.
- DOM do documento: **238 elementos descendentes de `html`** (239 contando a raiz).
- Imagens: **17 arquivos e 17.707.308 bytes** (aproximadamente 16,89 MiB).
- Sete PNGs fotográficos foram substituídos por JPEGs progressivos, qualidade 95 e 4:4:4, sem redução de resolução: o grupo caiu de 19.401.816 para 5.618.947 bytes.

## Prévia local

Sirva a raiz por HTTP e abra `http://127.0.0.1:4173/`. A prévia por servidor é a referência de validação.

Consulte `documentacao/interno/` antes de alterar arquitetura, copy, assets ou funil.
