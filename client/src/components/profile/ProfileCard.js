import React, { Component } from 'react';
import avatar from '../../img/avatar.png';
import { Link } from 'react-router-dom';

class ProfileCard extends Component {
  constructor() {
    super();
    this.state = {
      follow: false
    };
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  handleFollow() {
    this.setState({follow: true});
  }

  handleUnfollow() {
    this.setState({follow: false});
  }
  
  render() {
    return (
      <div className="d-flex card profile-card-outer">
        <div style={{marginTop: "10px"}}>
          <Link to="/profile"><img className="rounded-circle profile-card-avatar" src={avatar} alt="avatar"/></Link>
        </div>
        <div className="profile-card-truncate-text">
          Alexander Joe
        </div>
        <div className="profile-card-card-footer">
          {!this.state.follow && <button className="btn profile-card-button-follow" onClick={this.handleFollow}>Follow</button>}
          {this.state.follow && <button className="btn profile-card-button-unfollow" onClick={this.handleUnfollow}>Following</button>}
        </div>
      </div>
    )
  }
}

export default ProfileCard;