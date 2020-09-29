import React, { Component } from "react";
import UserProfilePage from "./UserProfile.view";
import API_Calls from "./../../APIs/API";
import { withRouter } from "react-router-dom";

export class UserProfile extends Component {
  constructor(props) {
    super(props);

    const { id } = this.props.match.params;

    this.state = {
      tweets: [],
      firstname: "",
      lastname: "",
      username: "",
      id: id,
      bio: "",
      profilePic: "",
    };
  }

  makeAPICall = (id) => {
    const { history } = this.props;
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
          profilePic: response.data["profile_picture"],
          tweets: response.data.user.tweets,
        });
      })
      .catch((error) => {
        console.log("error in user profile--", error);
        history.push("/");
      });
  };

  componentDidUpdate(props, state) {
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
