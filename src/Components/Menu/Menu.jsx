import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import CurrentUserAPI from './../../APIs/CurrentUserAPI'
import MenuPage from './Menu.view'
import PostTweetAPI from './../../APIs/PostTweetAPI'
import GetAllUserAPI from './../../APIs/GetAllUserAPI'
import FollowUserAPI from './../../APIs/FollowUserAPI'
import GetFollowingsAPI from './../../APIs/GetFollowingsAPI'

export class Menu extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             username:'',
             firstname:'',
             lastname:'',
             id:0,
             tweet:'',
             userToFollow:0,
             allUsers:[],
             followingsList:[],
             shouldCallUI:false,
             shouldCallPostTweetAPI:false,
             shouldCallFollowUserAPI:false,
             shouldCallFollowingsAPI:false
        }
       
    }
    
    setLoggedUserData=response=>{
        console.log('logged user data from current user api-->',response)
        this.setState({
            username:response.data.username,
            firstname:response.data.first_name,
            lastname:response.data.last_name,
            id:response.data.id,
            
        },
        ()=>console.log('ckecking set data-->',this.state.username))

        this.props.loggedUserData(this.state)
    }

    checkErrorCode=code=>{

        console.log('error code-->',code)

        if(code===400 || code===401){
        this.props.history.push('/')
        }

    }
    

    postTweet=tweet=>{

        console.log('tweet in parent Menu--',tweet)
        this.setState({tweet:tweet , shouldCallPostTweetAPI:true})
    }

    checkResponse=response=>{

        console.log('response of post tweet api-- ',response)

        if(response['status']===201){

            this.props.history.push('/minitwitter/userprofile/'+this.state.id)

        }
    }

    setAllUsersData=response=>{
        console.log('all users response from api--',response)
          this.setState({allUsers: response.data, shouldCallFollowingsAPI:true})
    }

    callFollowUserAPI=userid=>{
        console.log('user to be followed--',userid)
        this.setState({shouldCallFollowUserAPI:true,userToFollow:userid})
    }

    setFollowingsList=response=>{
        console.log('followings response from api--',response)
        this.setState({followingsList:response.data,shouldCallUI:true})
        

    }

    userFollowed=response=>{
        console.log('response of follow user api--',response)
        if (response["status"] === 201) {
            console.log("Followed Successfully!");
            this.props.history.push("/minitwitter/timeline/");
          }
        if (response["status"] === 208) {
            console.log("already followed!");
            this.props.history.push("/minitwitter/timeline/");
          }
    }
    
      
    

    render() {
        const{shouldCallUI,shouldCallPostTweetAPI,shouldCallFollowingsAPI,allUsers,followingsList,shouldCallFollowUserAPI,userToFollow}=this.state
        let loggedUserData={
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            username:this.state.username,
            id:this.state.id
            }
            
        
        return (
            <div>
                <CurrentUserAPI getLoggedUser={this.setLoggedUserData}
                                    errorCode={this.checkErrorCode}/>

                <GetAllUserAPI returnResponse={this.setAllUsersData}
                                    errorCode={this.checkErrorCode}
                />

                {
                    shouldCallFollowingsAPI===true ?
                    <GetFollowingsAPI id={loggedUserData.id}
                                  returnResponse={this.setFollowingsList}
                                  errorCode={this.checkErrorCode}
                    />:
                    null
                }


                {
                    shouldCallUI===true ?
                    <MenuPage loggedUserData={loggedUserData}
                              postTweet={this.postTweet}
                              allUsers={allUsers}
                              followUser={this.callFollowUserAPI}
                              followingsList={followingsList}
                              
                            
                />:
                    null
                }

                {   
                    shouldCallPostTweetAPI===true ?
                    <PostTweetAPI tweet={this.state.tweet}
                                    returnResponse={this.checkResponse}
                     />:
                    null
                }
                {
                    shouldCallFollowUserAPI===true ?
                    <FollowUserAPI id={userToFollow}
                                returnResponse={this.userFollowed}
                                errorCode={this.errorCode}
                    />:
                    null
                }
                
                
            </div>
        )
    }
}

export default withRouter(Menu)
