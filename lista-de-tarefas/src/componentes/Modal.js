import React from "react";

class Modal extends React.Component {
    render() {
        const { isOpen, onClose, onConfirm } = this.props;
        if (!isOpen) return null;

        return (
            <div className="modal-overlay">
                <div className="modal-dialog">
                    <div className="modal-header">
                        <h3>Apagar Tarefa?</h3>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="btn btn-sim"
                            onClick={onConfirm}
                        >
                            Sim
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
