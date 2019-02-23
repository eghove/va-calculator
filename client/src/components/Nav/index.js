import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">">
      <a className="navbar-brand" href="/">
        VA Pension Estimator
      </a>
      <li className="nav-item justify-content-end">
      <a className="nav-link" href="#">Log Out</a>
      </li>
    </nav>
  );
}

export default Nav;
