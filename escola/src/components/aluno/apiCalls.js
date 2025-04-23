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

export const handleGeneratePDF = async () => {
  try {
    const pdfData = {
      aluno: {
        ...formData,
        data_nascimento: aluno.data_nascimento,
        data_matricula: aluno.data_matricula,
        turma: turmas.find((t) => t.id === formData.id_turma)?.nome || "",
      },
      endereco: {
        estado: formData.estado,
        cidade: formData.cidade,
        rua: formData.rua,
        cep: formData.cep,
      },
      responsavel: {
        nome: formData.nome_responsavel,
      },
      pagamento: {
        situacao: formData.situacao_pagamento,
      },
    };

    const response = await fetch("/api/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pdfData),
    });
    if (!response.ok) throw new Error("Failed to generate PDF");

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `ficha_${formData.nome_completo.replace(/\s/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("PDFerror:" + error);
    alert('Erro no PDF: '+error.message)
  }
};
