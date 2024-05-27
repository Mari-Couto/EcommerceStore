import CategoryCatalog from '../components/CategoryCatalog';
import Footer from '../components/Footer';
import NavbarCategory from '../components/NavbarCategory';
import '../App.css'

const Category = () => {
  return (
    <div>
    <div className='containerCategorybig'>
    <NavbarCategory/>
        <CategoryCatalog/>
    </div>
        <Footer/>
    </div>
  )
}

export default Category;
