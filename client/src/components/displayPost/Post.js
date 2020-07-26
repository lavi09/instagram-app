import React, { Component } from "react";
import "./post.css";
import { Link } from "react-router-dom";
import avatar from "../../img/avatar.png";
import AddComment from "./AddComment";
import Comments from "./Comments";
import { connect } from "react-redux";
import { getPost } from "../../actions/postActions";
import Moment from "react-moment"; 

class Post extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const {post} = this.props.post;

    return (
      <div className='parent'>
        <div className='child'>
          <span className='close'>
            <button onClick={this.goBack}>
              <i className='fa fa-times' aria-hidden='true'></i>
            </button>
          </span>

          <div className='container-post'>
            <img
              className='size-of-image'
              src={post.image}
              // width="600"
              // height="600"
              // src='https://images.unsplash.com/photo-1462216589242-9e3e00a47a48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=966&q=80'
            />

            <div className='style d-none d-xl-block d-md-none d-lg-none d-sm-none '>
              <Link to='#'>
                <img className='avatar-icon' src={post.avatar} alt='Avatar' />
              </Link>
              <Link to='' className='name-of-account'>
                {post.name}
              </Link>
              <hr style={{ marginBottom: "10px" }} />

              {/*  post description & comments on post */}
              <div className='comment-wrapper'>
                <section className='row'>
                  {/* <!-- post description start--> */}

                  <div className='col-lg-2'>
                    <Link to='#'>
                      <img className='avatar-icon' src={post.avatar} alt='Avatar' />
                    </Link>
                  </div>
                  <div className='col-lg-10'>
                    <div id='col-space'>
                      <Link className='handlename-post' to=''>
                        {post.name}
                      </Link>
                      <span className='textStyle-comment'>
                        &nbsp; {post.text}
                      </span>
                    </div>
                  </div>
                  {/* <!-- post description end--> */}

                  {/* comments on post */}
                  <Comments comments={post.comments}/>
                </section>
              </div>

              <div id='footer'>
                <hr />
                <section>
                  <Link to='' className='delete-post'>
                    <i
                      className='fa fa-heart-o'
                      style={{ fontSize: "1.5em" }}
                      aria-hidden='true'
                    ></i>
                  </Link>
                  <Link to='' className='delete-post'>
                    <i
                      style={{ fontSize: "1.5em" }}
                      className='fa fa-comment-o'
                      aria-hidden='true'
                    ></i>
                  </Link>

                  <Link to='' className='delete-post'>
                    <i
                      style={{ fontSize: "1.5em" }}
                      className='far fa-user-circle'
                      aria-hidden='true'
                    ></i>
                  </Link>
                  <Link to='' className='delete-post'>
                    <i
                      style={{ fontSize: "1.5em" }}
                      className='fa fa-bookmark-o'
                      aria-hidden='true'
                    ></i>
                  </Link>

                  {/* delete post */}
                  <Link to='' className='delete-post'>
                    <i
                      style={{
                        fontSize: "1.5em",
                        float: "right",
                        padding: "5px",
                        marginTop: "-3px",
                        fontWeight: "lighter",
                      }}
                      className='fa fa-trash'
                      aria-hidden='true'
                    ></i>
                  </Link>

                  <div className='textStyle-date'>
                    <div
                      style={{
                        fontWeight: "600",
                        fontSize: "1.4em",
                        color: "black",
                      }}
                    >
                      21 Likes
                    </div>
                    <Moment format="D MMM YYYY">{post.date}</Moment>
                  </div>
                </section>
                <hr />
                <AddComment />
                
              </div>
            </div>
          </div>

          {/* section only for mobiles*/}

          <div id='wrapper'>
            <section className='section-only-mobile d-xl-none'>
              <Link to='' className='delete-post'>
                <i
                  style={{ fontSize: "1.5em" }}
                  className='fa fa-heart-o'
                  aria-hidden='true'
                ></i>
              </Link>
              <Link to='' className='delete-post'>
                <i
                  style={{ fontSize: "1.5em" }}
                  className='fa fa-comment-o'
                  aria-hidden='true'
                ></i>
              </Link>

              <Link to='' className='delete-post'>
                <i
                  style={{ fontSize: "1.5em" }}
                  className='far fa-user-circle'
                  aria-hidden='true'
                ></i>
              </Link>
              <Link to='' className='delete-post'>
                <i
                  style={{ fontSize: "1.5em" }}
                  className='fa fa-bookmark-o'
                  aria-hidden='true'
                ></i>
              </Link>

              {/* delete post */}
              <Link to='' className='delete-post'>
                <i
                  style={{
                    fontSize: "1.5em",
                    padding: "5px",
                    marginTop: "-3px",
                    fontWeight: "lighter",
                  }}
                  className='fa fa-trash'
                  aria-hidden='true'
                ></i>
              </Link>

              <p className='textStyle-date'>
                MARCH 24 &nbsp; <span>21 Likes</span>
              </p>
              <AddComment />
              
            </section>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
