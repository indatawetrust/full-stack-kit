import {h, Component} from 'preact';
import linkState from 'linkstate';

export default class App extends Component {
  constructor() {
    super();
  }
  register = () => {
    const {username, password} = this.state;

    this.props.register({
      username,
      password,
    });
  };
  render(props, state) {
    return (
      <div className="page">
        <div className="page-single">
          <div className="container">
            <div className="row">
              <div className="col col-login mx-auto">
                <div className="card">
                  <div className="card-body p-6">
                    <div className="card-title">Create new account</div>
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        value={state.username}
                        onInput={linkState(this, 'username')}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={state.email}
                        onInput={linkState(this, 'email')}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={state.password}
                        onInput={linkState(this, 'password')}
                      />
                    </div>
                    <div className="form-group">
                      <label className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <span className="custom-control-label">
                          Agree the <a href="terms.html">terms and policy</a>
                        </span>
                      </label>
                    </div>
                    <div className="form-footer">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        onClick={this.register}>
                        Create new account
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-center text-muted">
                  Already have account? <a href="/signin">Sign in</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
