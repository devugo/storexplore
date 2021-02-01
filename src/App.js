import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { store } from './store';
import Home from './pages/home';

import Routes from './routes';

function App() {
  return (
    <div data-test="appComponent">
      <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Routes />
            </Switch>
          </Router>
      </Provider>
    </div>
  );
}

export default App;
