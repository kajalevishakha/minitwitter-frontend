import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import API_Calls from "./../../APIs/API";
import FollowersFollowingsPage from "./FollowersFollowings.view";
import EmptyData from "./../EmptyData/EmptyData";

export class FollowersFollowings extends Component {
  constructor(props) {
    super(props);
    const { requestOf, id } = this.props.match.params;
    this.state = {
      requestOf: requestOf,
      id: id,
      followersFollowingsList: [],
      unfollowID: 0,
      followingsList: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { match, location, history } = this.props;
    const prevRequestOf = prevProps.match.params.requestOf;
    const currentRequestOf = match.params.requestOf;
    const { id } = match.params;
    if (prevRequestOf !== currentRequestOf) {
      this.callFollowersFollowingAPI(currentRequestOf, id);
    } else if (
      location.state !== undefined &&
      currentRequestOf === "followings"
    ) {
      console.log("request in if condition--", currentRequestOf);
      this.callFollowersFollowingAPI("followings", id);
      history.push("/minitwitter/" + "followings" + "/" + id);
    }
  }

  componentDidMount() {
    const { requestOf, id } = this.state;
    this.callFollowersFollowingAPI(requestOf, id);
  }

  callFollowersFollowingAPI = (request, id) => {
    this.setState({ followersFollowingsList: [] });
    const { history } = this.props;
    if (request === "followers") {
      axios
        .all([
          API_Calls.fetchFollowersAPI(id),
          API_Calls.fetchFollowingsAPI(id),
        ])
        .then((response) => {
          console.log("response of both followers followings--", response);
          this.setState({
            followersFollowingsList: response[0]["data"],
            followingsList: response[1]["data"],
            requestOf: request,
          });
        })
        .catch((error) => {
          console.log("err--", error);
          history.push("/");
        });
    } else {
      API_Calls.fetchFollowingsAPI(id)
        .then((response) => {
          console.log("list of followings from api--", response);

          if (response.status === 200) {
            this.setState({
              followersFollowingsList: response.data,
              requestOf: request,
            });
          }
        })
        .catch((code) => {
          history.push("/");
        });
    }
  };

  callUnfollowUserAPI = (userid) => {
    const { history } = this.props;
    const { id } = this.props.userData;
    const userData = {
      logid: id,
      unfollowid: userid,
    };
    API_Calls.unfollowUserAPI(userData)
      .then((status) => {
        if (status === 204) {
          console.log("UnFollowed Successfully!");
        } else if (status === 208) {
          console.log("Please follow again!");
        }
        history.push("/minitwitter/timeline/", { status });
      })
      .catch((err) => {
        console.log(err);
        alert("Sorry cannot unfollow!");
      });
  };

  callFollowUserAPI = (followid) => {
    const { id } = this.state;
    const { history } = this.props;

    API_Calls.followUserAPI(followid)
      .then((response) => {
        console.log("response of follow user api in menu--", response);
        this.setState({ shouldCallFollowUserAPI: true });
        history.push("/minitwitter/" + "followings" + "/" + id, { response });
      })
      .catch((err) => {
        console.log("err", err);
        alert("Sorry cannot follow!");
      });
  };

  render() {
    const { requestOf, followersFollowingsList, followingsList } = this.state;
    return (
      <div>
        {followersFollowingsList.length > 0 ? (
          <FollowersFollowingsPage
            dataOf={requestOf}
            userList={followersFollowingsList}
            followingsList={followingsList}
            userData={this.props.userData}
            unfollowUser={this.callUnfollowUserAPI}
            followUser={this.callFollowUserAPI}
          />
        ) : (
          <EmptyData />
        )}
      </div>
    );
  }
}

export default withRouter(FollowersFollowings);
