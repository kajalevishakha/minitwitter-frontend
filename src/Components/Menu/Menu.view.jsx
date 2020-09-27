
import React, { Component, Fragment } from 'react'
import {Link,withRouter} from 'react-router-dom'
import logo from './../../logo.png'
import './Menu.css'
import API_Calls from './../../APIs/API'

export class MenuPage extends Component {
    
    constructor(props) {
        super(props)


        
    
        this.state = {
             tweets:'',
             tweetError:"",
             searchValue:'',
             searchResult:[],
             showSearchResult:false
        }
    }
    
    handleProfile=event=>{
        event.preventDefault()
        this.props.history.push('/minitwitter/userprofile/'+this.props.loggedUserData.id)
    }
    handlePostTweet=event=>{
        event.preventDefault()
        this.props.postTweet(this.state.tweets)
        this.setState({tweets:''})
    }
    handleHome=event=>{
        event.preventDefault()
        this.props.history.push('/minitwitter/timeline/')
    }
    handleLogout=event=>{
        event.preventDefault()
        localStorage.clear('token')
        this.props.history.push('/')

    }
    handleViewProfile=userid=>{
        console.log('userid--',userid)
        this.props.history.push('/minitwitter/userprofile/'+userid)

    }
    handleFollowings=event=>{
        event.preventDefault()
        this.props.history.push('/minitwitter/'+'followings'+'/'+this.props.loggedUserData.id)
        // window.location.reload(false);


    }
    handleFollowers=event=>{
        event.preventDefault()
        this.props.history.push('/minitwitter/'+'followers'+'/'+this.props.loggedUserData.id)
        // window.location.reload(false);
    }
    handleFollow=userid=>{
        this.props.followUser(userid)
        // window.location.reload(false);
        this.forceUpdate()
    }

    componentWillUnmount() {
        clearInterval(this.interval);
      }
      

    changeEvent=event=>{
        
        const{value}=event.target
        this.setState({tweetError:null})
        if(value.length>100){

            this.setState({
                tweetError:"oops.. Tweet is too long!"
            })
        }
        if(value.length===0){

            this.setState({
                tweetError:"oops.. Tweet is Empty!"
            })
        }
        
        this.setState({
            tweets:event.target.value
        })

        
    }
    handleInputSearchChange=event=>{
        const{value}=event.target
        this.setState({searchValue:value})
    }
    handleSearch=event=>{
        event.preventDefault()
        this.state.searchResult.push(this.state.searchValue)
        API_Calls.searchAPI(this.state.searchValue)
        console.log('search value',this.state.searchResult)
        this.setState({showSearchResult:true})

    }

    


    render() {

        // const{tweets,allUsers}=this.state
        //console.log('followingss->',this.props.followingData)
        const{firstname,lastname,username}=this.props.loggedUserData
        const{tweets,searchValue,showSearchResult,searchResult}=this.state
        const{allUsers}=this.props

        
        return (
        
            
            <div className="Menu">
                {/* Renders the side menu */}
                <div className="sideMenu">
                    <div id="user-info">
                        <div id="menu-fullname">{firstname} {lastname} </div>
                        <div id="menu-username">@{username}</div>
                        
                    </div>
                    <div>
                        <img src={logo} alt="logo"></img>
                    </div>

                    <div>
                        <button type="button" 
                        onClick={this.handleHome}>
                            {/* <i class="fa fa-home"></i> */}
                            Home
                        </button>
                    </div>

                    <div>
                        <button type="button" 
                        onClick={this.handleProfile}>
                            {/* <i class="fa fa-user"></i> */}
                            Profile
                        </button>
                    </div>

                    

                    <div>
                        <button type="button" 
                        onClick={this.handleFollowings}>
                            {/* <i class="fa fa-users"></i> */}
                            Following
                        </button>
                    </div>

                    <div id="adjust-f">
                         <button type="button" 
                         onClick={this.handleFollowers}>
                             {/* <i class="fas fa-user-friends"></i> */}
                             Followers
                         </button>
                    </div>
                    
                    <div>
                         <button type="button" 
                         onClick={this.handleLogout}>
                             Logout
                        </button>
                    </div>
                

                </div>
                {/* Will render the upper part from where user can tweet */}
                <div className="tweetContainer">
                    <div id='home-label'>
                            <h3>Home</h3>
                    </div>
                    <div className="tweetBox">
                        <form>
                        <textarea
                            value={tweets}
                            name="tweets"
                            placeholder="What's Happening?"
                            onChange={this.changeEvent}>
                        </textarea><br/><br/>
                        <div id="tweetError">{this.state.tweetError}</div>
                       
                        {
                            this.state.tweetError==null ?
                            <button type="button"
                            onClick={this.handlePostTweet}>Post Tweet</button> :
                            null

                        }
                        
                        
                         </form>
                        
                    </div>
                    

                </div>
                {/* Will render all available users on opposite side of navigation menu */}
                <div className="searchUser">
                    <div className="searchBar">
                        <input type="text"
                        value={searchValue}
                        name="searchValue"
                        onChange={this.handleInputSearchChange}
                        placeholder="search">
                        </input>
                        {
                            searchValue!==''?
                            <button id='close-serach'
                        onClick={()=>{this.setState({showSearchResult:false,searchValue:''})}}>
                            <i class="far fa-times-circle"></i></button>:
                            null

                        }
                        
                        <button type="button"
                        onClick={this.handleSearch}>
                            search
                        </button>
                        {
                            showSearchResult===true ?
                            <div className="users">
                                {searchResult.map((user,index)=>(
                                    <div id="for-each">
                                    <h4 key={index}>
                                    {user}
                                    </h4>
                                </div>

                                ))}
                                

                            </div>:
                            <div className="users">
                            <h2>Who to follow</h2>
                                <h4 id="other-users-list">
                                
                                 {allUsers.map((user) => (
                                       <div id="for-each"> 
                                            <h4 key={user.id}>
                                                
                                                <Link onClick={()=>{this.handleViewProfile(user.id)}}>
                                                <div id="other-user-name">{user.username}</div>
                                                </Link>
                                                <button id="follow-button" onClick={()=>{this.handleFollow(user.id)}}>follow</button>
            
                                            </h4>
                                        </div> 
                                    ))} 
                                </h4>
                            </div>

                        }

                        
                    </div>


                </div>

                </div>
               
        )
    }




}

export default withRouter(MenuPage)
