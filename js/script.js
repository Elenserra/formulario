// ----------------- MÁSCARAS ------------------
// CPF
const cpfInputs = document.querySelectorAll('.cpf');

cpfInputs.forEach(function(cpfInput) {
    cpfInput.addEventListener('input', function () {
        let valor = cpfInput.value.replace(/\D/g, "");

        if (valor.length > 3) {
            valor = valor.replace(/^(\d{3})(\d)/, "$1.$2");
        }
        if (valor.length > 6) {
            valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
        }
        if (valor.length > 9) {
            valor = valor.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
        }

        cpfInput.value = valor.substring(0, 14);
    });
});

// Formatar telefone
document.addEventListener("DOMContentLoaded", function () {
    const telefoneInput = document.getElementById("telefone");

    telefoneInput.addEventListener("input", function (e) {
        let valor = e.target.value.replace(/\D/g, "");

        // Deixar no formato: (00) 00000-0000
        if (valor.length <= 2) {
            valor = `(${valor}`;
        } else if (valor.length <= 6) {
            valor = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
        } else if (valor.length <= 10) {
            valor = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7)}`;
        } else {
            valor = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7, 11)}`;
        }

        e.target.value = valor;
    });
});

function handleFileUpload(inputId, spanId) {
    document.getElementById(inputId).addEventListener('change', function () {
        const span = document.getElementById(spanId);
        if (this.files.length > 0) {
            span.textContent = this.files[0].name;
        } else {
            span.textContent = "Nenhum arquivo selecionado";
        }
    });
}

handleFileUpload('file-upload-identidade', 'identidade');
handleFileUpload('file-upload-comprovante', 'comprovante');

// Formatar CEP
document.addEventListener("DOMContentLoaded", function () {
    const cepInput = document.getElementById("cep");

    cepInput.addEventListener("input", function (e) {
        let valor = e.target.value.replace(/\D/g, "");

        // Limita o número de caracteres
        valor = valor.slice(0, 8);

        // Deixar no formato: 00000-000
        e.target.value = valor.length <= 5 ? valor.replace(/^(\d{5})(\d{0,3})/, "$1-$2") : valor.replace(/^(\d{5})(\d{3})/, "$1-$2");
    });
});


// -------------------- EVENTOS DOM -----------------------
document.addEventListener("DOMContentLoaded", function () {
    const nomeInput = document.getElementById("nome_completo");
    const dataInput = document.getElementById('data_nascimento');
    const cpfInputs = document.querySelectorAll('.cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');
    const ruaInput = document.getElementById('rua');
    const numeroInput = document.getElementById('numero_residencia');
    const cidadeInput = document.getElementById('cidade');

    // Nome - apenas letras
    if (nomeInput) {
        nomeInput.addEventListener('input', function (e) {
            e.target.value = e.target.value
                .replace(/[^a-zA-ZáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛãõÃÕçÇ\s]/g, '') 
                .replace(/\s{2,}/g, ' ') 
                .replace(/^\s+/, ''); 
        });
    }
    
    // Data
    if (dataInput) {
        dataInput.addEventListener('input', function () {
            const errorMessage = document.getElementById('data_error');
            const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
            errorMessage.style.display = dataRegex.test(this.value) ? "none" : "inline";
        });
    }

    // Aplicar máscaras
    cpfInputs.forEach(aplicarMascaraCPF);
    if (telefoneInput) aplicarMascaraTelefone(telefoneInput);
    if (cepInput) aplicarMascaraCEP(cepInput);

    // Rua - aceitar apenas letras e números
    if (ruaInput) {
        ruaInput.addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
        });
    }

    // Número da residência - aceitar apenas números
    if (numeroInput) {
        numeroInput.addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
        });
    }

    // Cidade - aceitar apenas letras
    if (cidadeInput) {
        cidadeInput.addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúãõâêîôûàèìòùçÁÉÍÓÚÃÕÂÊÎÔÛÀÈÌÒÙÇ ]/g, '');
        });
    }
});


const mensagemErro = document.getElementById('mensagemErro');
const botaoEnviar = document.getElementById('botaoEnviar');
const checkboxes = document.querySelectorAll('#opcao_trilha');
// Função para garantir que apenas um checkbox seja marcado
function permitirSomenteUmCheckbox() {
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            checkboxes.forEach(otherCheckbox => {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                }
            });
        });
    });
}
permitirSomenteUmCheckbox();
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const algumaTrilhaMarcada = Array.from(checkboxes).some(c => c.checked);
        if (algumaTrilhaMarcada) {
            mensagemErro.style.display = "none";
        }
    });
});

