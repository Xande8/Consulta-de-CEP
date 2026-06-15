import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    estado: "",
    cidade: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const buscarCEP = async () => {
    const cepLimpo = formData.cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      alert("Digite um CEP válido.");
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado!");

        setFormData((prevData) => ({
          ...prevData,
          rua: "",
          bairro: "",
          estado: "",
          cidade: "",
        }));

        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        rua: data.logradouro,
        bairro: data.bairro,
        estado: data.uf,
        cidade: data.localidade,
      }));
    } catch (error) {
      console.error(error);
      alert("Erro ao consultar o CEP.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Cadastro de Endereço</h1>

        <input
          type="text"
          name="cep"
          placeholder="CEP"
          value={formData.cep}
          onChange={handleChange}
          onBlur={buscarCEP}
        />

        <input
          type="text"
          name="rua"
          placeholder="Rua"
          value={formData.rua}
          readOnly
        />

        <input
          type="text"
          name="numero"
          placeholder="Número"
          value={formData.numero}
          onChange={handleChange}
        />

        <input
          type="text"
          name="bairro"
          placeholder="Bairro"
          value={formData.bairro}
          readOnly
        />

        <input
          type="text"
          name="estado"
          placeholder="Estado"
          value={formData.estado}
          readOnly
        />

        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={formData.cidade}
          readOnly
        />
      </div>
    </div>
  );
}

export default App;
