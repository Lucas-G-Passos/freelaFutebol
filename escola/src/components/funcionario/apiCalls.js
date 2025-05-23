export async function getFuncionarios(field, value) {
  const url = `${import.meta.env.VITE_BACKENDURL}/api/funcionario/check`;
  const method = "POST";
  const body = JSON.stringify({
    field,
    value,
  });

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: body,
  });

  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}

export async function getNFuncionarios() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKENDURL}/api/funcionario/total`,
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

export async function getFiliais() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKENDURL}/api/filial`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to get filiais: ", error);
    throw new Error("Não foi possível buscar filiais");
  }
}

export const handleSave = async (formattedData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKENDURL}/api/funcionario/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          funcionario: {
            id: formattedData.id,
            nome_completo: formattedData.nome_completo,
            data_nascimento: formattedData.data_nascimento,
            telefone1: formattedData.telefone1,
            telefone2: formattedData.telefone2,
            cargo: formattedData.cargo,
            rg: formattedData.rg,
            cpf: formattedData.cpf,
            data_admissao: formattedData.data_admissao,
            foto: formattedData.foto,
            filial_nome: formattedData.filial_nome,
            jornada_escala: formattedData.jornada_escala,
            situacao: formattedData.situacao,
          },
          endereco: {
            cep: formattedData.cep,
            cidade: formattedData.cidade,
            estado: formattedData.estado,
            rua: formattedData.rua,
            numero_rua: formattedData.numero_rua,
            id: formattedData.id_endereco
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao atualizar funcionário.");
    }

    const result = await response.json();
    console.log("Atualização bem-sucedida:", result);
  } catch (error) {
    console.error("Erro ao salvar:", error);
  }
};
