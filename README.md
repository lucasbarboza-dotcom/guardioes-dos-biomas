# Guardiões dos Biomas — WebXR

Candidata WebXR recuperada do projeto anterior: seis biomas, dois desafios ambientais por fase, labirintos, saída condicionada aos acertos e progressão. A versão experimental anterior com apenas Amazônia não foi tratada como validada.

## Controles
- Meta Quest Browser: Entrar em VR; analógico esquerdo para avançar/recuar na direção aproximada do olhar; analógico direito para giros de 30 graus. Solte o analógico entre movimentos.
- Aponte o raio do controle para uma resposta e pressione o gatilho. Botão lateral de segurar abre o mapa durante a exploração.
- Computador/celular: setas, WASD ou botões. Mapa e visão elevada disponíveis na tela.
- Movimento por células, sem deslocamento contínuo. As paisagens são representações artísticas.

## Publicação
O fluxo `.github/workflows/pages.yml` testa e publica os arquivos estáticos no GitHub Pages após um push para `main`. A configuração do repositório deve usar GitHub Actions como origem do Pages. A biblioteca Three.js 0.160.1 está incluída localmente, com sua licença, sem depender de CDN na execução.

## Verificação em 13/11/2026
- `npm test`: dois testes passaram, percorrendo as seis fases e os 12 desafios, incluindo erros, bloqueio da saída, colisões e reinício.
- `node --check game.js`: passou.
- Renderização no navegador remoto: bloqueada pelo ambiente (WebGL desativado).
- Sessão imersiva, seleção pelo controle, conforto e desempenho: ainda exigem teste real no Quest. Esta candidata não é apresentada como versão final validada.
- Repositório remoto encontrado vazio. Publicação pendente de conexão autenticada à conta GitHub.

## Conteúdo recuperado
Perguntas e sequência de biomas aproveitadas de `guardioes_biomas.html`, arquivo anterior do projeto. Labirintos foram regularizados e verificados para evitar linhas de larguras diferentes e objetivos inacessíveis.
