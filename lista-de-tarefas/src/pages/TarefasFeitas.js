import React from "react";
import { Navigate } from "react-router-dom";
import TableTarefasFeitas from "../componentes/TableTarefasFeitas";

class TarefasFeitas extends React.Component {
    state = {
        navigate: false,
        historicoArr: [],
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

    handleDelete = (index) => {
        const newArr = [...this.state.historicoArr];
        newArr.splice(index, 1);
        this.setState({ historicoArr: newArr });
        localStorage.setItem("historicoArr", JSON.stringify(newArr));
    }

    render() {
        const { navigate, historicoArr } = this.state;
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
                    onDelete={this.handleDelete}
                    onReturn={this.handleReturn}
                 />
            </div>
        )
    }
}

export default TarefasFeitas;