botaoEnviar.addEventListener('click', function (event) {
    const camposObrigatorios = [
        "nome_completo",
        "data_nascimento",
        "cpf",
        "telefone",
        "email",
        "cep",
        "rua",
        "numero_residencia",
        "cidade",
        "file-upload-identidade",
        "file-upload-comprovante",
        "aceitar_termos"
    ];

    let todosPreenchidos = true;

    camposObrigatorios.forEach(id => {
        const campo = document.getElementById(id);
    
        if (campo) {
            if (campo.type === "file") {
                if (campo.files.length === 0) {
                    todosPreenchidos = false;
                    campo.classList.add("erro");
                } else {
                    campo.classList.remove("erro");
                }
            } else if (campo.type === "checkbox") {
                if (!campo.checked) {
                    todosPreenchidos = false;
                    campo.classList.add("erro");
                } else {
                    campo.classList.remove("erro");
                }
            } else if (campo.value.trim() === "") {
                todosPreenchidos = false;
                campo.classList.add("erro");
            } else {
                campo.classList.remove("erro");
            }
        }
    });
    

    const algumaTrilhaMarcada = Array.from(checkboxes).some(c => c.checked);

    if (!algumaTrilhaMarcada) {
        event.preventDefault();
        mensagemErro.style.display = "block";
        if (!todosPreenchidos) {
            event.preventDefault();
        }
    }if (todosPreenchidos) {
        mensagemErro.style.display = "none";
        alert("Inscrição realizada com sucesso!");
        document.getElementById("formInscricao").reset();
        document.getElementById("identidade").textContent = "Nenhum arquivo selecionado";
        document.getElementById("comprovante").textContent = "Nenhum arquivo selecionado";
    }
});


// ------------------- VALIDAÇÃO DO E-MAIL -------------------
function validarEmail(email) {
    const regexEmail = /^[^\s@]+@(gmail\.com|hotmail\.com|icloud\.com|outlook\.com|yahoo\.com)$/;
    return regexEmail.test(email);
}



// ------------------- LOGIN E SIGNUP ------------------------
window.onload = function () {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
        const nomeInput = document.getElementById("nome_completo");
        const cpfInput = document.getElementById("cpf");
        const emailInput = document.getElementById("email");

        if (nomeInput) nomeInput.value = userData.nome || "";
        if (cpfInput) cpfInput.value = userData.cpf || "";
        if (emailInput) emailInput.value = userData.email || "";
    } else if (window.location.pathname.includes("formulario.html")) {
        alert("Nenhum usuário logado. Faça login novamente.");
        window.location.href = "login.html";
    }
};

function toggleForm(formId) {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    if (formId === "signupForm") {
        loginForm.style.display = "none";
        signupForm.style.display = "block";

        const nomeInput = document.getElementById("nome_completo");
        if (nomeInput && !nomeInput.dataset.listenerAdded) {
            nomeInput.addEventListener("input", function (e) {
                e.target.value = e.target.value
                    .replace(/[^a-zA-ZÀ-ÿ\s]/g, '')
                    .replace(/\s{2,}/g, ' ')
                    .replace(/^\s+/, '');
            });
            nomeInput.dataset.listenerAdded = true; 
        }
    } else {
        signupForm.style.display = "none";
        loginForm.style.display = "block";
    }
}


function login() {
    const cpf = document.getElementById("login_cpf").value.trim();
    const senha = document.getElementById("password").value;
    const loginError = document.getElementById("loginError");
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && cpf === userData.cpf && senha === userData.senha) {
        localStorage.setItem("usuarioLogado", "true");
        window.location.href = "formulario.html";
    } else {
        loginError.style.display = "block";
    }
}

function signup() {
    const newUsername = document.getElementById("nome_completo").value.trim();
    const newCpf = document.getElementById("signup_cpf").value.trim();
    const newEmail = document.getElementById("email").value.trim();
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const signupError = document.getElementById("signupError");

    if (!newUsername || !newCpf || !newEmail || !newPassword || !confirmPassword) {
        signupError.textContent = "Preencha todos os campos corretamente!";
        signupError.style.display = "block";
        return;
    }

    if (!validarEmail(newEmail)) {
        signupError.textContent = "Insira um e-mail válido";
        signupError.style.display = "block";
        return;
    }

    if (newPassword !== confirmPassword) {
        signupError.textContent = "As senhas não coincidem!";
        signupError.style.display = "block";
        return;
    }

    const userData = { nome: newUsername, cpf: newCpf, email: newEmail, senha: newPassword };
    localStorage.setItem("userData", JSON.stringify(userData));
    signupError.style.display = "none";
    alert("Cadastro realizado com sucesso!");
    toggleForm("loginForm");
}
