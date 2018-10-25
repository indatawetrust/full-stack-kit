import { h, Component } from "preact";

export default class Header extends Component {
  constructor() {
    super();
  }
  render(props) {
    return (
      <div className="header py-4">
        <div className="container">
          <div className="d-flex">
            <a className="header-brand" href="/">
              FullStackKit
            </a>
            <div className="d-flex order-lg-2 ml-auto">
              <div className="nav-item d-none d-md-flex">
                <a href="https://github.com/indatawetrust/full-stack-kit" className="btn btn-sm btn-outline-primary" target="_blank">Source code</a>
              </div>
            </div>
            <a href="#" className="header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse" data-target="#headerMenuCollapse">
              <span className="header-toggler-icon" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
