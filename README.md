# Go Belém - Turismo Gamificado

## Descrição

O **Go Belém** é um site de turismo gamificado que permite aos usuários explorar a cidade de Belém do Pará de maneira interativa e divertida. O sistema incentiva o turismo local por meio de **desafios, pontos e recompensas**, conectando turistas à cultura, gastronomia e pequenos empreendedores locais.

O site inclui:

- Cadastro e login de usuários com **pontos iniciais**.
- Visualização de **pontos do usuário** em tempo real.
- Seção de **recompensas**, incluindo histórico de recompensas resgatadas.
- Barra de pesquisa para encontrar recompensas específicas.
- Responsividade e animações na rolagem da página.
- Modal de login e cadastro.

---

## Tecnologias Utilizadas

- **HTML5** – Estrutura do site.
- **CSS3** – Estilização, animações e responsividade.
- **JavaScript** – Funcionalidades de login, cadastro, pontos e recompensas.
- **Font Awesome** – Ícones para navegação, recursos e recompensas.
- **LocalStorage** – Armazenamento de usuários e pontos localmente no navegador.

---

## Estrutura de Arquivos

/GoBelem
│
├── index.html # Página principal
├── pagRecompensa.html # Página de recompensas
├── css/
│ └── style.css # Estilos do site
├── Script/
│ └── script.js # Funções JS para login, cadastro, pontos e recompensas
├── img/
│ ├── logo.png
│ ├── reward1.png
│ ├── reward2.png
│ ├── reward3.png
│ ├── reward4.png
│ └── Pontos/
│ ├── Ver-oPeso-Belem.jpg
│ ├── Cidade-Velha.jpg
│ └── Estacao-doca.jpg
└── README.md

---

## Funcionalidades

### 1. Cadastro e Login
- Cadastro com **nome, e-mail e senha**.
- Cada usuário inicia com **500 pontos**.
- Login verifica e-mail e senha do usuário.
- O usuário logado é armazenado no **LocalStorage**.

### 2. Pontos
- Exibidos no canto superior direito.
- Atualizam automaticamente ao resgatar recompensas.

### 3. Recompensas
- Usuários podem **resgatar recompensas** se tiverem pontos suficientes.
- Recompensas resgatadas ficam no **histórico do usuário**.
- Possui **barra de pesquisa** para encontrar recompensas.
- Se nenhuma recompensa corresponder à pesquisa, aparece "Recompensa indisponível".

### 4. Interface
- Navegação com **menu superior fixo**.
- Animações suaves ao rolar a página.
- Modal para login e cadastro.
- Responsivo para **dispositivos móveis**.

---

## Como Executar

1. Clone ou faça download do repositório:
   ```bash
   git clone <link-do-repositorio>
