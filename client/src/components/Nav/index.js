import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
// Material UI App Bar Imports
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { withTheme } from "@material-ui/core/styles";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Nav extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.state = {
      redirect: false,
      user: {}
    };
  }

  componentDidMount() {
    this.userInfo().then(response =>
      this.setState(
        {
          user: response.data.user
        },
        () => this.tester()
      )
    );
  }

  tester() {
    console.log(this.state.user);
  }

  userInfo() {
    return axios.get("/user/");
  }

  logout(event) {
    event.preventDefault();
    console.log("logging out");
    axios
      .post("/user/logout")
      .then(response => {
        console.log(response.data);
        this.setState({ redirect: true });
      })
      .catch(error => {
        console.log("Logout error");
      });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/signin" />;
    }
  };

  render() {
    const { classes } = this.props;
    console.log(this.props.theme);
    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          style={{
            background: "#fff5b5"
          }}
          elevation={2}
        >
          <Toolbar
            style={{
              fontFamily: this.props.theme.typography.navFont
            }}
          >
            <Typography variant="h6" color="secondary" className={classes.grow}>
              Parky
            </Typography>
            <Button color="secondary" href="/searchresult">
              Search
            </Button>
            <Button color="secondary" href="/addlisting">
              Create
            </Button>
            <Button color="secondary" href="/signup">
              Sign Up
            </Button>
            {this.renderRedirect()}
            <Button color="secondary" href="/profile">
              <AccountCircleIcon />
            </Button>
            <Button color="secondary" onClick={this.logout} href="/signin">
              <ExitToAppIcon />
            </Button>
          </Toolbar>
        </AppBar>
      </div>

      // <nav className="navbar navbar-expand-lg navbar-light bg-light">
      //   <a className="navbar-brand" href="/main">
      //     PARKY
      //   </a>
      //   <button
      //     className="navbar-toggler"
      //     type="button"
      //     data-toggle="collapse"
      //     data-target="#navbarColor03"
      //     aria-controls="navbarColor03"
      //     aria-expanded="false"
      //     aria-label="Toggle navigation"
      //   >
      //     <span className="navbar-toggler-icon"></span>
      //   </button>

      //   <div className="collapse navbar-collapse" id="navbarColor03">
      //     <ul className="navbar-nav ml-auto">
      //       <li className="nav-item active">
      //         <a className="nav-link" href="/searchresult">
      //           Search<span className="sr-only">(current)</span>
      //         </a>
      //       </li>
      //       <li className="nav-item">
      //         <a className="nav-link" href="/addlisting">
      //           Add Listing
      //         </a>
      //       </li>
      //       <li className="nav-item">
      //         <a className="nav-link" href="/profile">
      //           Profile
      //         </a>
      //       </li>
      //       {this.renderRedirect()}
      //       <li className="nav-item ">
      //         <a className="btn nav-link border" onClick={this.logout} href="/">
      //           LogOut
      //         </a>
      //       </li>
      //     </ul>
      //   </div>
      // </nav>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withTheme()(Nav));

// export default withTheme()(MyComponent);
