import Category from '../pages/Category/Category';
import Main from '../pages/Main/Main';

const routs = [
  { name: 'main', label: 'Main page', route: '/main', component: Main },
  {
    name: 'category',
    label: 'Vocab category',
    route: '/category-:name',
    component: Category,
  },
];

export default routs;
