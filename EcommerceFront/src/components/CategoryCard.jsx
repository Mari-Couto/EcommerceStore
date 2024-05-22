import React from 'react'

const CategoryCard = ({category}) => {
  return (
    <div className="product-card">
      <div className="product-details">
        <table>
          <thead>
            <tr>
              <th>Id da Categoria</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{category.IdCategoria}</td>
              <td>{category.nomeCategoria}</td>
              <td>
                <div className='button-container'>
                  <button className="edit-button">Editar</button>
                  <button className="edit-button">Excluir</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryCard
