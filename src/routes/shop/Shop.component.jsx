import './shop.styles.scss';

import { Fragment, useContext } from "react";
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from "../../components/ProductCard/ProductCard.component";

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

return (
  <Fragment>
  { Object.keys(categoriesMap).map((title) => {
    return (
      <Fragment key={title}>
      <h2 className='title'>{title}</h2>
      <div className="products-container">
      {categoriesMap[title].map((product) => (
        <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </Fragment>
  )})}
  </Fragment>
)
}
export default Shop;