#Go Belém - Turismo Gamificado
##Descrição

O Go Belém é um site de turismo gamificado que permite aos usuários explorar a cidade de Belém do Pará de maneira interativa e divertida. O sistema incentiva o turismo local por meio de desafios, recompensas e pontos, conectando turistas à cultura, gastronomia e pequenos empreendedores locais.

O site inclui:

Cadastro e login de usuários com pontos iniciais.

Visualização de pontos do usuário em tempo real.

Seção de recompensas, incluindo histórico de recompensas resgatadas.

Barra de pesquisa para encontrar recompensas específicas.

Responsividade e animações na rolagem da página.

Modal de login e cadastro.

##Tecnologias Utilizadas

HTML5 – Estrutura do site.

CSS3 – Estilização, animações e responsividade.

JavaScript – Funcionalidades, cadastro/login, gerenciamento de pontos e recompensas.

Font Awesome – Ícones para navegação, recursos e recompensas.

LocalStorage – Armazenamento de usuários e pontos localmente no navegador (sem servidor).

##Estrutura de Arquivos
/GoBelem
│
├── index.html              # Página principal
├── pagRecompensa.html      # Página de recompensas
├── css/
│   └── style.css           # Estilos do site
├── Script/
│   └── script.js           # Funções JS para login, cadastro, pontos e recompensas
├── img/
│   ├── logo.png
│   ├── reward1.png
│   ├── reward2.png
│   ├── reward3.png
│   ├── reward4.png
│   └── Pontos/
│       ├── Ver-oPeso-Belem.jpg
│       ├── Cidade-Velha.jpg
│       └── Estacao-doca.jpg
└── README.md

##Funcionalidades
###1. Cadastro e Login

Os usuários podem se cadastrar com nome, e-mail e senha.

Cada usuário recebe 500 pontos iniciais.

Login verifica o e-mail e senha do usuário.

O usuário logado é armazenado no LocalStorage.

###2. Pontos

Os pontos são exibidos em tempo real no canto superior direito.

Pontos aumentam ou diminuem conforme o usuário completa desafios ou resgata recompensas.

###3. Recompensas

Os usuários podem resgatar recompensas se tiverem pontos suficientes.

As recompensas resgatadas ficam salvas no histórico do usuário.

Pesquisa de recompensas por nome.

Mensagem "Recompensa indisponível" aparece se não houver correspondência na pesquisa.

###4. Interface

Navegação intuitiva com menu superior.

Animações suaves ao rolar a página.

Modal para login e cadastro.

Responsivo para dispositivos móveis.

##Como Executar

Clone ou faça download do repositório:

git clone <link-do-repositorio>


Abra o arquivo index.html no navegador.

Use o cadastro para criar uma conta ou faça login com uma existente.

Navegue pelas seções, veja seus pontos e resgate recompensas.

##Observações

Todos os dados de usuários, pontos e recompensas são armazenados localmente no navegador (LocalStorage).

Este projeto não possui backend. Para persistência real entre dispositivos, seria necessário integrar com banco de dados e servidor.
