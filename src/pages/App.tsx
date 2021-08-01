import './App.scss';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Footer from '../components/Footer/Footer';
import routs, { adminRoutes } from '../data/routesData';
import Menu from '../components/Menu/Menu';
import { useSelector } from '../utils/reactReduxHooks';
import AdminMenu from '../components/AdminMenu/AdminMenu';

const App = (): JSX.Element => {
  const { isAuth } = useSelector((state) => state.authentication);

  return (
    <div className='App'>
      <Router>
        <Menu />
        {isAuth ? <AdminMenu /> : ''}
        <Switch>
          {routs.map((route, index) => (
            <Route component={route.component} key={index.toString()} path={route.route} exact />
          ))}
          {adminRoutes.map((route, index) => (
            <Route component={route.component} key={index.toString()} path={route.route} exact>
              {!isAuth ? <Redirect to='/main' /> : ''}
            </Route>
          ))}
          <Route path='*'>
            <Redirect to='/main' />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
