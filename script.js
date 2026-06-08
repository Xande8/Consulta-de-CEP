const cepInput = document.getElementById("cep");

cepInput.addEventListener("blur", buscarCEP);

async function buscarCEP() {

    const cep = cepInput.value.replace(/\D/g, "");

    if (cep.length !== 8) {
        alert("CEP inválido!");
        return;
    }

    try {

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        const dados = await resposta.json();

        if (dados.erro) {
            alert("CEP não encontrado!");
            return;
        }

        document.getElementById("rua").value =
            dados.logradouro;

        document.getElementById("bairro").value =
            dados.bairro;

        document.getElementById("estado").value =
            dados.uf;

        document.getElementById("cidade").value =
            dados.localidade;

    } catch (erro) {

        console.error(erro);
        alert("Erro ao consultar o CEP.");

    }
}
