import './Category.css';

const CategoryCard = ({ category }) => {

  return (
    <div className={`containerCategory`}>
      <div className="category-card">
        <div className="category-details">
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
                <td className='categoriesNames'>{category.IdCategoria}</td>
                <td className='categoriesNames'>
                </td>
                <td>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      
      </div>
    </div>
  );
}

export default CategoryCard;
