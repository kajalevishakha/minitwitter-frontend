
import React, { Component } from 'react'
import './EditProfile.css'
import {withRouter} from 'react-router-dom'
export class EditProfilePage extends Component {


    constructor(props) {
        super(props)

        const{firstname,lastname,username,bio,id}=this.props.userData
    
        this.state = {

            firstname:firstname,
            lastname:lastname,
            username:username,
            bio:bio,
            id:id,
            profilPic:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fthenounproject.com%2Fterm%2Fuser-profile%2F&psig=AOvVaw247_pi6gGIHLZ7XGrYQfPf&ust=1601350497050000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjxz9f1iuwCFQAAAAAdAAAAABAD",
            showPic:false
             
        }
        console.log('props of view-edit profile-->',this.props)
    }

    updateInputValue = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      }


    handleSave = (event) => {

        const{saveEdits}=this.props
        const{bio}=this.state
        const formData=new FormData();
        if(this.state.profilPic.name!==undefined){

          formData.append("profile_picture",this.state.profilPic,this.state.profilPic.name)
        }
      
        formData.append("bio",bio)
        saveEdits(formData)
      }
    
      selectImageHandler=event=>{

        console.log('image selected--',event.target.files[0])
        this.setState({profilPic:event.target.files[0],showPic:true})
      }
      
    

    render() {

        const{firstname,lastname,username,bio,id,showPic}=this.state
        return (
            <div>
              <div className="Profile-">
                <div id="label-upper"> Edit Profile </div>
                <div className="profileForm">

                  <form>
                    <label id="label-create-edit-profile">First Name</label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={firstname}
                      onChange={this.updateInputValue}
                    ></input>
      
                    <label id="label-create-edit-profile">Last Name</label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={lastname}
                      onChange={this.updateInputValue}
                    ></input>
      
                    <label id="label-create-edit-profile">User Name</label>
                    <input
                      type="text"
                      id="userName"
                      name="username"
                      maxLength="100"
                      value={username}
                    ></input>
      
                    <label id="label-create-edit-profile">Bio</label>
                    <input
                      type="text"
                      id="bio-"
                      name="bio"
                      value={bio}
                      onChange={this.updateInputValue}
                    ></input>

                    <label id="upload-profile"> Choose Profile Photo
                    <input type='file'
                      onChange={this.selectImageHandler}
                      id="input-img"
                    >
                    </input>
                    </label>{showPic===true ? <div id="img-upload-msg">Selected!</div>:null}
                    <br></br>
                    <button type="button" onClick={this.handleSave}>
                      SAVE
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
    }
}

export default withRouter(EditProfilePage)
