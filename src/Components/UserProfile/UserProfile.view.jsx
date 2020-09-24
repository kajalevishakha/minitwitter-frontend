import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import './UserProfile.css'

export class UserProfilePage extends Component {

    handleEdit=event=>{
      event.preventDefault()
      this.props.history.push("/minitwitter/userprofile/edit/" + this.props.loggedUserId);
    }
    

    render() {
        const { tweets, firstname, lastname, username, bio } = this.props.userData;
        return (
          <div>
            <div className="Profile">
              <div id="upper-portion">
                {firstname} {lastname}
              </div>
    
              <i className="fa fa-user-alt"></i>
              <div id="full-name">
                {firstname} {lastname}
              </div>
              <div id="user-id">@{username}</div>
              <div id="user-id">{bio}</div>
              <button id="tweets-available">Tweets</button>
              <div className="tweets">
                <h4 id="tweets">
                  {tweets.map((tweet) => (
                    <h4 key={tweet.id}>
                      <div id="tweetuser">
                      <i class="fas fa-user-circle"></i>@{username}
                        <br />
                      </div>
                      <div id="user-tweet">
                        <div id="twitter">{tweet.content}</div>
                      </div>
                      {/* {
                          this.props.loggedUserName === username ?
                          <button id="btn-delete"
                            onClick={()=>this.handleDelete(tweet.id)}>
                                <i className="fa fa-trash-alt"></i>
                            </button>:
                            null
                      } */}
                      
                    </h4>
                  ))}
                </h4>
              </div>
              {this.props.loggedUserName === username ? (
                <button id="edit" type="button" onClick={this.handleEdit}>
                  Edit
                </button>
              ) : null}
              <button
                id="exitbtn"
                onClick={() => {
                //   history.push("/minitwitter/timeline/");
                }}
              >
                Exit
              </button>
            </div>
          </div>
        );
      }
}

export default withRouter(UserProfilePage)
