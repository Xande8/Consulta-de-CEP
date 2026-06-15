import { useState } from "react";

export default function App() {
  const [address, setAddress] = useState({
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    uf: "",
    localidade: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress({
      ...address,
      [name]: value,
    });

    if (name === "cep") {
      const cep = value.replace(/\D/g, "");

      if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then((response) => response.json())
          .then((data) => {
            if (!data.erro) {
              setAddress((prev) => ({
                ...prev,
                cep: value,
                logradouro: data.logradouro,
                bairro: data.bairro,
                uf: data.uf,
                localidade: data.localidade,
              }));
            } else {
              alert("CEP não encontrado!");
            }
          })
          .catch(() => {
            alert("Erro ao consultar CEP.");
          });
      }
    }
  };

  return (
    <div className="container">
      <h1>Address</h1>

      <form>
        <input
          type="text"
          name="cep"
          placeholder="CEP"
          value={address.cep}
          onChange={handleChange}
        />

        <input
          type="text"
          name="logradouro"
          placeholder="Rua"
          value={address.logradouro}
          onChange={handleChange}
        />

        <input
          type="text"
          name="numero"
          placeholder="Número"
          value={address.numero}
          onChange={handleChange}
        />

        <input
          type="text"
          name="bairro"
          placeholder="Bairro"
          value={address.bairro}
          onChange={handleChange}
        />

        <input
          type="text"
          name="uf"
          placeholder="UF"
          value={address.uf}
          onChange={handleChange}
        />

        <input
          type="text"
          name="localidade"
          placeholder="Cidade"
          value={address.localidade}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
