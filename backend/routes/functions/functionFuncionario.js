import db from "../../db.js";

async function getNFuncionarios() {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM funcionarios");
    return rows[0].total;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function getFuncionarios(filters) {
  try {
    const fieldMap = {
      nome_completo: "nome_completo",
      filial: "id_filial",
    };

    const [field, value] = Object.entries(filters)[0];
    const dbField = fieldMap[field];

    let query = `SELECT 
      f.id,
      f.nome_completo,
      f.data_nascimento,
      f.telefone1,
      f.telefone2,
      f.cargo,
      f.rg,
      f.cpf,
      f.data_admissao,
      f.foto,
      f.jornada_escala,
      f.situacao,
      fil.nome AS filial_nome,
      func_endereco.cep,
      func_endereco.cidade,
      func_endereco.estado,
      func_endereco.rua,
      func_endereco.numero AS numero_rua,
      func_endereco.id AS endereco_id
    FROM 
      funcionarios f
    LEFT JOIN filial fil 
      ON f.id_filial = fil.id
    LEFT JOIN endereco func_endereco 
      ON f.id_endereco = func_endereco.id
    WHERE f.${dbField} COLLATE utf8mb4_unicode_ci `;

    let params = [`%${value}%`];

    if (field === "filial") {
      query += "= ?";
      params = [value];
    } else {
      query += "LIKE ?";
    }

    const [rows] = await db.query(query, params);
    return rows.length > 0 ? rows : null;
  } catch (error) {
    console.error("Falha ao procurar Funcionarios. Erro:", error);
    throw error;
  }
}

async function getAllFuncionario() {
  try {
    const query = `SELECT 
      f.id,
      f.nome_completo,
      f.data_nascimento,
      f.telefone1,
      f.telefone2,
      f.cargo,
      f.rg,
      f.cpf,
      f.data_admissao,
      f.foto,
      f.jornada_escala,
      f.situacao,
      fil.nome AS filial_nome,
      func_endereco.cep,
      func_endereco.cidade,
      func_endereco.estado,
      func_endereco.rua,
      func_endereco.numero AS numero_rua,
      func_endereco.id AS endereco_id
    FROM 
      funcionarios f
    LEFT JOIN filial fil 
      ON f.id_filial = fil.id
    LEFT JOIN endereco func_endereco 
      ON f.id_endereco = func_endereco.id
     `;
    const [rows] = await db.query(query);
    return rows.length > 0 ? rows : null;
  } catch (error) {
    console.error("Falha ao procurar Funcionarios. Erro:", error);
    throw error;
  }
}
export { getNFuncionarios, getFuncionarios, getAllFuncionario };
