import React from "react";
import { Navigate } from "react-router-dom";

class CriacaoItem extends React.Component {
    state = {
        inputFormCriacao: "",
        select1: "teste1",
        select2: "baixo",
        descricao: "",
        btnDisabled: true,
        navigate: false,
    }

    //Salva oque foi escrito
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            btnDisabled: name === "inputFormCriacao" && value.trim() === "",
        });
    }

    //Btn de adicionar
    handleAddClick = (event) => {
        event.preventDefault();
        const { inputFormCriacao, select1, select2, descricao } = this.state;
        const newItem = {
            titulo: inputFormCriacao,
            categoria: select1,
            importancia: select2,
            descricao: descricao.trim() === "" ? "Sem Descrição" : descricao,
        };

        const storedData = JSON.parse(localStorage.getItem("meuArr")) || [];
        const newArr = [...storedData, newItem];
        localStorage.setItem("meuArr", JSON.stringify(newArr));

        this.setState({
            inputFormCriacao: "",
            select1: "teste1",
            select2: "baixo",
            descricao: "",
            btnDisabled: true,
            navigate: true,
        });
    }

    //Btn de cancelar criacao de tarefa
    handleCancelClick = (event) => {
        event.preventDefault();
        this.setState({ navigate: true });
    }

    render() {
        const { inputFormCriacao, select1, select2, descricao, btnDisabled, navigate } = this.state;

        if (navigate) {
            return <Navigate to="/" />;
        }

        return (
            <div>
                <h1 className="titleCriacao">Criando Item</h1>
                <div className="containerCriacao">
                    <form className="formCriacao">
                        <div className="inputsCriacao">
                            <div className="divForm">
                                <label>Título do Item</label>
                                <input
                                    id="inputFormCriacao"
                                    type="text"
                                    name="inputFormCriacao"
                                    value={inputFormCriacao}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="divForm">
                                <label>Categoria</label>
                                <select
                                    name="select1"
                                    id="select1"
                                    value={select1}
                                    onChange={this.handleChange}
                                >
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
                            </div>
                            <div className="divForm">
                                <label>Nível de Importância</label>
                                <select
                                    name="select2"
                                    id="select2"
                                    value={select2}
                                    onChange={this.handleChange}
                                >
                                    <option value="baixo">Baixo</option>
                                    <option value="medio">Médio</option>
                                    <option value="alto">Alto</option>
                                </select>
                            </div>
                        </div>
                        <div className="descricao">
                            <label>Descrição</label>
                            <br />
                            <textarea
                                id="descricao"
                                placeholder="Descrição"
                                rows="6"
                                className="descricao"
                                style={{ width: "26em", height: "10em" }}
                                name="descricao"
                                value={descricao}
                                onChange={this.handleChange}
                            ></textarea>
                        </div>
                        <div className="btns">
                            <button
                                id="btn-adicionar"
                                name="btn-adicionar"
                                disabled={btnDisabled}
                                onClick={this.handleAddClick}
                            >
                                Adicionar
                            </button>
                            <button
                                id="btn-cancelar"
                                name="btn-cancelar"
                                onClick={this.handleCancelClick}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CriacaoItem;
