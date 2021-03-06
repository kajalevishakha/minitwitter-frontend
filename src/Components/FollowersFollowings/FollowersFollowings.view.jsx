import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./FollowersFollowings.css";

export class FollowersFollowingsPage extends Component {
  handleUnfollow = (userid) => {
    const { unfollowUser } = this.props;
    unfollowUser(userid);
  };

  handleFollow = (userid) => {
    const { followUser } = this.props;
    followUser(userid);
  };

  handleFollowing = (id) => {
    const { history } = this.props;
    history.push("/minitwitter/" + "followings" + "/" + id);
  };
  viewProfile = (id) => {
    const { history } = this.props;
    history.push("/minitwitter/userprofile/" + id);
  };

  isFollowing = (username) => {
    const { followingsList } = this.props;

    let item = followingsList.filter(
      (index) => index.following.username === username
    );
    if (item.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { userList, dataOf, userData } = this.props;
    const { firstname, lastname, username, id } = userData;
    return (
      <div>
        <div className="UserFollowers">
          <div id="logeed-fullname">
            {firstname} {lastname}
          </div>
          <div id="logeed-username"> @{username}</div>
          {dataOf === "followers" ? (
            <div id="upper-buttons">
              <button
                id="btn-followers"
                onClick={() => {
                  this.clickeventfollowers();
                }}
              >
                {" "}
                Followers
              </button>
            </div>
          ) : (
            <div id="upper-buttons">
              <button
                id="btn-followings"
                onClick={() => {
                  this.clickeventfollowings();
                }}
              >
                Followings
              </button>
            </div>
          )}
          {console.log("list of-----", dataOf)}
          {dataOf === "followers" ? (
            <div id="followers-list">
              {userList.map((follow) => (
                <div key={follow.user.id}>
                  <div id="followers-fullname">
                    <i class="fa fa-user-circle"></i>
                    <label id="followers-fullname">
                      {follow.user.first_name} {follow.user.last_name}
                    </label>
                  </div>
                  <div id="followers-username">
                    <Link
                      onClick={() => {
                        this.viewProfile(follow.user.id);
                      }}
                    >
                      @{follow.user.username}
                    </Link>
                    {this.isFollowing(follow.user.username) === true ? (
                      <div id="view-profile-btn">
                        <button
                          type="button"
                          onClick={() => {
                            this.handleFollow(follow.user.id);
                          }}
                        >
                          follow
                        </button>
                      </div>
                    ) : (
                      <div id="unfollow-followers-btn">
                        <button
                          type="button"
                          onClick={() => {
                            this.handleFollowing(id);
                          }}
                        >
                          following
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div id="followers-list">
              {userList.map((follow) => (
                <div key={indexedDB}>
                  <div id="following-fullname">
                    <i className="fa fa-user-circle"></i>
                    {follow.following.first_name} {follow.following.last_name}
                  </div>
                  <div id="followings-username">
                    <Link
                      onClick={() => {
                        this.viewProfile(follow.following.id);
                      }}
                    >
                      @{follow.following.username}
                    </Link>
                    <div id="unfollow-btn">
                      <button
                        type="button"
                        onClick={() => {
                          this.handleUnfollow(follow.id);
                        }}
                      >
                        Unfollow
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(FollowersFollowingsPage);
