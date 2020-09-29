import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "./../../logo.png";
import "./Menu.css";

export class MenuPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: "",
      tweetError: "",
      searchValue: "",
      searchResult: [],
      showSearchResult: false,
    };
  }

  handleProfile = (event) => {
    const { history } = this.props;
    event.preventDefault();
    history.push("/minitwitter/userprofile/" + this.props.loggedUserData.id);
  };
  handlePostTweet = (event) => {
    const { postTweet } = this.props;
    event.preventDefault();
    postTweet(this.state.tweets);
    this.setState({ tweets: "" });
  };
  handleHome = (event) => {
    const { history } = this.props;
    event.preventDefault();
    history.push("/minitwitter/timeline/");
  };
  handleLogout = (event) => {
    const { history } = this.props;
    event.preventDefault();
    localStorage.clear("token");
    window.location.reload(false);
    history.push("/");
  };
  handleViewProfile = (userid) => {
    const { history } = this.props;
    console.log("userid--", userid);
    history.push("/minitwitter/userprofile/" + userid);
  };
  handleFollowings = (event) => {
    const { history } = this.props;
    event.preventDefault();
    history.push(
      "/minitwitter/" + "followings" + "/" + this.props.loggedUserData.id
    );
  };
  handleFollowers = (event) => {
    const { history } = this.props;
    event.preventDefault();
    history.push(
      "/minitwitter/" + "followers" + "/" + this.props.loggedUserData.id
    );
  };
  handleFollow = (userid) => {
    const { followUser } = this.props;
    followUser(userid);
  };

  changeEvent = (event) => {
    const { value } = event.target;
    this.setState({ tweetError: null });
    if (value.length > 100) {
      this.setState({
        tweetError: "oops.. Tweet is too long!",
      });
    }
    if (value.length === 0) {
      this.setState({
        tweetError: "oops.. Tweet is Empty!",
      });
    }

    this.setState({
      tweets: event.target.value,
    });
  };
  handleInputSearchChange = (event) => {
    const { value } = event.target;
    this.setState({ searchValue: value });
  };
  handleSearch = (event) => {
    const { makeSearch } = this.props;
    event.preventDefault();
    makeSearch(this.state.searchValue);
    this.setState({ showSearchResult: true });
  };

  render() {
    const { allUsers, searchResult, loggedUserData } = this.props;
    const { firstname, lastname, username } = loggedUserData;
    const { tweets, searchValue, showSearchResult } = this.state;

    return (
      <div className="Menu">
        {/* Renders the side menu */}
        <div className="sideMenu">
          <div id="user-info">
            <div id="menu-fullname">
              {firstname} {lastname}{" "}
            </div>
            <div id="menu-username">@{username}</div>
          </div>
          <div>
            <img src={logo} alt="logo"></img>
          </div>

          <div>
            <button type="button" onClick={this.handleHome}>
              {/* <i class="fa fa-home"></i> */}
              Home
            </button>
          </div>

          <div>
            <button type="button" onClick={this.handleProfile}>
              {/* <i class="fa fa-user"></i> */}
              Profile
            </button>
          </div>

          <div>
            <button type="button" onClick={this.handleFollowings}>
              {/* <i class="fa fa-users"></i> */}
              Following
            </button>
          </div>

          <div id="adjust-f">
            <button type="button" onClick={this.handleFollowers}>
              {/* <i class="fas fa-user-friends"></i> */}
              Followers
            </button>
          </div>

          <div>
            <button type="button" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        </div>
        {/* Will render the upper part from where user can tweet */}
        <div className="tweetContainer">
          <div id="home-label">
            <h3>Home</h3>
          </div>
          <div className="tweetBox">
            <form>
              <textarea
                value={tweets}
                name="tweets"
                placeholder="What's Happening?"
                onChange={this.changeEvent}
              ></textarea>
              <br />
              <br />
              <div id="tweetError">{this.state.tweetError}</div>

              {this.state.tweetError == null ? (
                <button type="button" onClick={this.handlePostTweet}>
                  Post Tweet
                </button>
              ) : null}
            </form>
          </div>
        </div>
        {/* Will render all available users on opposite side of navigation menu */}
        <div className="searchUser">
          <div className="searchBar">
            <input
              type="text"
              value={searchValue}
              name="searchValue"
              onChange={this.handleInputSearchChange}
              placeholder="search"
            ></input>
            {searchValue !== "" ? (
              <button
                id="close-serach"
                onClick={() => {
                  this.setState({ showSearchResult: false, searchValue: "" });
                }}
              >
                <i class="far fa-times-circle"></i>
              </button>
            ) : null}

            <button type="button" onClick={this.handleSearch}>
              search
            </button>
            {showSearchResult === true ? (
              <div className="users">
                {searchResult.length === 0 ? (
                  <h3>Ohh... No Match Found of {searchValue} !!</h3>
                ) : (
                  searchResult.map((user, index) => (
                    <div id="for-each">
                      <h4 key={index}>
                        {user.first_name} {user.last_name}
                        <div id="search-result-username">
                          <Link
                            onClick={() => {
                              this.handleViewProfile(user.id);
                            }}
                          >
                            {user.username}
                          </Link>
                        </div>
                      </h4>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="users">
                <h2>Who to follow</h2>
                <h4 id="other-users-list">
                  {allUsers.map((user) => (
                    <div id="for-each">
                      <h4 key={user.id}>
                        <Link
                          onClick={() => {
                            this.handleViewProfile(user.id);
                          }}
                        >
                          <div id="other-user-name">{user.username}</div>
                        </Link>
                        <button
                          id="follow-button"
                          onClick={() => {
                            this.handleFollow(user.id);
                          }}
                        >
                          follow
                        </button>
                      </h4>
                    </div>
                  ))}
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MenuPage);
