import React from "react";

class TableTarefasFeitas extends React.Component {
    render() {
        const { historicoArr, onDelete, onReturn } = this.props;
        if (!historicoArr) {
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
                        {historicoArr.map((item, index) => (
                            <tr key={index}>
                                <td>{item.titulo}</td>
                                <td>{item.categoria}</td>
                                <td>{item.importancia}</td>
                                <td>{item.descricao}</td>
                                <td>
                                    <button onClick={() => onReturn(index)}>
                                        Mover para Tarefas
                                    </button>
                                    <button onClick={() => onDelete(index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>s
                </table>
            </div>
        )
    }
}

export default TableTarefasFeitas;
