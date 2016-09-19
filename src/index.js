import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, NoMatch } from 'react-router';
import { syncHistoryWithStore, routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import App from './components/App';
import Music from './components/Music';
import Auth from './components/Auth';
import Thanks from './components/Thanks';
import store from './store'



import './style.css';

const history = syncHistoryWithStore(hashHistory, store);

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.account.account,
  failureRedirectPath: '/',
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}/>
      <Route path="/auth" component={Auth}/>
      <Route path="/music" component={UserIsAuthenticated(Music)}/>
      <Route path="/thanks" component={Thanks}/>
      <Route path="*" component={NoMatch}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
