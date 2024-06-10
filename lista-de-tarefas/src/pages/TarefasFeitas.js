import React from "react";
import { Navigate } from "react-router-dom";

class TarefasFeitas extends React.Component {
    state = {
        navigate: false,
    }

    handleBackClick = () => {
        this.setState({ navigate: true });
    }

    render() {
        const { navigate } = this.state;
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
            </div>
        )
    }
}

export default TarefasFeitas;
