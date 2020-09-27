import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import API_Calls from '../../APIs/API'
import EditProfilePage from './EditProfile.view'

export class EditProfile extends Component {

    constructor(props) {
        super(props)
    
        const{id}=this.props.match.params
        this.state = {

            firstname:'',
            lastname:'',
            username:'',
            bio:null,
            id:id,
            shouldCallUI:false,
             
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
                shouldCallUI:true
              })
        })
        .catch(code=>{

            if (code === 504 || code===401 || code===400) {
                this.props.history.push("/");
              }

        })
    }


    saveBio=bio=>{

        const{id}=this.state
        const userData={
            bio:bio,
            id:id
        }
        console.log('edited bio in parent edit profile',bio)
        API_Calls.editProfileAPI(userData).then(status=>{
            console.log('status of edit api--',status)
            if(status===200){
                this.props.history.push('/minitwitter/userprofile/'+id)
            }
        })
        .catch(err=>{
            console.log(err)
            alert('changes not saved!')
        })
    }


    
    render() {
        const{firstname,lastname,username,bio,id,shouldCallUI}=this.state
        const userData={
            firstname:firstname,
            lastname:lastname,
            username:username,
            bio:bio,
            id:id
        }
        
        return (
            <div>
                
                {
                    shouldCallUI===true ?
                    <EditProfilePage userData={userData}
                                    saveBio={this.saveBio}
                                    setProfilePic={this.setProfilePic}
                    />:
                    null

                }
                
                
                
            </div>
        )
    }
}

export default withRouter(EditProfile)
