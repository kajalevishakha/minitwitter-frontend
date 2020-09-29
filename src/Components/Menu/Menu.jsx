import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import API_Calls from "./../../APIs/API";
import MenuPage from "./Menu.view";

export class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      id: 0,
      tweet: "",
      allUsers: [],
      searchResult: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { location, history } = this.props;
    if (location.state !== undefined) {
      this.callFetchAllUsersAPI();
      history.push("/minitwitter/timeline/");
    }
  }

  componentDidMount() {
    console.log("component did mount of menu parent");
    this.callCurrentUserAPI();
  }

  callCurrentUserAPI = () => {
    const { loggedUserData, history } = this.props;

    API_Calls.currentUserAPI()
      .then((response) => {
        console.log("response of current user api--", response);
        this.setState(
          {
            firstname: response.data.first_name,
            lastname: response.data.last_name,
            username: response.data.username,
            id: response.data.id,
          },
          () => {
            loggedUserData(this.state);
            this.callFetchAllUsersAPI();
          }
        );
      })
      .catch((error) => {
        console.log("err", error);
        history.push("/");
      });
  };

  callFetchAllUsersAPI = () => {
    const { id } = this.state;
    const { history } = this.props;
    API_Calls.fetchAllUsersAPI()
      .then((response) => {
        console.log("response of axios all", response);
        this.setState({
          allUsers: response["data"],
        });
      })
      .catch((err) => {
        console.log("err", err);
        history.push("/");
      });
  };

  callFollowUserAPI = (followid) => {
    const { id } = this.state;
    const { history } = this.props;

    API_Calls.followUserAPI(followid)
      .then((response) => {
        console.log("response of follow user api in menu--", response);
        history.push("/minitwitter/" + "followings" + "/" + id, { response });
      })
      .catch((err) => {
        console.log("err", err);
        alert("something went wrong!");
      });
  };

  postTweet = (tweet) => {
    const { id } = this.state;
    const { history } = this.props;
    console.log("tweet in parent Menu--", tweet);
    API_Calls.postTweetAPI(tweet)
      .then((status) => {
        if (status === 201) {
          history.push("/minitwitter/userprofile/" + id);
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert("something went wrong!");
      });
  };

  callSearchAPI = (searchValue) => {
    API_Calls.searchAPI(searchValue).then((res) => {
      console.log("response in parent search--", res);
      this.setState({ searchResult: res.data });
    });
  };

  render() {
    const {
      allUsers,
      searchResult,
      firstname,
      lastname,
      username,
      id,
    } = this.state;
    
    let loggedUserData = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      id: id,
    };

    return (
      <div>
        {allUsers.length > 0 ? (
          <MenuPage
            loggedUserData={loggedUserData}
            postTweet={this.postTweet}
            allUsers={allUsers}
            followUser={this.callFollowUserAPI}
            makeSearch={this.callSearchAPI}
            searchResult={searchResult}
          />
        ) : (
          <h1>LOADING</h1>
        )}
      </div>
    );
  }
}

export default withRouter(Menu);
