import React, { Component } from "react";
import {
  Link
} from "react-router-dom";


class Header extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="/">Braintree</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/checkout">Checkout</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/vault">Vault</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/dcc"><del>DCC</del></Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/hosted-fields">Hosted Fields</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dropin">Dropin</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </>
    );
  }
}

export default Header;
