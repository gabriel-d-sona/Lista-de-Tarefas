import React from "react";
import { Navigate } from "react-router-dom";
import TableTarefas from "../componentes/TableTarefas";
import Modal from "../componentes/Modal";
import "../CSS/ModalStyle.css";

class PaginaPrincipal extends React.Component {
  state = {
    navigate1: false,
    navigate2: false,
    arr: [],
    showModal: false,
    deleteIndex: null,
    filterCategoria: "Todas",
    filterImportancia: "Todas",
  };

  componentDidMount() {
    const storedData = JSON.parse(localStorage.getItem("meuArr")) || [];
    this.setState({ arr: storedData });
  }

  handleHistoricClick = () => {
    this.setState({ navigate2: true });
  };

  handleCreateClick = () => {
    this.setState({ navigate1: true });
  };

  handleDeleteClick = (index) => {
    this.setState({ showModal: true, deleteIndex: index });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, deleteIndex: null });
  };

  handleConfirmDelete = () => {
    const { deleteIndex, arr } = this.state;
    if (deleteIndex !== null) {
      const newArr = [...arr];
      newArr.splice(deleteIndex, 1);
      this.setState({ arr: newArr, showModal: false, deleteIndex: null });
      localStorage.setItem("meuArr", JSON.stringify(newArr));
    }
  };

  handleComplete = (index) => {
    const newArr = [...this.state.arr];
    const completedItem = newArr.splice(index, 1)[0];
    this.setState({ arr: newArr });
    localStorage.setItem("meuArr", JSON.stringify(newArr));

    const historicoArr = JSON.parse(localStorage.getItem("historicoArr")) || [];
    historicoArr.push(completedItem);
    localStorage.setItem("historicoArr", JSON.stringify(historicoArr));
  };

  handleCategoriaFilterChange = (event) => {
    this.setState({ filterCategoria: event.target.value });
  };

  handleImportanciaFilterChange = (event) => {
    this.setState({ filterImportancia: event.target.value });
  };

  render() {
    const { navigate1, navigate2, arr, showModal, filterCategoria, filterImportancia } = this.state;

    if (navigate1) {
      return <Navigate to="/criacao-de-tarefa" />;
    }
    if (navigate2) {
      return <Navigate to="/tarefas-feitas" />;
    }

    let filteredArr = [...arr];

    if (filterCategoria !== "Todas") {
      filteredArr = filteredArr.filter(item => item.categoria === filterCategoria);
    }

    if (filterImportancia !== "Todas") {
      filteredArr = filteredArr.filter(item => {
        if (filterImportancia === "Alto") {
          return item.importancia.toLowerCase() === "alto";
        } else if (filterImportancia === "Médio") {
          return item.importancia.toLowerCase() === "medio";
        } else if (filterImportancia === "Baixo") {
          return item.importancia.toLowerCase() === "baixo";
        }
        return true;
      });
    }

    return (
      <div className="pagina-principal">
        <div className="btn-historico">
          <button id="btn-historico" name="btn-historico" onClick={this.handleHistoricClick}>
            Tarefas Feitas
          </button>
        </div>
        <div className="btn-criar-tarefa">
          <button id="btn-criar-tarefa" name="btn-criar-tarefa" onClick={this.handleCreateClick}>
            Criar Tarefa
          </button>
        </div>

        <div className="filters">
          <label>Filtrar por Categoria:</label>
          <select value={filterCategoria} onChange={this.handleCategoriaFilterChange}>
            <option value="Todas">Todas</option>
            <option value="Trabalho/Profissional">Trabalho/Profissional</option>
            <option value="Estudo/Educação">Estudo/Educação</option>
            <option value="Pessoal">Pessoal</option>
            <option value="Saúde/Fitness">Saúde/Fitness</option>
            <option value="Casa/Manutenção">Casa/Manutenção</option>
            <option value="Finanças">Finanças</option>
            <option value="Social">Social</option>
            <option value="Projetos Específicos">Projetos Específicos</option>
            <option value="Viagens">Viagens</option>
            <option value="Compras">Compras</option>
          </select>

          <label>Filtrar por Importância:</label>
          <select value={filterImportancia} onChange={this.handleImportanciaFilterChange}>
            <option value="Todas">Todas</option>
            <option value="Alto">Alto</option>
            <option value="Médio">Médio</option>
            <option value="Baixo">Baixo</option>
          </select>
        </div>

        <TableTarefas arr={filteredArr} onDeleteClick={this.handleDeleteClick} onComplete={this.handleComplete} />

        <Modal isOpen={showModal} onClose={this.handleCloseModal} onConfirm={this.handleConfirmDelete} />
      </div>
    );
  }
}

export default PaginaPrincipal;
