import { h, Component } from "preact";
import "./style.scss";

import axios from 'axios';
import createStore from 'unistore';
import {Provider, connect} from 'unistore/preact';
import {Router, Route, route} from 'preact-router';
import storeObjects from './store'
import actionObjects from './actions'

let store = createStore(storeObjects);

let actions = store => (actionObjects)

// components
import Login from './components/Login'
import Register from './components/Register'
import Error from './components/Error'
import Index from './components/Index'

const StoreApp = connect(
  Object.keys(storeObjects).join(','),
  actions,
)((props) => (
  <Router
    onChange={async e => {

    }}
  >
    <Index path="/" {...props} />
    <Login path="/signin" {...props} />
    <Register path="/signup" {...props} />
    <Error type="404" default />
  </Router>
));

export default class App extends Component {
  render(props) {
    return (
      <Provider store={store}>
        <StoreApp />
      </Provider>
    );
  }
}
