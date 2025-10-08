
// Bloqueio de acesso à página de recompensas
(function () {
  try {
    const filename = window.location.pathname.split('/').pop().toLowerCase();

    // só aplica quando o nome do arquivo contém "recompensa"
    if (!filename || !filename.includes('recompensa')) return;

    // chaves que podemos verificar no localStorage (inclui 'usuarioLogado' usado no seu script)
    const possibleKeys = ['usuarioLogado', 'loggedUser', 'user', 'usuario'];

    let logged = null;
    for (const k of possibleKeys) {
      const raw = localStorage.getItem(k);
      if (!raw) continue;
      try { logged = JSON.parse(raw); break; } catch (err) { /* ignora parsing error */ }
    }

    if (!logged) {
      alert('⚠️ Você precisa estar logado para acessar a página de recompensas!');
      // tenta redirecionar para index.html no mesmo diretório
      const base = window.location.pathname.replace(/\/[^\/]*$/, '/');
      window.location.href = base + 'index.html';
    }
  } catch (err) {
    // se der algum erro inesperado, redireciona também (fallback)
    alert('⚠️ Acesso restrito: você precisa estar logado.');
    window.location.href = 'index.html';
  }
})();

// Efeito de rolagem suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
          });
          
          // Fechar menu mobile se estiver aberto
          const navbar = document.querySelector('nav');
          if (navbar.classList.contains('active')) {
              navbar.classList.remove('active');
          }
      }
  });
});

// Adicionar classe ativa ao header quando rolar a página
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
      header.classList.add('scrolled');
  } else {
      header.classList.remove('scrolled');
  }
});

// Menu mobile (para telas pequenas)
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
  
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
});
// Fechar o menu mobile ao clicar fora dele
document.addEventListener('click', function(event) {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      nav.classList.remove('active');
  }
});  


// Animação de elementos quando aparecem na tela
const animateOnScroll = function() {
  const elements = document.querySelectorAll('.feature-item, .stat-item, .tour-card');
  
  elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
      }
  });
};

// Animação de elementos ao rolar a página
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('header');
  const logo = document.querySelector('.logo img, .logo');
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > 500) { // Ativa após px de rolagem
      navbar.classList.add('scrolled');
      if (logo && logo.classList.contains('logo')) {
          logo.style.height = '40px'; // Reduz o logo
      }
  } else {
      navbar.classList.remove('scrolled');
      if (logo && logo.classList.contains('logo')) {
          logo.style.height = '80px'; // Tamanho original
      }
  }
});

// Definir opacidade inicial para elementos animados
window.addEventListener('load', function() {
  const elements = document.querySelectorAll('.feature-item, .stat-item, .tour-card');
  elements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Disparar uma vez no carregamento
  animateOnScroll();
});

// Disparar animação ao rolar
window.addEventListener('scroll', animateOnScroll);

