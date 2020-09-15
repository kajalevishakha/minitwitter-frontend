import React, { Component } from 'react'
import axios from 'axios'


export class GetFollowingsAPI extends Component {


    componentDidMount(){

        const id=this.props.id

        console.log("id in get following api--",this.props)
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("token"),
          };
          axios
            .get("http://127.0.0.1:8020/minitwitter/users/" + id + "/followings/", {'id': id,})
            .then((response) => {
              console.log("followings api response -->", response.data);
              this.props.returnResponse(response)
            })
            .catch((error) => {
                this.props.errorCode(error.response["status"])
           
            });

    }


    render() {
        return (
            <div/>
        )
    }
}

export default GetFollowingsAPI
