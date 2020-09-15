import React, { Component, Fragment } from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import LoginAPI from './LoginAPI'

export class RegistrationAPI extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             shouldCallLogin:false,
             id:0
        }
    }
    


    componentDidMount(){

        console.log('props of registration api-->',this.props)
        const{firstname,lastname,username,email,password}=this.props.userDetails
        

        axios
      .post("http://127.0.0.1:8020/minitwitter/users/", {
        first_name: firstname,
        last_name: lastname,
        email: email,
        username: username,
        password: password,
      }) 
      .then((response) => {
        console.log('registration response-->',response);
        this.setState({shouldCallLogin:true})
        
        this.props.returnResponse(response)
        this.setState({id:response.data.id})

      })
      .catch((error) => {
        console.log(error.response["status"]);

        const errorCode=error.response["status"]
        this.props.returnErrorCode(errorCode)
      });
    
    }
    getLoginResponse=data=>{
        console.log('Token from login-->',data)
        this.props.history.push("/minitwitter/newuser/" + this.state.id); //Rendering on next page
    }

    render(){
        const{username,password}=this.props.userDetails
        const loginDetails={
            username:username,
            password:password
        }
        return(
            <Fragment>
                {this.state.shouldCallLogin===true ?
                <LoginAPI loginDetails={loginDetails}
                          loginResponse={this.getLoginResponse}/>:
                null}
            </Fragment>
        )
    }

}

export default withRouter(RegistrationAPI)
