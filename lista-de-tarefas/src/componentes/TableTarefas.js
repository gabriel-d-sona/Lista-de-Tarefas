import React from "react";

class TableTarefas extends React.Component {
    render() {
        const { arr, onDeleteClick, onComplete } = this.props;
        if (!arr) {
            return <div>Loading...</div>;
        }
        return (
            <div className="table">
                <table>
                    <thead className="tHead">
                        <tr>
                            <th className="th">Título</th>
                            <th className="th">Categoria</th>
                            <th className="th">Importância</th>
                            <th className="th">Descrição</th>
                            <th className="th">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="tBody">
                        {arr.map((item, index) => (
                            <tr key={index}>
                                <td>{item.titulo}</td>
                                <td>{item.categoria}</td>
                                <td>{item.importancia}</td>
                                <td>{item.descricao}</td>
                                <td>
                                    <button onClick={() => onComplete(index)}>
                                        Feito
                                    </button>
                                    <button onClick={() => onDeleteClick(index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableTarefas;
