import React, {Component} from 'react';
import PrivateRoute from './landingcomponents/common/PrivateRoute'; // added
import TabMgmt from './components/tabmanagement';
import store from './landingcomponents/common/store';
import LandingPage from './landingcomponents/LandingPage';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import history from './landingcomponents/common/history'; // added
import { loadUser } from './actions/auth'; // added



class App extends Component {
 

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path='/' component={TabMgmt} />
            <Route exact path='/login' component={LandingPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
};

export default App;




