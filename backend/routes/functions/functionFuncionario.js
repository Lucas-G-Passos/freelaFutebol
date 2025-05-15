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
async function getFuncionarios(field, value) {
  try {
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
    func_endereco.numero as numero_rua
FROM 
    funcionarios f
LEFT JOIN 
    filial fil ON f.id_filial = fil.id
LEFT JOIN 
    endereco func_endereco ON f.id_endereco = func_endereco.id
LEFT JOIN 
    endereco fil_endereco ON fil.id_endereco = fil_endereco.id;
    WHERE f.${field} COLLATE utf8mb4_unicode_ci LIKE ?
    `;
    
    let params = [`%${value}%`];
    if([/* Insert here */].includes(field)){
        query = query.replace("LIKE ?","= ?");
        params = [value];
    }

    const [rows] = await db.query(query);
    return rows.length > 0 ? rows : null;
  } catch (error) {
    console.error("Falha ao procurar Funcionarios. Erro:" + error);
    throw error;
  }
}

export default {
    getNFuncionarios,
    getFuncionarios
}
