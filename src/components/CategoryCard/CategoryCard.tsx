import './CategoryCard.scss';
import { Link } from 'react-router-dom';
import { CategoryModel } from '../../models/CategoryModel';
import { API_PATH } from '../../data/serverData';

const CategoryCard = ({ data }: { data: CategoryModel }): JSX.Element => (
  <div className='category-card'>
    <img alt={data.name} className='category-card__img' src={`${API_PATH}${data.image}`} />
    <Link className='category-card__link' to={`category/${data._id}`}>
      <div className='category-card__description'>
        <h4 className='category-card__title'>{data.name}</h4>
      </div>
    </Link>
  </div>
);

export default CategoryCard;
