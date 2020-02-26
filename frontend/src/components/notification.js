import React from "react";
import axios from "axios";

var qs = require("qs");

class notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      age: null,
      interest: "hello"
    };
  }
  //   mySubmitHandler = event => {
  //     event.preventDefault();
  //     let age = this.state.age;
  //     if (!Number(age)) {
  //       alert("Your age must be a number");
  //     }
  //   };

  submitHandler = e => {
    e.preventDefault();
    // console.log(this.state);
    axios({
      method: "post",
      url: "http://localhost:8000/SCM/notification/",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify(this.state)
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  myChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <h1>
          Hello {this.state.username} {this.state.age}
        </h1>
        <p>Notification Title:</p>
        <input type="text" name="username" onChange={this.myChangeHandler} />
        <p>Notification Body:</p>
        <input type="text" name="age" onChange={this.myChangeHandler} />
        <br />
        <label>
          <p>Send Notification to: </p>
          <select
            name="interest"
            value={this.state.value}
            onChange={this.myChangeHandler}
          >
            <option value="hello">interest</option>
            <option value="route_one">Route One (Rohit)</option>
            <option value="route_two">Route Two (Arzoo)</option>
          </select>
        </label>
        <br />
        <br />
        <input type="submit" />
      </form>
    );
  }
}

export default notification;
