import AdminPanel from '../pages/AdminPanel/AdminPanel';
import Authentication from '../pages/Authentication/Authentication';
import Category from '../pages/Category/Category';
import CategoriesData from '../pages/CategoriesData/CategoriesData';
import Main from '../pages/Main/Main';
import WordsData from '../pages/WordsData/WordsData';

const routs = [
  { name: 'main', label: 'Main page', route: '/main', component: Main },
  {
    name: 'category',
    label: 'Vocab category',
    route: '/category/:id',
    component: Category,
  },
  {
    name: 'authentication',
    label: 'Sign in',
    route: '/authentication',
    component: Authentication,
  },
];

export const adminRoutes = [
  { name: 'admin-panel', label: 'Admin panel', route: '/admin-panel', component: AdminPanel },
  { name: 'category', label: 'Categories', route: '/admin-panel/categories', component: CategoriesData },
  { name: 'words', label: 'Words', route: '/admin-panel/:categoryId/words', component: WordsData },
];

export default routs;
