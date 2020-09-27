
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
            profilPic:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
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

        console.log('edited bio--',this.state.bio)
        this.props.saveBio(this.state.bio)
        
      }
    
      selectImageHandler=event=>{

        console.log('image selected--',event.target.files[0])
        this.setState({profilPic:event.target.files[0]})
      }
      uploadImgHandler=()=>{
        console.log('uploaded img--',this.state.profilPic.name)
        this.props.setProfilePic(this.state.profilPic)
        this.setState({showPic:true})
        
      }
    

    render() {

        const{firstname,lastname,username,bio,id,showPic}=this.state
        return (
            <div>
              <div className="Profile-">
                <div id="label-upper"> Edit Profile </div>
                <div className="profileForm">
                  {
                    showPic===true ?
                    <img src={this.state.profilPic.name } alt={'profile ic'}></img>:null
                  }
                  <input type='file'
                  onChange={this.selectImageHandler}
                  ></input>
                  <button onClick={this.uploadImgHandler}>Upload</button>
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
