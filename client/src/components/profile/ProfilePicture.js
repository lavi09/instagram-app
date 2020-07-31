import React, { Component } from 'react';
import './profilepicture.css';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { addPicture,deletePicture } from "../../actions/authActions";


class profilepicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      showDefault: true,
      fileUploadState: "",
      //data:new FormData()
      errors: {},
    };
    this.uploadImage = this.uploadImage.bind(this);
    this.inputReference = React.createRef();
    //this.onClick = this.onClick.bind(this);
  }

  uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "instagram");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/instagramteam/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const result = await res.json();
    const newAvatar = {
      avatar: result.secure_url,
    };

    this.props.addPicture(newAvatar, this.props.history);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ fileUploadState: e.target.value });
  };
  onClick = (e) => {
    this.inputReference.current.click();
  };
  onRemoveImage(history) {
    this.props.deletePicture(history);
  }
  render() {
    if (!this.props.change) {
      return null;
    }
    const { errors } = this.state;
    return (
      <div className="firstset">
        <div className="secondsetupload">
          <div className="thirdset">
            <div
              className="containerset"
              style={{ height: "220px", width: "400px" }}
            >
              <div
                style={{
                  marginLeft: "102px",
                  marginTop: "30px",
                  marginBottom: "20px",
                  borderTopRightRadius: "15px",
                  fontSize: "20px",
                }}
              >
                Change Profile Photo
              </div>
              <hr style={{ marginBottom: "0" }} />

              <div>
                <input
                  type="file"
                  hidden
                  ref={this.inputReference}
                  onChange={this.uploadImage}
                />
                <button
                  onClick={this.onClick}
                  className="w3-button w3-block"
                  style={{
                    color: "blue",
                  }}
                >
                  Upload photo
                  {this.state.fileUploadState}
                </button>
              </div>
              <hr style={{ marginTop: "0", marginBottom: "0" }} />
              <button
                onClick={this.onRemoveImage.bind(
                  this,
                  this.props.history
                )}
                className="w3-button w3-block"
                style={{
                  color: "red",
                }}
              >
                Remove current photo
              </button>
              <hr style={{ marginTop: "0", marginBottom: "0" }} />
              <button
                onClick={this.props.close}
                style={{
                  borderBottomRightRadius: "15px",
                  borderBottomLeftRadius: "15px",
                }}
                className="w3-button w3-block"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  errors: state.errors
});
export default connect(mapStateToProps, { addPicture,deletePicture })(withRouter(profilepicture));
