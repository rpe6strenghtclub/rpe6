# RPE6 Strength Academy

Landing page estática e responsiva para a RPE6 Strength Academy, voltada a treinamento de força, periodização e powerlifting.

## Estado atual

- Uma rota pública em `index.html`, com estilos em `styles.css` e comportamento em `script.js`.
- Sem framework, backend, etapa de build ou dependências de runtime.
- Ordem publicada: Hero, Academy, Módulos, Método, oferta de lançamento, FAQ e CTA final.
- Preço de lançamento de **R$ 39,90 por mês**, preservado enquanto a assinatura permanecer ativa.
- Duas CTAs “Conheça a Academy” ativas para o checkout Kiwify.
- Contato flutuante pelo WhatsApp e, no rodapé, telefone, CREF e Linktree.
- Carrosséis automáticos na Academy, no Método e no CTA final; o primeiro slide carrega com a seção e os demais entram em sequência antes da estreia. FAQ nativo; brilho e zoom nos CTAs.
- Parallax desktop controlado por `requestAnimationFrame`; no mobile o background permanece estático.
- Entrada progressiva única por blocos com `IntersectionObserver`, fallback visível sem JavaScript e respeito a `prefers-reduced-motion`.
- Hero, logo e mídias de maior impacto usam variantes JPEG/PNG responsivas versionadas por `srcset`; masters permanecem preservados. O ícone do WhatsApp usa o PNG original de 27.719 bytes para preservar nitidez. Hero e logo do cabeçalho carregam imediatamente; as imagens secundárias usam carregamento tardio, dimensões intrínsecas e decodificação assíncrona.
- Compatível com GitHub Pages: sem service worker ou configuração de cache no projeto; novas mídias usam nomes versionados para invalidar o cache por URL.
- Fontes externas: Barlow Condensed variável de 500 a 900 e Oswald 500, ambas com `display=swap`.
- Mobile até 760 px com títulos, mídias e CTAs centralizados; textos longos e FAQ à esquerda. Favicon com o logo atual em 16, 32 e 48 px.

## Destinos ativos

- Checkout: `https://pay.kiwify.com.br/Lxz6VDm`
- WhatsApp: `https://wa.me/message/DQ3XQCHDIIOME1`
- Telefone: `tel:+5512981521537`
- Linktree: `https://linktr.ee/gabduques`

## Métricas de entrega de 2026-09-05

- HTML: **22.634 bytes**.
- CSS: **21.866 bytes**.
- JavaScript: **4.865 bytes**.
- Código local total: **49.365 bytes**.
- DOM fonte: **256 elementos**, incluindo o documento e o fallback `noscript` dos carrosséis.
- Assets: **44 arquivos e 25.582.927 bytes**, dos quais 27 variantes públicas de entrega somam **7.875.619 bytes**; favicon: 6.897 bytes.
- O carregamento inicial deixa de solicitar o notebook PNG de 7.400.729 bytes. Em viewport desktop padrão, a variante de 640 px passa a ser selecionada; telas de maior densidade podem selecionar 960 px.

## Prévia local

Sirva a raiz por HTTP e abra `http://127.0.0.1:4173/`. A prévia por servidor é a referência de validação.

Consulte `documentacao/interno/` antes de alterar arquitetura, copy, assets ou funil.
