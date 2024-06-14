import React from "react";
import { Navigate } from "react-router-dom";
import TableTarefasFeitas from "../componentes/TableTarefasFeitas";
import Modal from "../componentes/Modal";
import '../CSS/ModalStyle.css';

class TarefasFeitas extends React.Component {
    state = {
        navigate: false,
        historicoArr: [],
        showModal: false,
        deleteIndex: null,
    }

    componentDidMount() {
        const storedData = JSON.parse(localStorage.getItem("historicoArr")) || [];
        this.setState({ historicoArr: storedData });
    }

    handleBackClick = () => {
        this.setState({ navigate: true });
    }

    handleReturn = (index) => {
        const newArr = [...this.state.historicoArr];
        const returnItem = newArr.splice(index, 1)[0];
        this.setState({ historicoArr: newArr });
        localStorage.setItem("historicoArr", JSON.stringify(newArr));

        const meuArr = JSON.parse(localStorage.getItem("meuArr")) || [];
        meuArr.push(returnItem);
        localStorage.setItem("meuArr", JSON.stringify(meuArr));
    }

    handleDeleteClick = (index) => {
        this.setState({ showModal: true, deleteIndex: index });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false, deleteIndex: null });
    }

    handleConfirmDelete = () => {
        const { deleteIndex, historicoArr } = this.state;
        if (deleteIndex !== null) {
            const newArr = [...historicoArr];
            newArr.splice(deleteIndex, 1);
            this.setState({ historicoArr: newArr, showModal: false, deleteIndex: null });
            localStorage.setItem("historicoArr", JSON.stringify(newArr));
        }
    }

    render() {
        const { navigate, historicoArr, showModal } = this.state;
        if (navigate) {
            return <Navigate to="/" />
        }
        return (
            <div className="tarefas-feitas">
                <div className="btn-voltar">
                    <button
                        id="btn-voltar"
                        name="btn-voltar"
                        onClick={this.handleBackClick}
                    >
                        Voltar
                    </button>
                </div>
                <TableTarefasFeitas
                    historicoArr={historicoArr}
                    onDeleteClick={this.handleDeleteClick}
                    onReturn={this.handleReturn}
                />
                <Modal
                    isOpen={showModal}
                    onClose={this.handleCloseModal}
                    onConfirm={this.handleConfirmDelete}
                />
            </div>
        )
    }
}

export default TarefasFeitas;
