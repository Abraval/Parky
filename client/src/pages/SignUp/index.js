import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      dob: "",
      license: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    console.log("sign-up handleSubmit, username: ");
    console.log(this.state.username);
    event.preventDefault();

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
        console.log(response);
        if (!response.data.errmsg) {
          console.log("successful signup");
          this.setState({
            //redirect to login page
            redirectTo: "/signin"
          });
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
    return (
      <div className="SignupForm">
        <h4>Sign up</h4>
        <form className="form-horizontal">
          {/* Username */}
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="username">
                Username
              </label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* password */}
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="password">
                Password:{" "}
              </label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                placeholder="password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* FirstName */}
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="firstname">
                First Name
              </label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                type="text"
                id="firstname"
                name="firstname"
                placeholder="First name"
                value={this.state.firstname}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* Last Name */}
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="lastname">
                Lastname
              </label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Last name"
                value={this.state.lastname}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* email */}
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="email">
                Email
              </label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                type="text"
                id="email"
                name="email"
                placeholder="email@email.com"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* DOB */}
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="dob">
                Date of Birth
              </label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                type="text"
                id="dob"
                name="dob"
                placeholder="dd/mm/yy"
                value={this.state.dob}
                onChange={this.handleChange}
              />
            </div>
          </div>
          {/* license */}
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="license">
                Licence #
              </label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                type="text"
                id="license"
                name="license"
                placeholder="** *** ***"
                value={this.state.license}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group ">
            <div className="col-7"></div>
            <button
              className="btn btn-primary col-1 col-mr-auto"
              onClick={this.handleSubmit}
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
