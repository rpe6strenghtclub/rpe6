# Arquitetura do site

## Estado e estrutura — 2026-09-05

Landing lançada em `https://rpe6.com.br`, hospedada no GitHub Pages, em manutenção. Esta revisão é local e aguarda deploy separado. Sem framework, backend, build obrigatório, dependências de runtime ou service worker.

```text
index.html / styles.css / script.js
favicon.ico / CNAME / robots.txt / sitemap.xml / README.md
assets/
  brand/delivery/     variantes JPEG do logo
  images/delivery/    variantes responsivas JPEG/PNG
  images/            dois backgrounds e whatsapp-icon.png
  social/            imagem de compartilhamento Open Graph/Twitter
documentacao/interno/ documentos vivos e changelog histórico
tools/
  preview.cjs        servidor HTTP local
  verify-files.cjs   integridade dos assets
  verify.cjs         capturas e medidas responsivas
  verify-behavior.cjs cenários de comportamento
  verify-page.cjs    links, foco, favicon, parallax e CLS
```

URLs públicas e IDs preservados. Favicon na raiz com referência relativa; `CNAME` contém `rpe6.com.br`. Ferramentas de teste não são carregadas pela página.

O cabeçalho declara a canônica `https://rpe6.com.br/`, Open Graph e Twitter Card com URLs absolutas. `robots.txt` permite rastreamento e aponta ao sitemap; o sitemap tem somente a URL canônica. A imagem social PNG em `assets/social/` tem 1200×630. Não há analytics, pixels, tag de verificação do Google ou banner de consentimento.

## Conteúdo e layout

1. Hero: headline, atleta e CTA Kiwify.
2. Academy: carrossel de duas imagens, apresentação e princípios.
3. Módulos: Biomecânica e hipertrofia, Powerlifting e Periodização.
4. Método: cinco fotos e três pilares.
5. Oferta: logo, R$ 39,90/mês, preservação da mensalidade ativa e evolução da plataforma.
6. FAQ: cinco elementos `details`, independentes de JavaScript.
7. CTA final: quatro fotos da equipe, texto institucional e segunda CTA Kiwify.

Cabeçalho, rodapé e WhatsApp fixo completam a página. Até 760 px há centralização seletiva; parágrafos longos, listas e respostas mantêm leitura à esquerda. Acima disso, layout preservado. Carrosséis compartilham os estilos de gerenciamento; proporções e fades específicos permanecem separados.

## JavaScript com defer

Três inicializações isoladas: parallax, carrosséis e entradas. Uma falha síncrona não impede as demais. A função compartilhada `readyImage` resolve carregamento/erro, remove listeners e usa limite de espera de 15 segundos. Aplica `sizes` antes de `srcset` e `src`; chamadas concorrentes compartilham a promessa. Imagem que falhar ou exceder o limite é ignorada naquele ciclo de vida da página.

### Carrosséis

A aproximação de 900 px inicia a preparação da imagem inicial. Slides posteriores permanecem sem `src` até sua vez. Após exibir um slide válido, aguarda 4 segundos, solicita o próximo e aguarda o marco nominal de 5 segundos. Se a imagem ainda não estiver pronta, prolonga o slide atual. Falhas são puladas em ordem; se apenas uma imagem válida restar, ela permanece estática. Fades: Academy e equipe 0,4 s; Método 0,5 s. Ordem preservada, ciclos nominais de 10, 25 e 20 segundos quando todas as imagens estão prontas.

Sem JavaScript, `noscript` fornece as fontes e as animações CSS mantêm os carrosséis. Sem `IntersectionObserver` (ou se sua construção falhar), a proximidade usa geometria, listeners passivos e `requestAnimationFrame`, sem baixar todos os slides antecipadamente. Redução de movimento não antecipa esses downloads; mantém os carrosséis aprovados.

### Entradas e parallax

Entradas por blocos: opacidade e deslocamento único; cada alvo deixa de ser observado ao entrar. A classe que oculta os alvos só é ativada depois da criação/configuração do observador. Mídias aguardam a imagem principal; erro ou timeout também liberam o bloco. Sem JavaScript, sem observador ou com redução de movimento, o conteúdo fica visível.

Parallax desktop: progresso limitado a 0–1, com `requestAnimationFrame` e listener passivo. O listener de rolagem é removido quando desativado. No mobile ou com redução de movimento não há deslocamento. Background quadrado ou alto é escolhido conforme proporção da viewport, sem modificar os arquivos originais.

## Entrega e ferramentas

JPEG/PNG preservados, sem reconversão nesta revisão. Hero prioritário; cabeçalho usa logo JPEG de 128 px diretamente. Hero, logo da oferta e demais mídias responsivas usam variantes e `sizes`; imagens secundárias têm dimensões declaradas e decodificação assíncrona. WhatsApp usa o PNG original pela nitidez. Só arquivos usados e todas as variantes necessárias permanecem; não há política de preservar masters substituídos.

GitHub Pages controla cabeçalhos e compressão. Novas versões de imagens recebem novos nomes; não há cache programático. O servidor opcional `node tools/preview.cjs` resolve a raiz a partir de sua pasta, bloqueia caminhos externos também após resolução de links e preserva MIME do favicon, JavaScript, robots e sitemap.

## Métricas e validação

HTML 24.365 B; CSS 22.424 B; JS 7.180 B; soma 53.969 B. HTML fonte: 274 elementos incluindo fallback; DOM inicial com JS: 266. Assets: 31 arquivos / 9.739.383 B, incluindo 27 variantes / 7.875.619 B; favicon separado: 6.897 B. Inventário visual total: 32 arquivos / 9.746.280 B.

Barra de rolagem: scrollbar-color padrão e fallback WebKit para navegadores sem suporte. Indicador vermelho #d41414 e trilho #090909, sem alteração da largura nativa. Em forced-colors, preserva as cores do sistema.

Transferência local observada: 1.843.192 B de recursos locais após 2 s, contexto novo Edge 1280 × 720, sem rolagem; exclui navegação HTML e fontes externas. Não confundir com armazenamento, total de variantes, score Lighthouse ou medição pública.

Referências antes/depois em 360, 430, 760, 804, 950 e 1860 px: nenhum novo overflow, posições e dimensões das seções iguais. Cenários normal, lento, imagem indisponível, sem JS, sem observador, observador com erro e movimento reduzido aprovados. Testes opcionais e artefatos temporários estão documentados no README. Deploy e Lighthouse frio no domínio público permanecem etapas posteriores.
