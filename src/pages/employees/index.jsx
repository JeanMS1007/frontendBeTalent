import React, { useEffect, useState } from "react";
import SearchField from "../../components/searchField";
import "./index.css";
import { getAllData } from "../../middlewares/employees";
import { dateFormatter } from "../../helpers/dateFormatter";
import { phoneNumberFormatter } from "../../helpers/phoneNumberFormatter";

export default function Employees() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);

  async function fetchData() {
    try {
      const response = await getAllData();
      setData(response);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  function filterData() {
    return data.filter((f) =>
      (f?.name || "").toLowerCase().includes(filters.toLowerCase())
    );
  }

  function toggleRow(index) {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i) => i !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="header-filter">
        <h1>Funcionários</h1>
        <SearchField
          value={filters}
          onChange={(e) => setFilters(e?.target?.value)}
        />
      </div>
      <div className="table-content">
        <table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th className="hide-on-small">Cargo</th>
              <th className="hide-on-small">Data de Admissão</th>
              <th className="hide-on-small">Telefone</th>
              <th className="hide-on-large">Ação</th>
            </tr>
          </thead>
          <tbody>
            {filterData().map((item, index) => (
              <React.Fragment key={item.id}>
                <tr>
                  <td>
                    <img className="profile-img" src={item?.image} alt="Foto" />
                  </td>
                  <td>{item.name || 'Indisponível'}</td>
                  <td className="hide-on-small">{item.job || 'Indisponível'}</td>
                  <td className="hide-on-small">{dateFormatter(item?.admission_date) || 'Indisponível'}</td>
                  <td className="hide-on-small">{phoneNumberFormatter(item?.phone) || 'Indisponível'}</td>
                  <td className="hide-on-large">
                    <button
                      className="expand-button"
                      onClick={() => toggleRow(index)}
                    >
                      {expandedRows.includes(index) ? (
                        <img src="/svgs/charm_chevron-up.svg" alt="arrow-up" />
                      ) : (
                        <img
                          src="/svgs/charm_chevron-down.svg"
                          alt="arrow-down"
                        />
                      )}
                    </button>
                  </td>
                </tr>
                {expandedRows.includes(index) && (
                  <React.Fragment>
                  <tr className="details-row">
                    <td colSpan="3">
                      <strong>Cargo:</strong> {item.job || 'Indisponível'}
                    </td>
                  </tr>
                  <tr className="details-row">
                    <td colSpan="3">
                      <strong>Data de Admissão:</strong> {dateFormatter(item?.admission_date) || 'Indisponível'}
                    </td>
                  </tr>
                  <tr className="details-row">
                    <td colSpan="3">
                      <strong>Telefone:</strong> {phoneNumberFormatter(item?.phone) || 'Indisponível'}
                    </td>
                  </tr>
                  </React.Fragment>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
