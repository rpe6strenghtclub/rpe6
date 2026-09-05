# Guia de marca e assets

## Identidade operacional

- Preto #090909, superfície #111111, vermelho #d41414, branco #eeeae6 e cinza #aaa4a0.
- Barlow Condensed variável 500–900 e Oswald 500.
- Alto contraste, caixa alta, linhas industriais e textura escura; “Academy” destacado em vermelho.
- RPE6 Strength é a marca do treinador; Strength Club é a equipe; Strength Academy é o produto educacional independente.

## Política atual — 2026-09-05

Site lançado em rpe6.com.br. Manter somente arquivos utilizados, incluindo todas as variantes responsivas referenciadas no HTML, data-srcset e noscript. Os 14 originais substituídos foram excluídos por autorização, sem backup adicional no projeto. Esta política substitui a antiga orientação de manter masters; o changelog preserva essa orientação apenas como histórico.

Não houve conversão de formato, redimensionamento ou redução de qualidade nesta refatoração. PNG para transparências, JPEG para fotos e marca; favicon ICO. Não excluir uma variante só porque não foi selecionada no teste. Ao substituir um asset, publicar nova versão no nome e atualizar referências.

## Inventário final

Caminhos abaixo relativos a `assets/`, salvo o favicon na raiz. Pesos em bytes; dimensões em pixels. Os arquivos em delivery são as variantes disponíveis, não downloads obrigatórios de uma visita.

| Arquivo | Dimensões | Bytes | Uso |
| --- | --- | ---: | --- |
| `brand/delivery/rpe6-strength-academy-logo-128-v1.jpg` | 128×128 | 10996 | Cabeçalho |
| `brand/delivery/rpe6-strength-academy-logo-480-v1.jpg` | 480×480 | 78244 | Oferta |
| `brand/delivery/rpe6-strength-academy-logo-741-v1.jpg` | 741×741 | 101660 | Oferta retina |
| `images/rpe6-site-background-mobile.jpg` | 1844×4096 | 346377 | Mobile / desktop alto |
| `images/rpe6-site-background.jpg` | 4096×4096 | 470520 | Desktop |
| `images/whatsapp-icon.png` | 900×900 | 27719 | WhatsApp original |
| `images/delivery/rpe6-academy-laptop-640-v1.png` | 640×640 | 371094 | Academy 1 |
| `images/delivery/rpe6-academy-laptop-960-v1.png` | 960×960 | 735367 | Academy 1 retina |
| `images/delivery/rpe6-academy-platform-overview-640-v1.png` | 640×640 | 437331 | Academy 2 |
| `images/delivery/rpe6-academy-platform-overview-1000-v1.png` | 1000×1000 | 953412 | Academy 2 retina |
| `images/delivery/rpe6-method-deadlift2-360-v1.jpg` | 360×400 | 105579 | Método 1 |
| `images/delivery/rpe6-method-deadlift2-720-v1.jpg` | 720×800 | 337122 | Método 1 retina |
| `images/delivery/rpe6-competition-squat-01-360-v1.jpg` | 360×400 | 89897 | Método 2 |
| `images/delivery/rpe6-competition-squat-01-720-v1.jpg` | 720×800 | 250825 | Método 2 retina |
| `images/delivery/rpe6-competition-prep-02-360-v1.jpg` | 360×400 | 62972 | Método 3 |
| `images/delivery/rpe6-competition-prep-02-720-v1.jpg` | 720×800 | 184303 | Método 3 retina |
| `images/delivery/rpe6-competition-squat-03-360-v1.jpg` | 360×400 | 63596 | Método 4 |
| `images/delivery/rpe6-competition-squat-03-720-v1.jpg` | 720×800 | 176971 | Método 4 retina |
| `images/delivery/rpe6-competition-squat-04-360-v1.jpg` | 360×400 | 82708 | Método 5 |
| `images/delivery/rpe6-competition-squat-04-720-v1.jpg` | 720×800 | 244799 | Método 5 retina |
| `images/delivery/rpe6-community-group-760-v1.jpg` | 760×336 | 185253 | Equipe 1 |
| `images/delivery/rpe6-community-group-1520-v1.jpg` | 1520×672 | 518065 | Equipe 1 retina |
| `images/delivery/rpe6-team-01-760-v1.jpg` | 760×336 | 121647 | Equipe 2 |
| `images/delivery/rpe6-team-01-1520-v1.jpg` | 1520×672 | 333790 | Equipe 2 retina |
| `images/delivery/rpe6-team-02-760-v1.jpg` | 760×336 | 142139 | Equipe 3 |
| `images/delivery/rpe6-team-02-1520-v1.jpg` | 1520×672 | 406914 | Equipe 3 retina |
| `images/delivery/rpe6-team-03-760-v1.jpg` | 760×336 | 140340 | Equipe 4 |
| `images/delivery/rpe6-team-03-1520-v1.jpg` | 1520×672 | 403383 | Equipe 4 retina |
| `/favicon.ico` (raiz pública) | 16/32/48 | 6897 | Ícone da aba |
| `social/rpe6-strength-academy-social-v1.png` | 1200×630 | 1019148 | Open Graph e Twitter Card |

31 assets somam **9.739.383 bytes**. Subconjunto delivery: 27 arquivos / **7.875.619 bytes**. Com favicon: 32 arquivos / **9.746.280 bytes**. Os três originais ativos são os dois backgrounds e o WhatsApp; este permanece em 900×900 para manter nitidez com zoom interno de 1,6×.

## Uso e manutenção

Hero usa PNG 800/1400 com prioridade alta; cabeçalho usa logo 128 diretamente. Oferta usa logo 480/741. Academy: 640/960 e 640/1000; Método: 360/720; equipe: 760/1520. A seleção depende do espaço CSS, densidade e navegador. As dimensões declaradas no HTML preservam proporção e reserva de espaço.

Favicon continua na raiz ao lado do index.html, com rel=icon relativo e MIME image/x-icon no servidor local. Não movê-lo para delivery.

A imagem social é PNG 1200×630 baseada na logo atual, com fundo preto/vermelho e headline da Hero. Ela usa URL absoluta nos metadados Open Graph e Twitter Card; não é variante de entrega da página e é carregada por crawlers/plataformas de compartilhamento.

A transferência local observada e os tamanhos de código estão no README e na arquitetura. O armazenamento foi reduzido em 16.862.692 bytes, mas os originais já não participavam do download da página. Não apresentar essa limpeza como redução equivalente de transferência.
