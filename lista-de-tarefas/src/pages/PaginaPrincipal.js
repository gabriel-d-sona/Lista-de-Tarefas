import React from "react";
import { Navigate } from "react-router-dom";

class PaginaPrincipal extends React.Component {
    state = {
        navegate: false,
    }

    handleClick = () => {
        this.setState({ navigate: true });
    }
    render() {
        const { navigate } = this.state;
        if (navigate) {
            return <Navigate to="/criacao-de-tarefa" />;
        }
        return (
            <div className="pagina-principal">
                <div className="btn-criar-tarefa">
                    <button
                        id="btn-criar-tarefa"
                        name="btn-criar-tarefa"
                        onClick={this.handleClick}
                    >
                        Criar Tarefa
                    </button>
                </div>
            </div>
        )
    }
}

export default PaginaPrincipal;
