import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import API_Calls from './../../APIs/API'
import MenuPage from './Menu.view'
import axios from 'axios'



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
    

    componentDidMount(){
        console.log('component did mount of menu parent')
        this.callCurrentUserAPI()
    }

    callCurrentUserAPI=()=>{

        API_Calls.currentUserAPI().then(response=>{
            console.log('response of current user api--',response)
            this.setState({
                firstname:response.data.first_name,
                lastname:response.data.last_name,
                username:response.data.username,
                id:response.data.id
            },
            ()=>{
                this.props.loggedUserData(this.state)
                this.callRequired()
            })

        })
        .catch(error=>{
            console.log(error)
            if(error===400 || error===401){
                this.props.history.push("/")
            }
        })

    }

    callRequired=()=>{
        const{id,allUsers}=this.state

        axios.all([API_Calls.fetchAllUsersAPI(),API_Calls.fetchFollowingsAPI(id)]).then(response=>{
            console.log('response of axios all',response)
            this.setState({
                allUsers:response[0]['data'],
                followingsList:response[1]['data'],
                shouldCallUI:true
            })
        })
        .catch(err=>{
            console.log('err',err)
                if(err===400 || err===401){
                this.props.history.push("/")
            }
        })
    }

   callFollowUserAPI=followid=>{

    const{id}=this.state

        API_Calls.followUserAPI(followid).then(response=>{
            console.log('response of follow user api in menu--',response)
            this.props.history.push('/minitwitter/'+'followings'+'/'+id)
        })
        .catch(err=>{
            console.log('err',err)
                if(err===400 || err===401){
                this.props.history.push("/")
            }
        })
    }

    postTweet=tweet=>{

        const{id}=this.state
        console.log('tweet in parent Menu--',tweet)
        API_Calls.postTweetAPI(tweet).then(status=>{
            if(status===201){
                this.props.history.push('/minitwitter/userprofile/'+id)
            }

        })
        .catch(err=>{
            console.log('err',err)
                if(err===400 || err===401){
                alert('something went wrong!')
            }
        })
        
    }

    render() {
        const{shouldCallUI,allUsers,followingsList,userToFollow}=this.state
        let loggedUserData={
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            username:this.state.username,
            id:this.state.id
            }
            
        
        return (
            <div>
                
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
               

                
                
            </div>
        )
    }
}

export default withRouter(Menu)