// Controle dos Modais de Login/Registro
document.addEventListener("DOMContentLoaded", function() {

  // Funções de LocalStorage
  function salvarUsuarios(usuarios) { localStorage.setItem("usuarios", JSON.stringify(usuarios)); }
  function carregarUsuarios() { return JSON.parse(localStorage.getItem("usuarios")) || []; }
  function salvarUsuarioLogado(usuario) { localStorage.setItem("usuarioLogado", JSON.stringify(usuario)); }
  function carregarUsuarioLogado() { return JSON.parse(localStorage.getItem("usuarioLogado")); }
  function mostrarPontos(pontos) { 
    const pontosEl = document.getElementById("pontosUsuario"); 
    if (pontosEl) pontosEl.innerText = `Você tem ${pontos} pontos`;
  }

  function atualizarUsuarioLogado(usuario) {
    salvarUsuarioLogado(usuario);
    let usuarios = carregarUsuarios();
    const idx = usuarios.findIndex(u => u.email === usuario.email);
    if(idx !== -1){ usuarios[idx] = usuario; salvarUsuarios(usuarios); }
    mostrarPontos(usuario.pontos);
  }

  // Mostrar pontos ao carregar página
  const logado = carregarUsuarioLogado();
  if(logado) mostrarPontos(logado.pontos);

  // Modais login/registro
  const loginModal = document.getElementById('loginModal');
  const registerModal = document.getElementById('registerModal');

  // Abrir modais
  document.querySelectorAll('.show-login, .show-login-link').forEach(btn => btn.addEventListener('click', e => {
    e.preventDefault();
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }));
  document.querySelectorAll('.show-register, .show-register-link').forEach(btn => btn.addEventListener('click', e => {
    e.preventDefault();
    registerModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }));

  // Fechar modais
  document.querySelectorAll('.close-modal').forEach(btn => btn.addEventListener('click', () => {
    loginModal.style.display = 'none';
    registerModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }));
  window.addEventListener('click', e => {
    if(e.target===loginModal || e.target===registerModal) {
      loginModal.style.display='none';
      registerModal.style.display='none';
      document.body.style.overflow='auto';
    }
  });

  // Cadastro
  document.querySelector(".register-form")?.addEventListener("submit", function(e){
    e.preventDefault();
    const nome = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim().toLowerCase();
    const senha = document.getElementById("register-password").value.trim();

    let usuarios = carregarUsuarios();
    if(usuarios.find(u => u.email === email)){ alert("E-mail já cadastrado!"); return; }

    usuarios.push({nome,email,senha,pontos:5000});
    salvarUsuarios(usuarios);

    alert("Cadastro realizado! Faça login.");
    this.reset();
    registerModal.style.display="none";
    document.body.style.overflow="auto";
  });

  // Login
  document.querySelector(".login-form")?.addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const senha = document.getElementById("login-password").value.trim();

    let usuarios = carregarUsuarios();
    const usuario = usuarios.find(u => u.email===email && u.senha===senha);

    if(usuario){
      alert(`Bem-vindo, ${usuario.nome}!`);
      salvarUsuarioLogado(usuario);
      mostrarPontos(usuario.pontos);
      this.reset();
      loginModal.style.display="none";
      document.body.style.overflow="auto";
    } else {
      alert("E-mail ou senha incorretos!");
    }
  });

// Mostrar recompensas resgatadas
function atualizarRecompensasResgatadas() {
    const usuario = carregarUsuarioLogado();
    const lista = document.getElementById("recompensasResgatadasList");
    if (!usuario || !lista) return;

    // Limpa a lista
    lista.innerHTML = "";

    if (!usuario.recompensas) {
        usuario.recompensas = [];
    }

    if (usuario.recompensas.length === 0) {
        lista.innerHTML = "<p>Você ainda não resgatou nenhuma recompensa.</p>";
        return;
    }

    // Adiciona cada recompensa resgatada
    usuario.recompensas.forEach(r => {
        const div = document.createElement("div");
        div.className = "recompensa-resgatada";
        div.innerHTML = `
            <h3>${r.nome}</h3>
            <p>${r.descricao}</p>
            <p>Pontos gastos: ${r.pontos}</p>
        `;
        lista.appendChild(div);
    });
}
// Resgatar recompensas
document.querySelectorAll(".resgatar").forEach(btn => {
    btn.addEventListener("click", function() {
        const usuario = carregarUsuarioLogado();
        if (!usuario) {
            alert("Você precisa estar logado para resgatar recompensas!");
            return;
        }

        const custo = parseInt(this.getAttribute("data-pontos"));
        const nome = this.previousElementSibling.previousElementSibling.innerText; // pega título da recompensa
        const descricao = this.previousElementSibling.innerText; // pega descrição

        if (usuario.pontos >= custo) {
            usuario.pontos -= custo;

            if (!usuario.recompensas) usuario.recompensas = [];

            usuario.recompensas.push({
                nome,
                descricao,
                pontos: custo
            });

            atualizarUsuarioLogado(usuario);
            atualizarRecompensasResgatadas();
            alert(`Recompensa resgatada! Você gastou ${custo} pontos.`);
        } else {
            alert("Você não tem pontos suficientes para resgatar essa recompensa.");
        }
    });
});
// Atualiza recompensas resgatadas ao carregar a página
window.addEventListener("DOMContentLoaded", function () {
    atualizarRecompensasResgatadas();
});
});

// ============================
// Pesquisa de recompensas
// ============================
const inputPesquisa = document.getElementById("pesquisaRecompensas");
const mensagemPesquisa = document.getElementById("mensagemPesquisa");

