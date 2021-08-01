import './CategoryCard.scss';
import { Link } from 'react-router-dom';
import { CategoryModel } from '../../models/categoryModel';

const CategoryCard = ({ name, data }: { name: string; data: CategoryModel }): JSX.Element => (
  <div className='category-card'>
    <img alt={data.label} className='category-card__img' src={data.image} />
    <Link className='category-card__link' to={`category-${name}`}>
      <div className='category-card__description'>
        <h4 className='category-card__title'>{data.label}</h4>
      </div>
    </Link>
  </div>
);

export default CategoryCard;
