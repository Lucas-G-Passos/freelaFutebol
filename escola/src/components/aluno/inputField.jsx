export default function AlunoSearchInput({
  searchField,
  searchValue,
  setSearchValue,
  turmas,
}) {
  if (searchField === "turma") {
    return (
      <select
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="turma-select"
      >
        <option value="">Selecione uma turma</option>
        {turmas.map((turma) => (
          <option key={turma.id} value={turma.id}>
            {turma.nome}
          </option>
        ))}
      </select>
    );
  } else if (searchField === "pagamento") {
    return (
      <select
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="turma-select"
      >
        <option value="">Selecione uma Situação</option>
        <option value="adimplente">Adimplente</option>
        <option value="inadimplente">Inadimplente</option>
      </select>
    );
  } else if (searchField === "data_matricula") {
    return(
      <input
      type="date"
      onChange={(e) => setSearchValue(e.target.value)}
      >
      </input>
    )
  } else {
    return (
      <input
        type="text"
        placeholder="Digite o valor"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    );
  }
}
