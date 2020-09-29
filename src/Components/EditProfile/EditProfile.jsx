import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API_Calls from "../../APIs/API";
import EditProfilePage from "./EditProfile.view";

export class EditProfile extends Component {
  constructor(props) {
    super(props);

    const { id } = this.props.match.params;
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      bio: null,
      id: id,
      shouldCallUI: false,
    };
  }

  componentDidMount() {
    const { id } = this.state;
    const { history } = this.props;

    API_Calls.fetchProfileAPI(id)
      .then((response) => {
        console.log("respose of profile api in menu--", response);
        this.setState({
          firstname: response.data.user["first_name"],
          lastname: response.data.user["last_name"],
          username: response.data.user["username"],
          bio: response.data["bio"],
          shouldCallUI: true,
        });
      })
      .catch((code) => {
        history.push("/");
      });
  }

  saveEdits = (editedData) => {
    const { id } = this.state;
    const { history } = this.props;
    API_Calls.setProfilePicAPI(editedData, id)
      .then((response) => {
        if (response["status"] === 200) {
          history.push("/minitwitter/userprofile/" + id);
        }
      })
      .catch((err) => {
        console.log("err--", err);
        history.push("/minitwitter/userprofile/" + id);
      });
  };

  render() {
    const { firstname, lastname, username, bio, id, shouldCallUI } = this.state;
    const userData = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      bio: bio,
      id: id,
    };

    return (
      <div>
        {shouldCallUI === true ? (
          <EditProfilePage userData={userData} saveEdits={this.saveEdits} />
        ) : null}
      </div>
    );
  }
}

export default withRouter(EditProfile);
