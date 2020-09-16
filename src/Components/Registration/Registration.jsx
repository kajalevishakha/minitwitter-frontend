import React, { Component, Fragment } from 'react'
import {withRouter} from 'react-router-dom'
import RegistrationPage from './Registration.view'
import API_Calls from './../../APIs/API'


export class Registration extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             username:'',
             firstname:'',
             lastname:'',
             email:'',
             password:''
        }
    }
    

    callRegistrationAPI=()=>{
        API_Calls.registrationAPI(this.state).then(response=>{
            console.log('response of registration api--',response)
            if(response===201){
                this.callLoginAPI()
            }
        })
        .catch(error=>{
            console.log('err',error)
            if(error===400 || error===401){
                alert('please provide valid credentials!')
            }
            else{
                alert('server issue!')
            }
        })
    }

    callLoginAPI=()=>{
        const{username,password}=this.state
        const loginCredentials={
            password:password,
            username:username
        }
        API_Calls.loginapi(loginCredentials).then(response=>{
            console.log('response of login api--',response)
            alert(`Hey {username}.. Registration Successful!`)
            this.props.history.push("/minitwitter/timeline/")
        })
        .catch(error=>{
            console.log('err of login api--',error)
            if(error===400 || error===401){
                alert('please provide valid credentials!')
            }
        })
    }


    userDetails=dataObject=>{
        console.log('details of constructor-->',dataObject)
        this.setState({
            username:dataObject.username,
            firstname:dataObject.firstname,
            lastname:dataObject.lastname,
            email:dataObject.email,
            password:dataObject.password
        },
        ()=>this.callRegistrationAPI())    

    }
    render() {
        return (
            <Fragment>
                <RegistrationPage 
                    userData={this.userDetails}
                
                />
            </Fragment>
        )
    }
}

export default withRouter(Registration)
