import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import API_Calls from './../../APIs/API'
import FollowersFollowingsPage from './FollowersFollowings.view'


export class FollowersFollowings extends Component {

    constructor(props) {
        super(props)
        const{requestOf,id}=this.props.match.params
        console.log('object userdata--',this.props.loggedUserId)
        this.state = {
            
             requestOf:requestOf,
             id:id,
             followersFollowingsList:[],
             unfollowID:0,
             shouldCallUI:false,
             followingsList:[]
        }
        
    }
    

    componentDidMount(){

        const{requestOf,id}=this.state
        // const{id}=this.props.match.params
        // console.log('userid--',this.props.userData.id)

        if(requestOf==='followers'){

            axios.all([API_Calls.fetchFollowersAPI(id),API_Calls.fetchFollowingsAPI(id)]).then(response=>{
                console.log('response of both followers followings--',response)
                this.setState({
                    followersFollowingsList:response[0]['data'],
                    followingsList:response[1]['data'],
                    shouldCallUI:true
                })
            })
            .catch(code=>{
                if (code === 400 || code === 401) {
                    this.props.history.push("/");
                }
            })

        }

        else{

            const{id}=this.props.match.params

            API_Calls.fetchFollowingsAPI(id).then(response=>{
                console.log('list of followings from api--',response)

            if (response.status === 200) {
                    this.setState(
                    {
                        followersFollowingsList: response.data,
                        shouldCallUI:true
                    })
            }

            })
            .catch(code=>{
                if (code === 400 || code === 401) {
                    this.props.history.push("/");
                }
            })

        }

    }

    callUnfollowUserAPI=userid=>{
        const{id}=this.props.userData
        const userData={
            logid:id,
            unfollowid:userid
        }
        API_Calls.unfollowUserAPI(userData).then(status=>{

            if (status === 204) {
                console.log("UnFollowed Successfully!");
              }
            else if (status === 208) {
                console.log("Please follow again!");
              }
            this.props.history.push("/minitwitter/timeline/");

        })
        .catch(err=>{
            console.log(err)
            alert('Sorry cannot unfollow!')
        })
    }
    
    render() {
        console.log('props of followersfollowings parent--',this.props)
        
        const{requestOf,shouldCallUI,followersFollowingsList,followingsList}=this.state
        return (
            <div>
                
                {
                    shouldCallUI===true ?
                    <FollowersFollowingsPage dataOf={requestOf}
                                        userList={followersFollowingsList}
                                        followingsList={followingsList}
                                        userData={this.props.userData}
                                        unfollowUser={this.callUnfollowUserAPI}
                    />:
                    null
                }
                
            </div>
        )
    }
}

export default withRouter(FollowersFollowings)
