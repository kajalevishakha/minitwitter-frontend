import React, { Component } from "react";
import UserProfilePage from "./UserProfile.view";
import API_Calls from "./../../APIs/API";
import { withRouter } from "react-router-dom";

export class UserProfile extends Component {
  constructor(props) {
    super(props);

    console.log("parent props--", this.props);
    const { id } = this.props.match.params;

    this.state = {
      tweets: [],
      firstname: "",
      lastname: "",
      username: "",
      id: id,
      bio: "",
    };
  }

  makeAPICall = (id) => {
    API_Calls.fetchProfileAPI(id)
      .then((response) => {
        console.log(
          "response of fetch profile api in parent userprofile--",
          response
        );
        this.setState({
          firstname: response.data.user["first_name"],
          lastname: response.data.user["last_name"],
          username: response.data.user["username"],
          bio: response.data["bio"],
          tweets: response.data.user.tweets,
        });
      })
      .catch((code) => {
        if (code === 504 || code === 401 || code === 400) {
          this.props.history.push("/");
        }
      });
  };


  componentDidUpdate(props, state) {
    // console.log('prev states in component did update--',state)
    // console.log('prev props in component did update--',props)
    // console.log('current state--',this.state)
    // console.log('current props--',this.props)
    const prevPropID = props.match.params.id;
    const currentPropID = this.props.match.params.id;
    if (currentPropID !== prevPropID) {
      this.makeAPICall(currentPropID);
    }
  }

  componentDidMount() {
    const { id } = this.state;
    this.makeAPICall(id);
  }

  render() {
    const { firstname, lastname } = this.state;
    const { loggedUserName, loggedUserId } = this.props;

    return (
      <div>
        {firstname && lastname !== "" ? (
          <UserProfilePage
            userData={this.state}
            loggedUserName={loggedUserName}
            loggedUserId={loggedUserId}
          />
        ) : null}
      </div>
    );
  }
}

export default withRouter(UserProfile);
