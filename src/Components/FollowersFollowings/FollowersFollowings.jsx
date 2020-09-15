import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import GetFollowersAPI from './../../APIs/GetFollowersAPI'
import GetFollowingsAPI from './../../APIs/GetFollowingsAPI'
import FollowersFollowingsPage from './FollowersFollowings.view'
import UnfollowUserAPI from './../../APIs/UnfollowUserAPI'

export class FollowersFollowings extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             followersFollowingsList:[],
             unfollowID:0,
             shouldCallUI:false,
             shouldCallUnfollowAPI:false
        }
        
    }
    

    setFollowersList=response=>{
        console.log('list of followers from api--',response)

        if (response.status === 200) {
                this.setState(
                  {
                    followersFollowingsList: response.data,
                  },
                  () =>
                    console.log("followers data-->", this.state.followers)
                );
              }
        if (response["status"] === 206) {
                console.log(response.data.message);
    
                return response.data.message;
              }

        this.setState({shouldCallUI:true})
    }
    errorCode=code=>{
          if (code === 400 || code === 401) {
                this.props.history.push("/");
            }
    }
    callUnfollowUserAPI=userid=>{
        console.log('user to be unfollow--',userid)
        this.setState({shouldCallUnfollowAPI:true,unfollowID:userid})
    }
    userUnfollowed=response=>{

        if (response["status"] === 204) {
            console.log("UnFollowed Successfully!");
            this.props.history.push("/minitwitter/timeline/");
          }
          if (response["status"] === 208) {
            console.log("Please follow again!");
            this.props.history.history.push("/minitwitter/timeline/");
          }



    }
    render() {
        console.log('props of followersfollowings parent--',this.props)
        const{requestOf,id}=this.props.match.params
        const{unfollowID,shouldCallUI,shouldCallUnfollowAPI,followersFollowingsList}=this.state
        return (
            <div>
                {
                    requestOf==='followers' ?
                    <GetFollowersAPI id={id}
                                    returnResponse={this.setFollowersList}
                                     errorCode={this.errorCode}
                    />:
                    <GetFollowingsAPI id={id}
                                    returnResponse={this.setFollowersList}
                                     errorCode={this.errorCode}
                    />
                }

                {
                    shouldCallUI===true ?
                    <FollowersFollowingsPage dataOf={requestOf}
                                        userList={followersFollowingsList}
                                        userData={this.props.userData}
                                        unfollowUser={this.callUnfollowUserAPI}
                    />:
                    null
                }
                {
                    shouldCallUnfollowAPI===true ?
                    <UnfollowUserAPI unfollowid={unfollowID}
                                     returnResponse={this.userUnfollowed}
                                     errorCode={this.errorCode}
                                     logid={this.props.userData.id}
                    />:
                    null
                }


                
            </div>
        )
    }
}

export default withRouter(FollowersFollowings)
