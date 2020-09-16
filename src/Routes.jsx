import React, { Component, Fragment } from "react";
import {  Switch, Route, BrowserRouter as Router} from "react-router-dom";

import Registration from './Components/Registration/Registration'
import Login from './Components/Login/Login'
import LandingPage from './Components/MinitwitterLandingpage/Landingpage.view'
import history from './History'
import NewUser  from "./Components/NewUser/Newuser.view";
import Menu from './Components/Menu/Menu.jsx'
import EditProfile from './Components/EditProfile/EditProfile' 
import UserProfile from './Components/UserProfile/UserProfile'
import Timeline from './Components/Timeline/Timeline'
import FollowersFollowings from './Components/FollowersFollowings/FollowersFollowings'







export default class Routes extends Component {

    constructor(props) {
        super(props)
    
        this.state = {

            id:0,
            username:'',
            firstname:'',
            lastname:'',

        }

    }
    loggedUserData=data=>{
        console.log('parent router-->',data)
        this.setState({
            id:data.id,
            username:data.username,
            firstname:data.firstname,
            lastname:data.lastname
        })
    }



    components(){

        const{firstname,lastname,username,id}=this.state
        const userData={
            username:username,
            firstname:firstname,
            lastname:lastname,
            id:id
        }

        return (
            <Fragment>

                
                    
                        <Menu loggedUserData={this.loggedUserData}/>
                          <Switch>


                            <Route exact path={`/minitwitter/newuser/:id`} 
                                   component={NewUser}/>

                            <Route exact path={`/minitwitter/userprofile/edit/:id`} 
                                    render={props=>(<EditProfile {...props}/>) }
                            />
                            
                            <Route exact path={`/minitwitter/userprofile/:id`} 
                                    render={props=>(<UserProfile {...props} 
                                    loggedUserId={this.state.id}
                                    loggedUserName={this.state.username} 
                                    />)} 
                            />

                            <Route exact path="/minitwitter/timeline/" 
                                   render={props=>(<Timeline {...props}
                                   loggedUserId={this.state.id}

                            />)}

                            />

                            <Route exact path={`/minitwitter/:requestOf/:id`} 
                                    render={props=>(<FollowersFollowings {...props}
                                    userData={userData}
                                    loggedUserId={this.state.id}
                                    
                            />)} />

                            <Route exact path={`/minitwitter/:requestOf/:id`} 
                                    render={props=>(<FollowersFollowings {...props}
                                    userData={userData}
                                    
                            />)} />


                        </Switch>
                            
                
        
    
            </Fragment>);
    }
    
    
    render() {
        return (
            <Fragment>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" exact component={LandingPage} /> 
                    <Route exact path="/minitwitter/login/" component={Login} />
                    <Route exact path="/minitwitter/registration/" component={Registration} />
                    {this.components()}
                    
                </Switch>
            </Router>
            </Fragment>
        )
    }
}


