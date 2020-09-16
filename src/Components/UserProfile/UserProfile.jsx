import React, { Component } from 'react'
import UserProfilePage from './UserProfile.view'
import API_Calls from './../../APIs/API'
import {withRouter} from 'react-router-dom'

export class UserProfile extends Component {


    constructor(props) {
        super(props)

        const{id}=this.props.match.params
    
        this.state = {

             shouldCallUI:false,
             tweets:[],
             firstname:'',
             lastname:'',
             username:'',
             id:id,
             bio:''
        }
    }

    componentDidMount(){

        const{id}=this.state

        API_Calls.fetchProfileAPI(id).then(response=>{
            console.log('respose of profile api in menu--',response)
            this.setState({
                firstname: response.data.user["first_name"],
                lastname: response.data.user["last_name"],
                username: response.data.user["username"],
                bio: response.data["bio"],
                tweets:response.data.user.tweets,
                shouldCallUI:true
              })
        })
        .catch(code=>{

            if (code === 504 || code===401 || code===400) {
                this.props.history.push("/");
              }

        })
    }
    
    render() {

        const{shouldCallUI}=this.state

        return (
            <div>
                
                {
                    shouldCallUI===true ?
                    <UserProfilePage userData={this.state}
                    loggedUserName={this.props.loggedUserName}
                    
                    />:
                    null
                }
                
            </div>
        )
    }
}

export default withRouter(UserProfile)
