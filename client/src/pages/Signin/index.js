import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./style.css";

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
    alignItems: "center",
    backgroundColor: "#f1f1f1"
  },
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  avatar: {
    margin: "0 auto",
    marginBottom: "12px",
    marginTop: "12px",
    backgroundColor: theme.palette.error.main
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
      license: "",
      //error messages
      usernameError: "",
      passwordError: "",
      firstnameError: "",
      lastnameError: "",
      emailError: "",
      // dobError: "",
      licenseError: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  handleClickOpen = () => {
    this.setState({
      open: true,
      usernameError: "",
      passwordError: "",
      firstnameError: "",
      lastnameError: "",
      emailError: "",
      // dobError: "",
      licenseError: ""
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Form Validation function

  validate = () => {
    let usernameError = "";
    let passwordError = "";
    let firstnameError = "";
    let lastnameError = "";
    let emailError = "";
    // let dobError = "";
    let licenseError = "";

    if (!this.state.username) {
      usernameError = "can not be blank";
    }
    if (!this.state.firstname) {
      firstnameError = "can not be blank";
    }
    if (!this.state.lastname) {
      lastnameError = "can not be blank";
    }
    if (!this.state.password) {
      passwordError = "no password provided";
    }
    if (isNaN(this.state.license) || !this.state.license) {
      licenseError = "invalid license number";
    }
    // if (isNaN(this.state.dob) ||  !this.state.dob) {
    //   dobError = "invalid date of birth"
    // }
    if (!this.state.email.includes("@") || !this.state.email) {
      emailError = "invalid email";
    }
    if (
      emailError ||
      usernameError ||
      firstnameError ||
      lastnameError ||
      passwordError ||
      licenseError
    ) {
      this.setState({
        emailError,
        usernameError,
        firstnameError,
        lastnameError,
        passwordError,
        licenseError
      });
      return false;
    }

    return true;
  };

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
            redirectTo: "/searchresult"
          });
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
      });
  }

  handleSubmitForm(event) {
    // event.preventDefault();

    //FORM VALIDATION
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      this.setState({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        dob: "",
        license: ""
      });

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
    } else {
      this.setState({ open: true });
    }
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
          <h1
            style={{
              fontFamily: "Galada",
              color: "white",
              fontSize: "75px",
              margin: "0"
            }}
          >
            Parky
          </h1>
          <Grid
            item
            xs={3}
            style={{
              minWidth: "250px"
            }}
          >
            <Paper id="signin" className={classes.root} elevation={1} mx="auto">
              <Avatar className={classes.avatar} color="primary">
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
                <Grid container style={{ margin: "12px 0 0 0" }}>
                  <Grid item>
                    <Link
                      style={{ cursor: "pointer" }}
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
                style={{ fontFamily: "Roboto" }}
              >
                <DialogTitle id="form-dialog-title">
                  Create an Account
                </DialogTitle>
                <DialogContent style={{ fontFamily: "Roboto" }}>
                  <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      autoFocus
                      label="zz"
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
                    <TextField
                      label="Password"
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
                    <TextField
                      label="First Name"
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

                    <TextField
                      label="Last Name"
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

                    <TextField
                      label="Email Address"
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

                    <TextField
                      label="Date of Birth"
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

                    <TextField
                      label="Driver's License ID #"
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
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => this.handleSubmitForm()}
                    color="error"
                    variant="outlined"
                  >
                    Sign Up
                  </Button>
                  <Button
                    onClick={() => this.handleClose()}
                    color="error"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </Paper>
          </Grid>
        </Grid>
      );
    }
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);
