import { h, Component } from "preact";
import linkState from 'linkstate';

export default class App extends Component {
  constructor() {
    super();
  }
  login = () => {
    const {username, password} = this.state;

    this.props.login({
      username,
      password,
    });
  }
  render(props, state) {
    return (
      <div className="page">
        <div className="page-single">
          <div className="container">
            <div className="row">
              <div className="col col-login mx-auto">
                <div className="card">
                  <div className="card-body p-6">
                    <div className="card-title">Login to your account</div>
                    <div className="form-group">
                      <label className="form-label">Email address</label>
                      <input type="text" className="form-control" placeholder="Enter username" value={state.username}
                    onInput={linkState(this, 'username')} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Password
                        <a href="./forgot-password.html" className="float-right small">I forgot password</a>
                      </label>
                      <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={state.password}
                    onInput={linkState(this, 'password')} />
                    </div>
                    <div className="form-group">
                      <label className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" />
                        <span className="custom-control-label">Remember me</span>
                      </label>
                    </div>
                    <div className="form-footer">
                      <button type="submit" className="btn btn-primary btn-block" onClick={this.login}>Sign in</button>
                    </div>
                  </div>
                </div>
                <div className="text-center text-muted">
                  Don't have account yet? <a href="/signup">Sign up</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
