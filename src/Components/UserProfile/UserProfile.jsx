import React, { Component } from 'react'
import UserProfilePage from './UserProfile.view'
import API_Calls from './../../APIs/API'
import {withRouter} from 'react-router-dom'

export class UserProfile extends Component {


    constructor(props) {
        super(props)

        console.log('parent props--',this.props)
        const{id}=this.props.match.params
        console.log('here id in parent profile--',id)
    
        this.state = {

             shouldCallUI:false,
             tweets:[],
             firstname:'',
             lastname:'',
             username:'',
             id:id,
             bio:'',
             test:{}
        }
    }

    


     static call=id=>{

        return API_Calls.fetchProfileAPI(id).then(response=>{
            console.log('respose of profile api in --',response)
            return response
        })
        .catch(code=>{

            if (code === 504 || code===401 || code===400) {
                // this.props.history.push("/");
              }
              return code

        })

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

        const{shouldCallUI,test,firstname,lastname,username,tweets}=this.state

        return (
            <div>
                {
                    firstname!== '' ?
                    <UserProfilePage 
                    userData={this.state}
                    loggedUserName={this.props.loggedUserName}
                    
                    />
                    :
                   null
                }
                
            </div>
        )
    }
}

export default withRouter(UserProfile)
