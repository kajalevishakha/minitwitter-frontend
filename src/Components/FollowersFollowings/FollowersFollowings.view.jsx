import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './FollowersFollowings.css'

export class FollowersFollowingsPage extends Component {

    constructor(props) {
        super(props)
    
        const{dataOf,userList}=this.props

        this.state = {
             userList:userList,
             listOf:dataOf
        }
    }
    
    handleUnfollow=userid=>{

      this.props.unfollowUser(userid)
    }
  

    render() {
        const{userList,listOf}=this.state
        const{firstname,lastname,username}=this.props.userData
        return (
          <div>
            <div className="UserFollowers">
              <div id="logeed-fullname">
                {firstname} {lastname}
              </div>
              <div id="logeed-username"> @{username}</div>
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
                <button
                  id="btn-followings"
                  onClick={() => {
                    this.clickeventfollowings();
                  }}
                >
                  Followings
                </button>
              </div>
              {console.log('list of-----',listOf)}
              {
                  listOf==='followers' ?(


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
                              this.followUserBtn(follow.user.id);
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
                              this.unfollowUserBtn(follow.following.id);
                            }}
                          >
                            unfollow
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            ):(



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







            )
                  

              }
    
              
            </div>
          </div>
        );
      }
}

export default FollowersFollowingsPage
