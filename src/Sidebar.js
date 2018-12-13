import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { observer } from "mobx-react";

import authStore from "./stores/authStore";

// Logo
import logo from "./assets/theindex.svg";

class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar">
        <img src={logo} className="logo" alt="the index logo" />
        <section>
          <h4 className="menu-item active">
            <NavLink to="/authors">AUTHORS</NavLink>
          </h4>
          <h4 className="menu-item">
            <NavLink to="/books">BOOKS</NavLink>
          </h4>
        </section>
        {!authStore.user && (
          <button className="btn btn-light">
            <Link to="/SignUp">SIGN UP</Link>
          </button>
        )}
        {!authStore.user ? (
          <button className="btn btn-light">
            <Link to="/Login">Login</Link>
          </button>
        ) : (
          <button className="btn btn-danger" onClick={() => authStore.logout()}>
            Logout {authStore.user.username}
          </button>
        )}
      </div>
    );
  }
}

export default observer(Sidebar);
