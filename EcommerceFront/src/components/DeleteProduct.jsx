import { useState } from 'react';
import axios from 'axios';
import './EditModal.css';

const DeleteProduct = ({ productId, onDelete }) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/produtos/${productId}`);
            if (response.status === 202) {
                onDelete(productId);
                setMessage('Produto excluído com sucesso.');
            } else {
                setMessage('Erro ao excluir produto. Por favor, tente novamente.');
            }
        } catch (error) {
            setMessage('Erro ao excluir produto. Por favor, tente novamente.');
        }
    };

    const handleConfirmDelete = () => {
        setShowConfirmationModal(false);
        handleDelete();
    };

    return (
        <div>
            <button className="delete-button" onClick={() => setShowConfirmationModal(true)}>Excluir</button>
            {showConfirmationModal && (
               <div className="background">
                 <div className='modalDelete'>
                    <h2>Tem certeza que deseja excluir este produto?</h2>
                   <div className='confirmDelete'>
                   <button onClick={handleConfirmDelete} className='yesbutton'>Sim</button>
                    <button onClick={() => setShowConfirmationModal(false)} className='notbutton'>Cancelar</button>
                   </div>
                   {message && <p className="success-message">{message}</p>}
                </div>
               </div>
            )}
        </div>
    );
};

export default DeleteProduct;
