import React, { Component } from "react";

class Profile extends Component {
  state = {
    // language: 'Node',
    // loading: true,
    // transaction: false,
    // clientAuthorizationResponse: 'Waiting...'
    userEmail: 'test'
  }

  componentDidMount() {
    this.setUserProfile();
  }
  setUserProfile = () => {
    if (localStorage.getItem("user")) {
      console.log(localStorage.getItem("user"));
      this.setState({ userEmail: localStorage.getItem("user") });
    } else {
      let id = Math.random().toString(36).substr(2, 15);
      let user = "user_" + id + "@test.com";
      // let user
      this.setState({ userEmail: localStorage.getItem("user") });
      localStorage.setItem("user", user);
      console.log("User created");
      console.log(user);
    }
  }

  render() {
    return (
      <>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <br />
              <div class="card" >
                <div class="card-header">
                  Profile
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">User email: <span id='userEmail'>{this.state.userEmail}</span></li>
                  <li class="list-group-item">PayPal account tokenization:</li>
                  <li class="list-group-item">Credit Card tokenization:</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
