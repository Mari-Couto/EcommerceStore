import './App.css'
import { Link } from 'react-router-dom';

function App() {
  const [searchedProductId, setSearchedProductId] = useState(null);

  const handleSearch = (productId) => {
      setSearchedProductId(productId);
  };
  return (
  
      <div>
              <div className="container">
      <h1 className='title'>Bem vindo</h1>
      <div className="buttons-container">
      <Link to="/inicio">
          <button className="button">Quero postar produto</button>
        </Link>
        <Link to="/produtos">
          <button className="button">Quero postar produto</button>
        </Link>
      </div>
    </div>
    <div>
          <Navbar onSearch={handleSearch} />
          {searchedProductId ? (
              <ProductCatalog productId={searchedProductId} />
          ) : (
              <ProductCatalog />
          )}
      </div>
    </div>
  )
}

export default App
