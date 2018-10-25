import { h, Component } from "preact";
import "./style.scss";

import axios from 'axios';
import createStore from 'unistore';
import {Provider, connect} from 'unistore/preact';
import {Router, Route, route} from 'preact-router';
import storeObjects from './store'
import actionObjects from './actions'

let store = createStore(storeObjects);

let actions = actionObjects(store);

// components
import Login from './components/Login'
import Register from './components/Register'
import Error from './components/Error'
import Index from './components/Index'
import Footer from './components/Footer'
import Header from './components/Header'

const StoreApp = connect(
  Object.keys(storeObjects).join(','),
  actions,
)((props) => (
  <Router
    onChange={async e => {

      props.isAuthenticated()

    }}
  >
    <Index path="/" {...props} />
    <Login path="/signin" {...props} />
    <Register path="/signup" {...props} />
    <Error type="404" default />
  </Router>
));

export default class App extends Component {
  constructor() {
    super()

    store.subscribe(state => {

      if (!state.isLogin) {
        route('/signin')
      }

    })

  }
  render(props) {
    return (
      <div className="page">
        <div className="page-main">
          <Header/>
          <div className="header collapse d-lg-flex p-0" id="headerMenuCollapse">
            <div className="container">
            </div>
          </div>
          <div className="my-3 my-md-5">
            <div className="container">
              <Provider store={store}>
                <StoreApp />
              </Provider>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
