import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import './Timeline.css'

export class TimelinePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             timelineContent:this.props.timelineContent
        }
        
    }

    handleViewProfile=userid=>{
      const{history}=this.props
      history.push(`/minitwitter/userprofile/${userid}`)

    }
    
    render() {

        const { timelineContent } = this.state;
        
        return (
          <div>
            
    
            <div className="timeline">
              <div className="tweets-timeline">
                <div id="tweets-timeline-content">
                  {timelineContent.map((tweet) => (
                    <h4 key={tweet.id}>
                      <div id="each-content">
                        <div id="tweet-full-name">
                          <i className="fa fa-user-circle"></i>
                          {tweet.user.first_name} {tweet.user.last_name}
                          <Link
                            id="tweet-user-name"
                            onClick={() => {
                              this.handleViewProfile(tweet.user.id);
                            }}
                          >
                            <span>@{tweet.user.username}</span>
                          </Link>
                        </div>
    
                        <div id="tweet-content">{tweet.content}</div>
                      </div>
                    </h4>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }
}

export default withRouter(TimelinePage)
