// services/alunoService.js
export async function buscarAlunos(field, value) {
  let url = "http://192.168.1.171:5000/api/aluno/check";
  let method = "POST";
  let body = JSON.stringify({
    field,
    value: field === "turma" ? parseInt(value) : value,
  });

  if (field === "pagamento") {
    if (value === "adimplente") {
      url = "http://192.168.1.171:5000/api/aluno/adimplente";
    } else if (value === "inadimplente") {
      url = "http://192.168.1.171:5000/api/aluno/inadimplente";
    } else {
      throw new Error("Situação de pagamento inválida");
    }
    method = "GET";
    body = null;
  }

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    ...(body && { body }),
  });

  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}

export async function buscarTurmas() {
  const response = await fetch("http://localhost:5000/api/turmas");
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

