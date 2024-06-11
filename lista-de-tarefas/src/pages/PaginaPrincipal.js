import React from "react";
import { Navigate } from "react-router-dom";
import TableTarefas from "../componentes/TableTarefas";

class PaginaPrincipal extends React.Component {
    state = {
        navigate1: false,
        navigate2: false,
        arr: [],
    }

    componentDidMount() {
        const storedData = JSON.parse(localStorage.getItem("meuArr")) || [];
        this.setState({ arr: storedData });
    }

    //Btn para ir para a pagina tarefas feitas
    handleHistoricClick = () => {
        this.setState({ navigate2: true });
    }

    //Btn para ir para a pagina de criacao de tarefa
    handleCreateClick = () => {
        this.setState({ navigate1: true });
    }

    //Cria btn de delete para cada tarefa
    handleDelete = (index) => {
        const newArr = [...this.state.arr];
        newArr.splice(index, 1);
        this.setState({ arr: newArr });
        localStorage.setItem("meuArr", JSON.stringify(newArr));
    }

    //Cria btn para armazaner no localStorage completeArr
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
        const { navigate1, navigate2, arr } = this.state;
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
                    onDelete={this.handleDelete}
                    onComplete={this.handleComplete}
                />
            </div>
        )
    }
}

export default PaginaPrincipal;
