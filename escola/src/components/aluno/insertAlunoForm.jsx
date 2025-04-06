import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AlunoForm() {
  const [alunoData, setAlunoData] = useState({
    id_turma: '', nome_completo: '', data_nascimento: '', data_matricula: '', telefone1: '', telefone2: '', foto: '', rg: '', cpf: '', convenio: '', alergia: '', uso_medicamento: '', medicamento_horario: '', atestado_medico: 'S', colegio: '', colegio_ano: '', time_coracao: '', indicacao: '', observacao: '',
  });

  const [responsavelData, setResponsavelData] = useState({ nome_completo: '', cpf: '', telefone1: '', telefone2: '', email: '' });
  const [pagamentoData, setPagamentoData] = useState({ valor: '', data_vencimento: '' });
  const [enderecoData, setEnderecoData] = useState({ rua: '', numero: '', cidade: '', estado: '', cep: '' });
  const [turmas, setTurmas] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchTurmas() {
      try {
        const response = await axios.get('/api/turmas');
        const data = response.data;
        console.log("Turmas carregadas:", data);
        setTurmas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao buscar turmas:", error);
        setTurmas([]);
      }
    }
    fetchTurmas();
  }, []);

  const handleAlunoChange = (e) => setAlunoData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleResponsavelChange = (e) => setResponsavelData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handlePagamentoChange = (e) => setPagamentoData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleEnderecoChange = (e) => setEnderecoData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Enviando endereço:", enderecoData);
      const enderecoRes = await axios.post('/api/insert', { tableName: 'endereco', data: enderecoData });
      const id_endereco = enderecoRes.data.id;

      console.log("Enviando responsável:", responsavelData);
      const responsavelRes = await axios.post('/api/insert', {
        tableName: 'responsavel',
        data: { ...responsavelData, id_endereco: id_endereco }
      });
      const id_responsavel = responsavelRes.data.id;

      console.log("Enviando aluno:", alunoData);
      await axios.post('/api/insert', {
        tableName: 'alunos',
        data: { ...alunoData, id_turma: Number(alunoData.id_turma), id_responsavel, id_endereco }
      });

      console.log("Enviando pagamento:", pagamentoData);
      await axios.post('/api/insert', {
        tableName: 'pagamento',
        data: { ...pagamentoData, id_responsavel }
      });

      setMessage('Aluno, responsável, pagamento e endereço inseridos com sucesso!');
      setAlunoData({ id_turma: '', nome_completo: '', data_nascimento: '', data_matricula: '', telefone1: '', telefone2: '', foto: '', rg: '', cpf: '', convenio: '', alergia: '', uso_medicamento: '', medicamento_horario: '', atestado_medico: 'S', colegio: '', colegio_ano: '', time_coracao: '', indicacao: '', observacao: '' });
      setResponsavelData({ nome_completo: '', cpf: '', telefone1: '', telefone2: '', email: '' });
      setPagamentoData({ valor: '', data_vencimento: '' });
      setEnderecoData({ rua: '', numero: '', cidade: '', estado: '', cep: '' });
    } catch (error) {
      console.error('Erro ao inserir dados:', error);
      setMessage('Erro ao inserir dados.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Aluno</h2>

      <h3>Endereço</h3>
      <label>Rua:<br /><input name="rua" value={enderecoData.rua} onChange={handleEnderecoChange} /></label><br />
      <label>Número:<br /><input name="numero" value={enderecoData.numero} onChange={handleEnderecoChange} /></label><br />
      <label>Cidade:<br /><input name="cidade" value={enderecoData.cidade} onChange={handleEnderecoChange} /></label><br />
      <label>Estado:<br /><input name="estado" value={enderecoData.estado} onChange={handleEnderecoChange} /></label><br />
      <label>CEP:<br /><input name="cep" value={enderecoData.cep} onChange={handleEnderecoChange} /></label><br />

      <h3>Responsável</h3>
      <label>Nome Completo:<br /><input name="nome_completo" value={responsavelData.nome_completo} onChange={handleResponsavelChange} /></label><br />
      <label>CPF:<br /><input name="cpf" value={responsavelData.cpf} onChange={handleResponsavelChange} /></label><br />
      <label>Telefone 1:<br /><input name="telefone1" value={responsavelData.telefone1} onChange={handleResponsavelChange} /></label><br />
      <label>Telefone 2:<br /><input name="telefone2" value={responsavelData.telefone2} onChange={handleResponsavelChange} /></label><br />
      <label>Email:<br /><input name="email" value={responsavelData.email} onChange={handleResponsavelChange} /></label><br />

      <h3>Aluno</h3>
      <label>Turma:<br />
        <select name="id_turma" value={alunoData.id_turma} onChange={handleAlunoChange}>
          <option value="">Selecione uma turma</option>
          {turmas.map((turma, index) => {
            console.log("Renderizando turma:", turma);
            return (
              <option key={turma.id || index} value={turma.id}>
                {turma.nome || `Turma ${index + 1}`}
              </option>
            );
          })}

        </select>
      </label><br />
      <label>Nome Completo:<br /><input name="nome_completo" value={alunoData.nome_completo} onChange={handleAlunoChange} /></label><br />
      <label>Data de Nascimento:<br /><input type="date" name="data_nascimento" value={alunoData.data_nascimento} onChange={handleAlunoChange} /></label><br />
      <label>Data de Matrícula:<br /><input type="date" name="data_matricula" value={alunoData.data_matricula} onChange={handleAlunoChange} /></label><br />
      <label>Telefone 1:<br /><input name="telefone1" value={alunoData.telefone1} onChange={handleAlunoChange} /></label><br />
      <label>Telefone 2:<br /><input name="telefone2" value={alunoData.telefone2} onChange={handleAlunoChange} /></label><br />
      <label>Foto:<br /><input name="foto" value={alunoData.foto} onChange={handleAlunoChange} /></label><br />
      <label>RG:<br /><input name="rg" value={alunoData.rg} onChange={handleAlunoChange} /></label><br />
      <label>CPF:<br /><input name="cpf" value={alunoData.cpf} onChange={handleAlunoChange} /></label><br />
      <label>Convênio:<br /><input name="convenio" value={alunoData.convenio} onChange={handleAlunoChange} /></label><br />
      <label>Alergia:<br /><input name="alergia" value={alunoData.alergia} onChange={handleAlunoChange} /></label><br />
      <label>Uso de Medicamento:<br /><input name="uso_medicamento" value={alunoData.uso_medicamento} onChange={handleAlunoChange} /></label><br />
      <label>Medicamento e Horário:<br /><input name="medicamento_horario" value={alunoData.medicamento_horario} onChange={handleAlunoChange} /></label><br />
      <label>Atestado Médico:<br /><input name="atestado_medico" value={alunoData.atestado_medico} onChange={handleAlunoChange} /></label><br />
      <label>Colégio:<br /><input name="colegio" value={alunoData.colegio} onChange={handleAlunoChange} /></label><br />
      <label>Ano Escolar:<br /><input name="colegio_ano" value={alunoData.colegio_ano} onChange={handleAlunoChange} /></label><br />
      <label>Time do Coração:<br /><input name="time_coracao" value={alunoData.time_coracao} onChange={handleAlunoChange} /></label><br />
      <label>Indicação:<br /><input name="indicacao" value={alunoData.indicacao} onChange={handleAlunoChange} /></label><br />
      <label>Observação:<br /><input name="observacao" value={alunoData.observacao} onChange={handleAlunoChange} /></label><br />

      <h3>Pagamento</h3>
      <label>Valor:<br /><input name="valor" value={pagamentoData.valor} onChange={handlePagamentoChange} /></label><br />
      <label>Data de Vencimento:<br /><input name="data_vencimento" type="date" value={pagamentoData.data_vencimento} onChange={handlePagamentoChange} /></label><br />

      <button type="submit">Cadastrar</button>
      <p>{message}</p>
    </form>
  );
}
