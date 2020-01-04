import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
//
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
//SignUp Dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//end Dialog

const styles = theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      username: "",
      password: "",
      redirectTo: null,
      firstname: "",
      lastname: "",
      email: "",
      dob: "",
      license: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit");

    axios
      .post("/user/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          // this.props.updateUser({
          //     loggedIn: true,
          //     username: response.data.username
          // })
          // update the state to redirect to home
          this.setState({
            redirectTo: "/main"
          });
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
      });
  }
  handleSubmitForm(event) {
    // console.log("sign-up handleSubmit, username: ");
    // console.log(this.state.username);
    // event.preventDefault();

    //request to server to add a new username/password
    axios
      .post("/user/", {
        username: this.state.username,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        dob: this.state.dob,
        license: this.state.license
      })
      .then(response => {
        // console.log(response);
        if (!response.data.errmsg) {
          console.log("successful signup");
          this.setState({ open: false });
        } else {
          console.log("username already taken");
        }
      })
      .catch(error => {
        console.log("signup error: ");
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Paper
              className={classes.root}
              elevation={1}
              mx="auto"
              align="center"
            >
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" align="center">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={this.state.username}
                  onChange={this.handleChange}
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleSubmit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link
                      onClick={() => this.handleClickOpen()}
                      variant="body2"
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
              <Dialog
                open={this.state.open}
                handleClickOpen={this.handleClickOpen}
              >
                <DialogTitle id="form-dialog-title">
                  Create an Account
                </DialogTitle>
                <DialogContent>
                  <span>Username: </span>
                  <TextField
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    required
                    id="username"
                    name="username"
                    type="text"
                    placeholder="username"
                    fullWidth
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  <span>Password: </span>
                  <TextField
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    required
                    name="password"
                    id="password"
                    type="password"
                    fullWidth
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <span>First Name: </span>
                  <TextField
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    required
                    id="firstname"
                    name="firstname"
                    placeholder="First name"
                    fullWidth
                    value={this.state.firstname}
                    onChange={this.handleChange}
                  />
                  <span>Last Name: </span>
                  <TextField
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    required
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Last name"
                    fullWidth
                    value={this.state.lastname}
                    onChange={this.handleChange}
                  />
                  <span>Email: </span>
                  <TextField
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    required
                    type="text"
                    id="email"
                    name="email"
                    placeholder="email@email.com"
                    fullWidth
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <span>Date of Birth: </span>
                  <TextField
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    required
                    type="text"
                    id="dob"
                    name="dob"
                    placeholder="dd/mm/yy"
                    value={this.state.dob}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <span>Licence #: </span>
                  <TextField
                    autoFocus
                    variant="outlined"
                    margin="normal"
                    required
                    type="password"
                    id="license"
                    name="license"
                    fullWidth
                    placeholder="11-111-1111"
                    value={this.state.license}
                    onChange={this.handleChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => this.handleSubmitForm()}
                    color="primary"
                    variant="outlined"
                  >
                    Sign Up
                  </Button>
                  <Button
                    onClick={() => this.handleClose()}
                    color="secondary"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </Paper>
          </Grid>
        </Grid>

        // <div>
        //     <h4>Login</h4>
        //     <form className="form-horizontal">
        //         <div className="form-group">
        //             <div className="col-1 col-ml-auto">
        //                 <label className="form-label" htmlFor="username">Username</label>
        //             </div>
        //             <div className="col-3 col-mr-auto">
        //                 <input className="form-input"
        //                     type="text"
        //                     id="username"
        //                     name="username"
        //                     placeholder="Username"
        //                     value={this.state.username}
        //                     onChange={this.handleChange}
        //                 />
        //             </div>
        //         </div>
        //         <div className="form-group">
        //             <div className="col-1 col-ml-auto">
        //                 <label className="form-label" htmlFor="password">Password: </label>
        //             </div>
        //             <div className="col-3 col-mr-auto">
        //                 <input className="form-input"
        //                     placeholder="password"
        //                     type="password"
        //                     name="password"
        //                     value={this.state.password}
        //                     onChange={this.handleChange}
        //                 />
        //             </div>
        //         </div>
        //         <div className="form-group ">
        //             <div className="col-7"></div>
        //             <button
        //                 className="btn btn-primary col-1 col-mr-auto"

        //                 onClick={this.handleSubmit}
        //                 type="submit">Login</button>
        //         </div>
        //     </form>
        // </div>
      );
    }
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);

// export default LoginForm;
