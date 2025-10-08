// Verifica se existe colaborador logado
const colaboradorLogado = JSON.parse(localStorage.getItem("colaboradorLogado"));
if (!colaboradorLogado) {
  alert("Acesso restrito! Faça login como ADM.");
  window.location.href = "index.html";
}

// Verifica se é um dos adms
const admsPermitidos = ["adm1@gobelem.com", "adm2@gobelem.com"];
if (!admsPermitidos.includes(colaboradorLogado.email)) {
  alert("Acesso negado. Apenas administradores podem acessar esta página.");
  window.location.href = "index.html";
}

// Formulário de novo colaborador
const form = document.getElementById("formNovoColab");
const lista = document.getElementById("listaColabs");

function atualizarLista() {
    const colaboradores = JSON.parse(localStorage.getItem("colaboradores")) || [];
    lista.innerHTML = colaboradores.map(c => `<li>${c.nome} - ${c.email}</li>`).join("");
}

form.addEventListener("submit", e => {
    e.preventDefault();
    const nome = document.getElementById("nomeColab").value.trim();
    const email = document.getElementById("emailColab").value.trim().toLowerCase();
    const senha = document.getElementById("senhaColab").value.trim();

    if (!nome || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
    }

    let colaboradores = JSON.parse(localStorage.getItem("colaboradores")) || [];

    if (colaboradores.find(c => c.email === email)) {
        alert("Já existe um colaborador com esse e-mail!");
    return;
    }

    colaboradores.push({ nome, email, senha });
    localStorage.setItem("colaboradores", JSON.stringify(colaboradores));

    alert("Novo colaborador adicionado!");
    form.reset();
    atualizarLista();
});

document.getElementById("btnSair").addEventListener("click", () => {
    localStorage.removeItem("colaboradorLogado");
    window.location.href = "index.html";
});

atualizarLista();
