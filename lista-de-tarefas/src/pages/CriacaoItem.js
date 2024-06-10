import React from "react";

class CriacaoLista extends React.Component {
    state = {
        inputFormCriacao: "",
        select1: "teste1",
        select2: "baixo",
        descricao: "",
        btnDisabled: true,
        arr: [],
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            btnDisabled: name === "inputFormCriacao" && value.trim() === ""
        });
    }

    handleAddClick = (event) => {
        event.preventDefault();
        this.setState((prevState) => {
            const { inputFormCriacao, select1, select2, descricao } = prevState;
            const newItem = {
                titulo: inputFormCriacao,
                categoria: select1,
                importancia: select2,
                descricao: descricao.trim() === "" ? "Sem Descrição" : descricao,
            };
            const arr = [...prevState.arr, newItem];
            localStorage.setItem("meuArr", JSON.stringify(arr));
            return { 
                arr,
                inputFormCriacao: "",
                select1: "teste1",
                select2: "baixo",
                descricao: "",
                btnDisabled: true,
            };
        })
    }

    handleCancelClick = (event) => {
        event.preventDefault();
        this.setState({
            inputFormCriacao: "",
            select1: "teste1",
            select2: "baixo",
            descricao: "",
            btnDisabled: true,
        })
    }

    render() {
        const { inputFormCriacao, select1, select2, descricao, btnDisabled } = this.state;
        return (
            <div>
                <h1 className="titleCriacao">Criando Item</h1>
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
                                <option value="teste1">Teste1</option>
                                <option value="teste2">Teste2</option>
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
        )
    }
}

export default CriacaoLista;
