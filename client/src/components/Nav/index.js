import React from "react";
import "./style.css";

function Nav() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/main">
        PARKY
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor03">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/main">
              Search<span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/addlisting">
              Add Listing
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Profile
            </a>
          </li>
          <li className="nav-item ">
          <a
            className="btn nav-link border"
            href="/"
          >
            LogOut
          </a>
        </li>
        </ul>
      </div>
    </nav>
  );
}
export default Nav;
