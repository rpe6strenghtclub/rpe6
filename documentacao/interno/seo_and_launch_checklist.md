# SEO e checklist de manutenção

O site já está lançado em `https://rpe6.com.br`, no GitHub Pages. Publicação inicial e domínio não são pendências. A refatoração de 2026-09-05 foi validada localmente e ainda requer deploy separado.

## Concluído

- [x] Idioma pt-BR, viewport, theme color, título e meta description.
- [x] Hierarquia de títulos e IDs públicos preservados.
- [x] Hero prioritário, cabeçalho imediato e imagens secundárias sob demanda.
- [x] Dimensões declaradas, variantes JPEG/PNG e decodificação assíncrona.
- [x] Barlow Condensed variável 500–900, Oswald 500 e display=swap.
- [x] CTAs Kiwify, WhatsApp, telefone e Linktree ativos.
- [x] Links externos em nova aba com noopener noreferrer.
- [x] WhatsApp com rótulo acessível e foco visível.
- [x] FAQ nativo e conteúdo disponível sem JavaScript.
- [x] Redução de movimento desativa entradas/parallax, sem antecipar slides.
- [x] Favicon ICO na raiz, versões 16/32/48 px e referência relativa.
- [x] Independência entre Academy e Club e condição da mensalidade preservadas.
- [x] Referências locais dos assets verificadas após limpeza.
- [x] Layout comparado em 360, 430, 760, 804, 950 e 1860 px sem novo overflow.
- [x] Carrosséis testados em ciclo completo, rede lenta e erro; fallbacks sem JS/observador e falha de observador verificados.
- [x] Canonical definido como `https://rpe6.com.br/`.
- [x] Open Graph e Twitter Card, com imagem social PNG de 1200×630 e URLs absolutas.
- [x] `robots.txt` permissivo e `sitemap.xml` com a única URL canônica.

## Pendências de manutenção

- [ ] Privacidade, termos, suporte e reembolso.
- [ ] Criar/confirmar a propriedade de domínio no Google Search Console por TXT no DNS do Registro.br, enviar sitemap e solicitar indexação.
- [ ] Validar em produção a imagem social e a URL canônica após o deploy.
- [ ] Analytics/pixels/eventos e consentimento, se aprovados.
- [ ] Deploy desta revisão e Lighthouse frio em produção.

## Google Search Console e após cada deploy

No Search Console, criar propriedade de domínio `rpe6.com.br`, copiar o registro TXT fornecido pelo Google para a zona DNS do Registro.br e confirmar a propriedade após propagação. Em seguida, enviar `https://rpe6.com.br/sitemap.xml`, solicitar indexação de `https://rpe6.com.br/` e conferir a canônica reconhecida. Não usar tag HTML de verificação.

Conferir favicon, todos os destinos, preço, FAQ, teclado/foco, CTAs, WhatsApp, carrosséis, parallax, canonical, robots, sitemap e prévia social no domínio público. Repetir mobile/desktop, verificar erros e recursos selecionados por srcset; medir CLS e Lighthouse em carregamento frio. As medições locais desta revisão não substituem produção nem comprovam um novo score Lighthouse. Cabeçalhos de cache e compressão são responsabilidade da plataforma; não criar regras de servidor ou service worker para GitHub Pages.
