import axios from "axios";


function returnHeader(){
  return {
    "Content-Type": "application/json",
    Authorization: "token " + localStorage.getItem("token"),
  };
}

class Calls {
  constructor() {
    this.headers = returnHeader();
    
  }

//Function to call login api
  loginapi = (credentials) => {
    
    const name = credentials.username;
    const pass = credentials.password;

    return axios
      .post("http://127.0.0.1:8020/minitwitter/login/", {
        username: name,
        password: pass,
      })
      .then((response) => {
        // console.log("login-", response);

        if (response["status"] === 200) {
          localStorage.setItem("token", response.data.token);
        }
        this.headers=returnHeader();
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.status);
      });
  }

  //Function to call registration api
  registrationAPI = (userData) => {
    
    const { firstname, lastname, username, email, password } = userData;
    return axios
      .post("http://127.0.0.1:8020/minitwitter/users/", {
        first_name: firstname,
        last_name: lastname,
        email: email,
        username: username,
        password: password,
      })
      .then((response) => {
        //console.log("registration response-->", response);
        return response
      })
      .catch((error) => {
        return error.response["status"];
      });
  }

  //Function to call currentuser api
  currentUserAPI = () => {

    axios.defaults.headers = this.headers
    return axios
      .get("http://127.0.0.1:8020/minitwitter/current_user/")
      .then((response) => {
        //console.log("response of current user api -->", response);
        return response;
      })
      .catch((error) => {
        console.log('werr',error)
        return error
      });
  }

  //Function to call post tweet api
  postTweetAPI = (tweet) => {
    axios.defaults.headers = this.headers;

    return axios
      .post("http://127.0.0.1:8020/minitwitter/tweets/", { content: tweet })
      .then((response) => {
        //console.log("posting tweet -->", response);
        return response["status"];
      })
      .catch((error) => {
        return error["status"];
      });
    }

  //Function to call all users api
  fetchAllUsersAPI = () => {
    axios.defaults.headers = this.headers;
    return axios
      .get("http://127.0.0.1:8020/minitwitter/users/")
      .then((response) => {
        //console.log("response of all users api-->", response);
        return response;
      })
      .catch((error) => {
        
        return error["status"];
      });
  }

  //Function to call user profile api
  fetchProfileAPI = (id) => {
    axios.defaults.headers = this.headers;

    return axios
      .get(`http://127.0.0.1:8020/minitwitter/users/${id}/`)
      .then((response) => {
        //console.log("response of fetch profile api -->", response);
        return response;
      })
      .catch((error) => {
        return error["status"];
      });
  };

  //Function to call timeline api
  fetchTimelineAPI = (id) => {
    axios.defaults.headers =this.headers;
    return axios
      .get("http://127.0.0.1:8020/minitwitter/tweets/", { params:{list:'timeline'} })
      .then((response) => {
        //console.log("response of timeline-", response);
        return response;
      })
      .catch((error) => {
        return error.response["status"];
      });
  }

  //Function to call get followers api
  fetchFollowersAPI = (id) => {
    axios.defaults.headers = this.headers;
    return axios
      .get(`http://127.0.0.1:8020/minitwitter/users/${id}/follow/`,{params:{list:'followers'}})
      .then((response) => {
        //console.log("followers api response -->", response.data);
        return response;
      })
      .catch((error) => {
        return error.response["status"];
      });
  }

  //Function to call fetch followings api
  fetchFollowingsAPI = (id) => {
    console.log("id in get following api--", id);

    axios.defaults.headers = this.headers;
    return axios
    .get(`http://127.0.0.1:8020/minitwitter/users/${id}/follow/`,{params:{list:'followings'}})
      .then((response) => {
        //console.log("followings api response -->", response.data);
        return response;
      })
      .catch((error) => {
        return error.response["status"];
      });
  }

  //Function to call follow user api
  followUserAPI = (id) => {
    axios.defaults.headers = this.headers;

    return axios
      .post(`http://127.0.0.1:8020/minitwitter/users/${id}/follow/`, {
        following_id: id,
      })
      .then((response) => {
        //console.log("successfully followed", response);
        return response["status"];
      })
      .catch((error) => {
        console.log(error.response);
        return error.response["status"];
      });
  }

  //Function to call unfollow user api
  unfollowUserAPI = (userData) => {
    axios.defaults.headers = this.headers;

    const following_id = userData.unfollowid;
    const id = userData.logid;

    return axios
      .delete(
        `http://127.0.0.1:8020/minitwitter/users/${id}/unfollow/${following_id}/`
      )
      .then((response) => {
        
        return response["status"];
      })
      .catch((error) => {
        return error.response["status"];
      });
  }

  //Function to call search api
  searchAPI=searchValue=>{
    axios.defaults.headers = this.headers;
    return axios
    .get("http://127.0.0.1:8020/minitwitter/search/",{params:{search:searchValue}})
    .then(response=>{
      //console.log('response of search api--',response)
      return response
    })
    .catch(error=>{
      return error['status']
    })
  }

  //Function to call edit pofile api
  setProfilePicAPI= (profilePic,id) =>{
    axios.defaults.headers = this.headers;
    return axios
    .patch(`http://127.0.0.1:8020/minitwitter/users/${id}/`,profilePic)
    .then(response=>{
      //console.log('response of profile pic--',response)
      return response
    })
    .catch(error=>{
      return error['status']
    })
  }
}
const API_Calls = new Calls();
export default API_Calls;
