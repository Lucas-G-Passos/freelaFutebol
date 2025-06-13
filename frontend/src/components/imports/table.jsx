import React, { useEffect, useState } from "react";
import "./css/responseTable.css";

export default function Table({ data, handleChange }) {
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [turmas, setTurmas] = useState([]);

  const allSections = Object.keys(data[0]);
  const sections = allSections.filter((_, index) => index !== 4);
  const subHeaders = sections.map((section) => Object.keys(data[0][section]));

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKENDURL}/api/turmas`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const data = await response.json();
        setTurmas(data);
      } catch (error) {
        console.error("Erro ao buscar turmas:", error);
      }
    };
    fetchTurmas();
  }, []);

  const brazilianStates = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  const schoolYears = [
    "1º Ano",
    "2º Ano",
    "3º Ano",
    "4º Ano",
    "5º Ano",
    "6º Ano",
    "7º Ano",
    "8º Ano",
    "9º Ano",
    "1º Médio",
    "2º Médio",
    "3º Médio",
  ];

  const getInputType = (field) => {
    const dateFields = ["data_nascimento", "data_matricula", "data_vencimento"];
    const timeFields = ["medicamento_horario"];
    const numberFields = [
      "cep",
      "numero",
      "telefone",
      "rg",
      "cpf",
      "valor_mensalidade",
      "valor_uniforme",
    ];
    if (dateFields.includes(field)) return "date";
    if (timeFields.includes(field)) return "time";
    if (numberFields.includes(field)) return "number";
    if (field === "estado") return "select-estado";
    if (field === "colegio_ano") return "select-ano";
    if (field === "nome_turma") return "select-turma";

    return "text";
  };

  const getFormattedValue = (value, type) => {
    if (type === "date") {
      const date = new Date(value);
      if (!isNaN(date)) return date.toISOString().split("T")[0];
    } else if (type === "time") {
      const [h, m] = value.split(":");
      return `${h?.padStart(2, "0") || "00"}:${m?.padStart(2, "0") || "00"}`;
    }
    return value;
  };

  return (
    <table className="resultsTable">
      <thead>
        <tr>
          {sections.map((section, idx) => (
            <th key={section} colSpan={subHeaders[idx].length}>
              {section.toUpperCase()}
            </th>
          ))}
        </tr>
        <tr>
          {subHeaders.map((keys, idx) =>
            keys.map((key) => <th key={`${sections[idx]}-${key}`}>{key}</th>)
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((entry, rowIndex) => (
          <tr key={rowIndex}>
            {sections.map((section) =>
              Object.keys(entry[section]).map((field) => {
                const cellKey = `${rowIndex}-${section}-${field}`;
                const isEditing = editingCell === cellKey;
                const inputType = getInputType(field);

                const value = (() => {
                  if (inputType === "select-turma") {
                    return entry[section]["nome_turma"] || "";
                  }
                  return getFormattedValue(
                    String(entry[section][field]),
                    inputType
                  );
                })();

                const editInitialValue = (() => {
                  if (inputType === "select-turma") {
                    return entry[section]["id_turma"] || "";
                  }
                  return getFormattedValue(
                    String(entry[section][field]),
                    inputType
                  );
                })();

                return (
                  <td
                    key={cellKey}
                    onClick={() => {
                      setEditingCell(cellKey);
                      setEditValue(editInitialValue);
                    }}
                  >
                    {isEditing ? (
                      inputType === "select-estado" ? (
                        <select
                          value={editValue}
                          autoFocus
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => {
                            handleChange(editValue, rowIndex, section, field);
                            setEditingCell(null);
                          }}
                        >
                          {brazilianStates.map((uf) => (
                            <option key={uf} value={uf}>
                              {uf}
                            </option>
                          ))}
                        </select>
                      ) : inputType === "select-ano" ? (
                        <select
                          value={editValue}
                          autoFocus
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => {
                            handleChange(editValue, rowIndex, section, field);
                            setEditingCell(null);
                          }}
                        >
                          {schoolYears.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      ) : inputType === "select-turma" ? (
                        <select
                          value={editValue}
                          autoFocus
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => {
                            handleChange(
                              parseInt(editValue, 10),
                              rowIndex,
                              section,
                              "id_turma"
                            ); // mantém isso...
                            // ...e também atualiza nome_turma, se necessário:
                            const turmaSelecionada = turmas.find(
                              (t) => t.id === parseInt(editValue, 10)
                            );
                            console.log(turmaSelecionada);
                            if (turmaSelecionada) {
                              handleChange(
                                turmaSelecionada.nome,
                                rowIndex,
                                section,
                                "nome_turma"
                              );
                            }

                            setEditingCell(null);
                          }}
                        >
                          <option value="">Selecione</option>
                          {turmas.map((turma) => (
                            <option key={turma.id} value={turma.id}>
                              {turma.nome}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={inputType}
                          value={editValue}
                          autoFocus
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => {
                            handleChange(editValue, rowIndex, section, field);
                            setEditingCell(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") e.target.blur();
                          }}
                        />
                      )
                    ) : (
                      value
                    )}
                  </td>
                );
              })
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
