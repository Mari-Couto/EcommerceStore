import { useState } from 'react';
import axios from 'axios';
import './EditModal.css';

const DeleteProduct = ({ productId, onDelete }) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/produtos/${productId}`);
            onDelete(productId); 
            setMessage(response.data.message);
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
                    <button onClick={handleConfirmDelete}>Sim</button>
                    <button onClick={() => setShowConfirmationModal(false)}>Cancelar</button>
                </div>
               </div>
            )}
            {message && <p className="success-message">{message}</p>}
        </div>
    );
};

export default DeleteProduct;
