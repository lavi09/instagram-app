import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import "./profile.css";
import Settings from "./Settings";
import Followers from "../follow/Followers";
import Following from "../follow/Following";
import { deleteAccount } from "../../actions/profileActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
// import NotFound from '../common/NotFound';
import ProfilePostItem from "./ProfilePostItem";
import { getUserPosts } from "../../actions/postActions";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showFollowers: false,
      showFollowing: false,
    };
  }
  showFollowersList = (e) => {
    this.setState({
      showFollowers: !this.state.showFollowers,
    });
  };
  showFollowingList = (e) => {
    this.setState({
      showFollowing: !this.state.showFollowing,
    });
  };
  showSettings = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };

  onDelete = (e) => {
    this.props.deleteAccount(this.props.history);
  };
  logoutUserHandle = (e) => {
    e.preventDefault();
    alert("Logging out..");
    this.props.history.push("/");
    this.props.logoutUser();
  };

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getUserPosts();
  }
  //  componentWillReceiveProps(nextProps) {
  //    if (
  //      nextProps.profile.profile === null &&
  //      this.props.profile.loading
  //    ) {
  //      this.props.history.push("/not-found");
  //    }
  //  }

  render() {
    let profileContent;
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;
    const { userPosts } = this.props.userPosts;
    console.log(userPosts);
    userPosts.map((post) => console.log(post));
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className='margin'>
          <div>
            <Link to=''>
              <img
                className='profile-photo'
                alt='profile-photo'
                src={user.avatar}
              />
            </Link>
          </div>
          <div className='d-flex flex-column space'>
            <h2 className='HandleName'>
              {user.name}
              <span>
                <Link
                  to='/edit-profile'
                  type='button'
                  className='btn profileButton'
                >
                  Edit profile
                </Link>
                <Link onClick={(e) => this.showSettings()}>
                  <i
                    style={{ fontSize: "1.5rem", color: "black" }}
                    className='fas fa-cog'
                  ></i>
                </Link>
                <Settings
                  show={this.state.show}
                  close={this.showSettings}
                  onDelete={this.onDelete}
                  onLogout={this.logoutUserHandle}
                />
              </span>
            </h2>
            <div className='textsize'>
              <span>
                <Link to='#'>
                  <b>2</b> posts
                </Link>
                &nbsp; &nbsp; &nbsp;&nbsp;
                {profile.followers.length > 0 ? (
                  <Link onClick={(e) => this.showFollowersList()}>
                    <b>{profile.followers.length}</b> followers
                  </Link>
                ) : (
                  <Fragment>
                    <b style={{ fontSize: "18px" }}>0</b>{" "}
                    <span style={{ fontSize: "18px" }}>followers</span>
                  </Fragment>
                )}
                <Followers
                  showFollowers={this.state.showFollowers}
                  close={this.showFollowersList}
                />
                &nbsp; &nbsp; &nbsp;
                {profile.followers.length > 0 ? (
                  <Link onClick={(e) => this.showFollowingList()}>
                    <b>{profile.following.length}</b> following
                  </Link>
                ) : (
                  <Fragment>
                    <b style={{ fontSize: "18px" }}>0</b>{" "}
                    <span style={{ fontSize: "18px" }}>following</span>
                  </Fragment>
                )}
                <Following
                  showFollowing={this.state.showFollowing}
                  close={this.showFollowingList}
                />
              </span>
            </div>
            <p style={{ marginTop: "20px" }} className='profileName'>
              {profile.handle}
            </p>
            <br />
            {/* rendered only if user has information */}

            {profile.bio && (
              <div
                style={{
                  wordBreak: "break-word",
                  marginTop: "-30px",
                  fontWeight: "400",
                  fontStyle: "Roboto, Helvetica, Arial, sans-serif",
                  fontSize: "16px",
                  marginBottom: "5px",
                }}
              >
                {profile.bio}
              </div>
            )}
            {profile.website && (
              <span>
                <a
                  href='https://www.youtube.com/'
                  style={{ color: "rgba(var(--fe0,0,55,107),1)" }}
                >
                  {profile.website}
                </a>
              </span>
            )}

            {/* Social network Links */}
            <span>
              {profile.social.facebook && (
                <a href={profile.social.facebook}>
                  <i className='fa fa-facebook-square'></i>
                </a>
              )}
              {profile.social.youtube && (
                <a href={profile.social.youtube}>
                  <i
                    className='fa fa-youtube-play youtube'
                    aria-hidden='true'
                  ></i>
                </a>
              )}
              {profile.social.twitter && (
                <a href={profile.social.twitter}>
                  <i className='fa fa-twitter twitter' aria-hidden='true'></i>
                </a>
              )}
            </span>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className='container'>
          {profileContent}
          <hr className='horizontalLine' />
          <div className='profileTabs icons'>
            <Link to=''>
              <i className='fa fa-picture-o' aria-hidden='true'>
                <span style={{ marginLeft: "5px", fontFamily: "sans-serif" }}>
                  POSTS
                </span>
              </i>
            </Link>
            <Link to='/create-post'>
              <i className='far fa-plus-square'>
                <span
                  style={{
                    marginLeft: "5px",
                    fontFamily: "sans-serif",
                  }}
                >
                  ADD POST
                </span>
              </i>
            </Link>
            <Link to=''>
              <i className='fa fa-bookmark-o' aria-hidden='true'>
                <span style={{ marginLeft: "5px", fontFamily: "sans-serif" }}>
                  SAVED
                </span>
              </i>
            </Link>
            <Link to=''>
              <i className='far fa-user-circle' aria-hidden='true'>
                <span style={{ marginLeft: "5px", fontFamily: "sans-serif" }}>
                  TAGGED
                </span>
              </i>
            </Link>
          </div>
          {userPosts.length > 0 ? (
            //  <Fragment>
            //    {userPosts.map(post => (
            //      <ProfilePostItem key={post._id} postItem={post} />
            //    ))} kkooo
            //  </Fragment>
            <Fragment>
              <section className='row hover-effect'>
                <ProfilePostItem posts={userPosts} />
              </section>
            </Fragment>
          ) : (
            <div className='HandleName' style={{ textAlign: "center" }}>
              {" "}
              No Posts Yet
            </div>
          )}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  userPosts: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  userPosts: state.post,
});
export default connect(mapStateToProps, {
  deleteAccount,
  logoutUser,
  getCurrentProfile,
  getUserPosts,
})(Profile);
