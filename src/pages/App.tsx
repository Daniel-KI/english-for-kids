import './App.scss';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Menu from '../components/Menu/Menu';
import routs from '../data/routesData';

const App = (): JSX.Element => (
  <div className='App'>
    <Router>
      <Menu />
      <Switch>
        {routs.map((route, index) => (
          <Route component={route.component} key={index.toString()} path={route.route} />
        ))}
        <Route path='*'>
          <Redirect to='/main' />
        </Route>
      </Switch>
    </Router>
    <Footer />
  </div>
);

export default App;
