import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { HappyHellowin } from './Components/HappyHellowin';
import Header from './Components/Header';
import Posts from './Components/Posts';
import './styles/Index.scss';

function App() {
  return (
    <HappyHellowin>
    <div className="container">
    <Header/>
    <Router>
      <Switch>
        <Route path='/' exact>
          <Posts/>
        </Route>
        <Route  path='/page:page'>
          <Posts />
        </Route>
      </Switch>
    </Router>
    </div>
    </HappyHellowin>
  );
}

export default App;