if (inputPesquisa) {
    inputPesquisa.addEventListener("input", function() {
        const termo = this.value.toLowerCase();
        const recompensas = document.querySelectorAll(".recompensas .container");
        let encontrou = false;

        recompensas.forEach(recompensa => {
            const nome = recompensa.querySelector("h3").innerText.toLowerCase();
            if (nome.includes(termo)) {
                recompensa.style.display = "block";
                encontrou = true;
            } else {
                recompensa.style.display = "none";
            }
        });

        // Mostrar ou esconder mensagem
        if (!encontrou) {
            mensagemPesquisa.style.display = "block";
        } else {
            mensagemPesquisa.style.display = "none";
        }
    });
}
// ============================
// Login de Colaboradores
// ============================
document.addEventListener("DOMContentLoaded", function() {
  const loginColabModal = document.getElementById('loginColabModal');

  // Abrir modal de colaborador
  document.querySelectorAll('.show-login-colab-link').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      loginColabModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  // Fechar modal
  loginColabModal.querySelector('.close-modal').addEventListener('click', () => {
    loginColabModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  window.addEventListener('click', e => {
    if (e.target === loginColabModal) {
      loginColabModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Cadastrando ADM
  if (!localStorage.getItem("colaboradores")) {
    const colaboradoresPadrao = [
      { nome: "adm1", email: "adm1@gobelem.com", senha: "12345" },
      { nome: "adm2", email: "adm2@gobelem.com", senha: "senha123" }
    ];
    localStorage.setItem("colaboradores", JSON.stringify(colaboradoresPadrao));
  }


  // Login de colaborador
  document.querySelector(".login-colab-form")?.addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("colab-email").value.trim().toLowerCase();
    const senha = document.getElementById("colab-password").value.trim();

    const colaboradores = JSON.parse(localStorage.getItem("colaboradores")) || [];
    const colaborador = colaboradores.find(c => c.email === email && c.senha === senha);

    if (colaborador) {
      alert(`Bem-vindo, ${colaborador.nome}!`);
      localStorage.setItem("colaboradorLogado", JSON.stringify(colaborador));
      this.reset();
      loginColabModal.style.display = 'none';
      document.body.style.overflow = 'auto';
//      window.location.href = "colaborador.html"; // redireciona para página especial
    } else {
      alert("E-mail ou senha incorretos!");
    }
  });
});


let map;
let markers = [];
let points = [];
let routingControl;

document.addEventListener("DOMContentLoaded", () => {
    // Inicializa o mapa em Belém
    map = L.map('map').setView([-1.4558, -48.4902], 13);

    // Adiciona o mapa base (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    // Botão adicionar ponto
    document.getElementById("addPoint").addEventListener("click", () => {
        const query = document.getElementById("place-search").value.trim();
        if (!query) {
            alert("Digite um local para adicionar.");
            return;
        }

        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Belém, Brasil')}`)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    alert("Local não encontrado. Tente outro nome.");
                    return;
                }

                const place = data[0];
                const lat = parseFloat(place.lat);
                const lon = parseFloat(place.lon);

                points.push([lat, lon]);
                addPointToList(place.display_name);

                const marker = L.marker([lat, lon]).addTo(map);
                markers.push(marker);

                map.setView([lat, lon], 14);
            })
            .catch(() => alert("Erro ao buscar o local."));
    });

    // Botão limpar
    document.getElementById("clearPoints").addEventListener("click", () => {
        points = [];
        markers.forEach(m => map.removeLayer(m));
        markers = [];
        document.getElementById("pointsList").innerHTML = "";
        if (routingControl) map.removeControl(routingControl);
    });

    // Botão traçar rota
    document.getElementById("tracarRota").addEventListener("click", () => {
        if (points.length < 2) {
            alert("Adicione pelo menos dois pontos para traçar a rota.");
            return;
        }

        if (routingControl) map.removeControl(routingControl);

        routingControl = L.Routing.control({
            waypoints: points.map(p => L.latLng(p[0], p[1])),
            routeWhileDragging: false,
            language: 'pt-BR'
        }).addTo(map);
    });
});

// Adiciona o nome do local à lista
function addPointToList(name) {
    const list = document.getElementById("pointsList");
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
}


