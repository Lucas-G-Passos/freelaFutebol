export async function buscarAlunos(field, value) {
  let url = `${import.meta.env.VITE_BACKENDURL}/api/aluno/check`;
  let method = "POST";
  let body = JSON.stringify({
    field,
    value: field === "turma" ? parseInt(value) : value,
  });

  if (field === "pagamento") {
    if (value === "adimplente") {
      url = `${import.meta.env.VITE_BACKENDURL}/api/aluno/adimplente`;
    } else if (value === "inadimplente") {
      url = `${import.meta.env.VITE_BACKENDURL}/api/aluno/inadimplente`;
    } else {
      throw new Error("Situação de pagamento inválida");
    }
    method = "GET";
    body = null;
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    ...(body && { body }),
  });

  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}

export async function buscarTurmas() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKENDURL}/api/turmas`,
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

// apiCalls.js
export async function getNalunos() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKENDURL}/api/aluno/total`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch student count:", error);
    throw new Error(
      "Could not retrieve student count. Please try again later."
    );
  }
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

    const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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
    alert("Erro no PDF: " + error.message);
  }
};
