import React, { Component } from 'react'
import axios from 'axios'

export class UnfollowUserAPI extends Component {

componentDidMount(){


    axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: "token " + localStorage.getItem("token"),
      };
  
      const following_id = this.props.unfollowid;
      const id = this.props.logid;
  
      axios
        .delete(
          "http://127.0.0.1:8020/minitwitter/users/" +
            id +
            "/followings/" +
            following_id +
            "/",
          { id: id, following_id: following_id }
        )
        .then((response) => {
          console.log(response);
          this.props.returnResponse(response)
        })
        .catch((error) => {
          if (error.response["status"] === 406) {
            console.log("already unfollowed");
            // history.push("/minitwitter/following/");
          } else if (error.response["status"] === 400) {
            console.log("unfollowing yourself");
            // history.push("/minitwitter/userprofile/" + this.state.id);
          }
          else if (error.response["status"] === 401) {
              console.log("STATE Logged out");
            //   history.push("/");
            }
        });



}



    render() {
        return (
            <div/>
        )
    }
}

export default UnfollowUserAPI
