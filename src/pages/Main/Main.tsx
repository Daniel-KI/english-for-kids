import './Main.scss';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import categories from '../../data/categoriesData';

const Main = (): JSX.Element => (
  <div className='main'>
    <div className='container main__container'>
      <h1 className='main__title'>English for kids</h1>
      <div className='main__categories'>
        {Object.entries(categories).map(([name, data], index) => (
          <CategoryCard data={data} key={index.toString()} name={name} />
        ))}
      </div>
    </div>
  </div>
);

export default Main;
