import { useState } from "react";
import "./App.css";

export default function App() {
  const [address, setAddress] = useState({
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    uf: "",
    localidade: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name !== "cep") {
      setAddress((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

    let cepFormatado = value.replace(/\D/g, "");

    if (cepFormatado.length > 8) {
      cepFormatado = cepFormatado.slice(0, 8);
    }

    const cepExibicao =
      cepFormatado.length > 5
        ? `${cepFormatado.slice(0, 5)}-${cepFormatado.slice(5)}`
        : cepFormatado;

    setAddress((prev) => ({
      ...prev,
      cep: cepExibicao,
    }));

    if (cepFormatado.length < 8) {
      setAddress((prev) => ({
        ...prev,
        cep: cepExibicao,
        logradouro: "",
        bairro: "",
        uf: "",
        localidade: "",
      }));
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepFormatado}/json/`
      );

      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado!");

        setAddress((prev) => ({
          ...prev,
          logradouro: "",
          bairro: "",
          uf: "",
          localidade: "",
        }));

        return;
      }

      setAddress((prev) => ({
        ...prev,
        cep: cepExibicao,
        logradouro: data.logradouro,
        bairro: data.bairro,
        uf: data.uf,
        localidade: data.localidade,
      }));
    } catch (error) {
      alert("Erro ao consultar o CEP.");
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
          maxLength={9}
        />

        <input
          type="text"
          name="logradouro"
          placeholder="Rua"
          value={address.logradouro}
          readOnly
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
          readOnly
        />

        <input
          type="text"
          name="uf"
          placeholder="UF"
          value={address.uf}
          readOnly
        />

        <input
          type="text"
          name="localidade"
          placeholder="Cidade"
          value={address.localidade}
          readOnly
        />
      </form>
    </div>
  );
}
