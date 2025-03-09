
// Formatar o nome
document.getElementById('nome_completo').addEventListener('input', function(e) {
    // Remover qualquer caractere que não seja uma letra
    e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúãõâêîôûàèìòùçÁÉÍÓÚÃÕÂÊÎÔÛÀÈÌÒÙÇ ]/g, '');
});


// Formatar data
document.getElementById('data_nascimento').addEventListener('input', function() {
    var dataInput = this.value;
    var errorMessage = document.getElementById('data_error');
    
    // Verifica se a data está no formato correto YYYY-MM-DD
    var dataRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    if (!dataRegex.test(dataInput)) {
        errorMessage.style.display = 'inline'; // Exibe a mensagem de erro
    } else {
        errorMessage.style.display = 'none'; // Esconde a mensagem de erro
    }
});

// Formatar cpf
document.addEventListener("DOMContentLoaded", function () {
    const cpfInput = document.getElementById("cpf");

    cpfInput.addEventListener("input", function () {
        let valor = cpfInput.value;

        // Remover caracteres que não são números
        valor = valor.replace(/\D/g, "");

        // Aplicar a mascara: 000.000.000-00
        if (valor.length > 3) {
            valor = valor.replace(/^(\d{3})(\d)/, "$1.$2");
        }
        if (valor.length > 6) {
            valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
        }
        if (valor.length > 9) {
            valor = valor.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
        }

        // Limita o número de caracteres
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

// Formatar a rua
document.getElementById('rua').addEventListener('input', function(e) {
    // Remove qualquer caractere que não seja número ou letra
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
});


// Formatar o numero
document.getElementById('numero_residencia').addEventListener('input', function(e) {
    // Remove qualquer caractere que não seja número
    e.target.value = e.target.value.replace(/\D/g, '');
});


// Formatar a cidade
document.getElementById('cidade').addEventListener('input', function(e) {
    // Remover qualquer caractere que não seja uma letra
    e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúãõâêîôûàèìòùçÁÉÍÓÚÃÕÂÊÎÔÛÀÈÌÒÙÇ ]/g, '');
});
    

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
