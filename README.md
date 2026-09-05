# RPE6 Strength Academy

Site **lançado e em manutenção**, publicado em [rpe6.com.br](https://rpe6.com.br) com hospedagem GitHub Pages. Não é mais uma versão de desenvolvimento. A refatoração de 2026-09-05 está validada localmente; seu deploy é uma etapa separada, não executada nesta tarefa.

## Estado atual

- Landing estática, sem framework, backend, dependências de execução ou build obrigatório.
- Ordem: Hero, Academy, Módulos, Método, oferta de lançamento, FAQ e CTA final.
- R$ 39,90 por mês, preservados enquanto a assinatura permanecer ativa; acesso independente do RPE6 Strength Club.
- Duas CTAs “Conheça a Academy”, FAQ nativo e rodapé com CREF 189456-G/SP, telefone e Linktree.
- Três carrosséis (2, 5 e 4 imagens), troca nominal a cada 5 segundos. A próxima imagem é solicitada 1 segundo antes; enquanto não estiver pronta, a atual permanece. Imagens com erro são puladas.
- Parallax desktop e entradas únicas por blocos. Redução de movimento desativa ambos, preservando carrosséis e interações aprovadas.
- Hero prioritário e logo do cabeçalho imediato; demais mídias sob demanda. Variantes JPEG/PNG em URLs versionadas; WhatsApp mantém o PNG original de 27.719 bytes pela nitidez.
- Mobile até 760 px: títulos, mídias e CTAs centralizados; textos longos e FAQ à esquerda.
- Barra de rolagem com indicador vermelho, largura nativa e cores do sistema em alto contraste; propriedade padrão com fallback WebKit.
- SEO técnico: canonical em `https://rpe6.com.br/`, Open Graph, Twitter Card, `robots.txt` e `sitemap.xml`. Não há analytics, pixels ou banner de consentimento.
- Fontes externas: Barlow Condensed variável 500–900 e Oswald 500, com `display=swap`.
- Sem service worker ou regras próprias de cache: a infraestrutura é controlada pelo GitHub Pages. Trocas de assets devem usar uma nova versão no nome.

## Destinos ativos

- Checkout: `https://pay.kiwify.com.br/Lxz6VDm`
- WhatsApp: `https://wa.me/message/DQ3XQCHDIIOME1`
- Telefone: `tel:+5512981521537`
- Linktree: `https://linktr.ee/gabduques`

## Estrutura e manutenção

Na raiz pública: `index.html`, `styles.css`, `script.js`, `favicon.ico`, `CNAME`, `robots.txt`, `sitemap.xml` e README. Variantes em `assets/images/delivery/` e `assets/brand/delivery/`; backgrounds e WhatsApp em `assets/images/`; arte de compartilhamento em `assets/social/`. Documentação em `documentacao/interno/`; ferramentas opcionais em `tools/`.

O projeto mantém somente imagens utilizadas, incluindo **todas** as variantes de `srcset`, `data-srcset` e fallbacks. Os originais substituídos foram excluídos por autorização; não há cópia adicional dentro do projeto. Não excluir variantes apenas porque não foram selecionadas em uma viewport.

Favicon na raiz, com referência relativa compatível com domínio próprio e endereço de projeto do GitHub Pages.

## Métricas locais — 2026-09-05

| Medida | Valor |
| --- | ---: |
| HTML | 24.365 bytes |
| CSS | 22.424 bytes |
| JavaScript | 7.180 bytes |
| Código público total | 53.969 bytes |
| Elementos no HTML fonte, incluindo fallback noscript | 274 |
| Elementos no DOM com JavaScript, amostra inicial | 266 |
| Assets armazenados | 31 arquivos / 9.739.383 bytes |
| Variantes em delivery (subconjunto dos assets) | 27 arquivos / 7.875.619 bytes |
| Favicon, fora de assets | 6.897 bytes |

A limpeza removeu 16.862.692 bytes de originais sem uso (65,9% do armazenamento anterior de assets). Isso **não equivale** a uma redução de download: esses originais já não eram solicitados. Em contexto novo do Edge, viewport 1280 × 720, sem rolagem e após 2 segundos, foram observados **1.843.192 bytes** de recursos locais (`transferSize`, excluindo navegação HTML e fontes externas). É uma amostra local, dependente de viewport, densidade, tempo e cache; não é Lighthouse nem medição de produção. A soma das variantes não representa uma única visita.

## Prévia e testes

Execute `node tools/preview.cjs` e abra `http://127.0.0.1:4173/`. A raiz é resolvida mesmo iniciando de outro diretório; `PORT` permite trocar a porta. Servidor somente para prévia local.

- `node tools/verify-files.cjs`: referências locais e imagens sem uso; só exige Node.js.
- `node tools/verify.cjs before` e `node tools/verify.cjs after`: capturas e medidas nas seis larguras, com Playwright e Edge instalados no ambiente de testes.
- `node tools/verify-behavior.cjs`: carrosséis, rede lenta, erro de imagem, fallbacks e redução de movimento; mesma dependência opcional de testes.
- `node tools/verify-page.cjs`: links, foco, favicon, parallax e amostra de CLS; também exige Playwright e Edge.
- `QA_URL` permite testar outra prévia. Capturas e resultados ficam no diretório temporário do sistema, em `rpe6-refactor-qa`, fora do projeto.

Validação local: 360, 430, 760, 804, 950 e 1860 px sem novo overflow e com posições/dimensões das seções idênticas à referência. Sete cenários de comportamento passaram, incluindo ciclo completo dos três carrosséis. Nenhuma alteração foi publicada automaticamente.

Checagem final: favicon e JavaScript com MIME correto; URLs malformadas retornam 400 e tentativas de sair da raiz retornam 403. Foco, links e parallax aprovados. Amostra adicional de CLS em 950 × 960: 0,00142 (local, não substitui medição de produção).

Após o deploy, criar a propriedade de domínio no Google Search Console e inserir o TXT fornecido pelo Google na zona DNS do Registro.br. Depois de validar a propriedade, enviar o sitemap e solicitar a indexação da página inicial. Consulte [arquitetura](documentacao/interno/site_architecture.md), [inventário](documentacao/interno/brand_and_assets_guide.md), [checklist](documentacao/interno/seo_and_launch_checklist.md) e [changelog](documentacao/interno/changelog.md). Políticas, validação pública da indexação e medição permanecem pendências de manutenção.
