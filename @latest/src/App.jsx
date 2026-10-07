import { useState } from "react";

function App() {
  const [ideias, setIdeias] = useState([]);
  const [novaIdeia, setNovaIdeia] = useState("");

  function adicionarIdeia(event) {
    event.preventDefault();

    if (!novaIdeia.trim()) {
      return;
    }

    const nova = {
      id: Date.now(),
      texto: novaIdeia.trim(),
      concluida: false
    };

    setIdeias([...ideias, nova]);
    setNovaIdeia("");
  }

  function marcarConcluida(id) {
    setIdeias(
      ideias.map((ideia) =>
        ideia.id === id
          ? { ...ideia, concluida: !ideia.concluida }
          : ideia
      )
    );
  }

  function removerIdeia(id) {
    setIdeias(
      ideias.filter((ideia) => ideia.id !== id)
    );
  }

  const totalConcluidas = ideias.filter(
    (ideia) => ideia.concluida
  ).length;

  return (
    <main className="app">
      <section className="painel">

        <h1>💡 Painel de Ideias</h1>

        <p className="subtitulo">
          Organize suas ideias de forma simples
        </p>

        <form
          className="formulario"
          onSubmit={adicionarIdeia}
        >
          <input
            type="text"
            placeholder="Digite uma nova ideia..."
            value={novaIdeia}
            onChange={(event) =>
              setNovaIdeia(event.target.value)
            }
          />

          <button type="submit">
            Adicionar
          </button>
        </form>

        <div className="lista">
          {ideias.map((ideia) => (
            <div
              className={`ideia ${
                ideia.concluida ? "concluida" : ""
              }`}
              key={ideia.id}
            >
              <input
                type="checkbox"
                checked={ideia.concluida}
                onChange={() =>
                  marcarConcluida(ideia.id)
                }
              />

              <span>{ideia.texto}</span>

              <button
                className="botao-remover"
                onClick={() =>
                  removerIdeia(ideia.id)
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="contador">
          <strong>{ideias.length}</strong> ideias no painel
          {" • "}
          <strong>{totalConcluidas}</strong> concluídas
        </div>

      </section>
    </main>
  );
}

export default App;