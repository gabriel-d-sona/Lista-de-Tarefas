import React from "react";
import { Navigate } from "react-router-dom";
import TableTarefas from "../componentes/TableTarefas";
import Modal from "../componentes/Modal";
import '../CSS/ModalStyle.css';

class PaginaPrincipal extends React.Component {
    state = {
        navigate1: false,
        navigate2: false,
        arr: [],
        showModal: false,
        deleteIndex: null,
    }

    componentDidMount() {
        const storedData = JSON.parse(localStorage.getItem("meuArr")) || [];
        this.setState({ arr: storedData });
    }

    handleHistoricClick = () => {
        this.setState({ navigate2: true });
    }

    handleCreateClick = () => {
        this.setState({ navigate1: true });
    }

    handleDeleteClick = (index) => {
        this.setState({ showModal: true, deleteIndex: index });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false, deleteIndex: null });
    }

    handleConfirmDelete = () => {
        const { deleteIndex, arr } = this.state;
        if (deleteIndex !== null) {
            const newArr = [...arr];
            newArr.splice(deleteIndex, 1);
            this.setState({ arr: newArr, showModal: false, deleteIndex: null });
            localStorage.setItem("meuArr", JSON.stringify(newArr));
        }
    }

    handleComplete = (index) => {
        const newArr = [...this.state.arr];
        const completedItem = newArr.splice(index, 1)[0];
        this.setState({ arr: newArr });
        localStorage.setItem("meuArr", JSON.stringify(newArr));

        const historicoArr = JSON.parse(localStorage.getItem("historicoArr")) || [];
        historicoArr.push(completedItem);
        localStorage.setItem("historicoArr", JSON.stringify(historicoArr));
    }

    render() {
        const { navigate1, navigate2, arr, showModal } = this.state;
        if (navigate1) {
            return <Navigate to="/criacao-de-tarefa" />;
        }
        if (navigate2) {
            return <Navigate to="/tarefas-feitas" />;
        }
        return (
            <div className="pagina-principal">
                <div className="btn-historico">
                    <button
                        id="btn-historico"
                        name="btn-historico"
                        onClick={this.handleHistoricClick}
                    >
                        Tarefas Feitas
                    </button>
                </div>
                <div className="btn-criar-tarefa">
                    <button
                        id="btn-criar-tarefa"
                        name="btn-criar-tarefa"
                        onClick={this.handleCreateClick}
                    >
                        Criar Tarefa
                    </button>
                </div>
                <TableTarefas 
                    arr={arr}
                    onDeleteClick={this.handleDeleteClick}
                    onComplete={this.handleComplete}
                />
                <Modal
                    isOpen={showModal}
                    onClose={this.handleCloseModal}
                    onConfirm={this.handleConfirmDelete}
                />
            </div>
        );
    }
}

export default PaginaPrincipal;
