import React from "react"
import {ListGroup} from "react-bootstrap"
import CommentsList from "./CommentsList"
import IdManager from "./IdManager"

class CommentArea extends React.Component {
  state = {
    comments: [],
    elementID: this.props.id,
    loading: true,
  }

  componentDidMount = async () => {
    console.log("There are no comments")
    this.setState({ elementID: this.props.book_id })
    this.fetchComments()
  }

  fetchComments = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + this.elementID,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2YTdjNDk4MzViMDAwMTc1ODRmOWMiLCJpYXQiOjE2MDYwNTYzMTQsImV4cCI6MTYwNzI2NTkxNH0.3NxdfiG5NWnzrociARu35Zt_oSH-o-JEziOiEw7jUko",
          }),
        }
      )
      let comments_ = await response.json()
      console.log(comments_)
      this.setState({comments: comments_, loading: false})
    } catch (e) {
      console.log("error happened, that's life", e)
      this.setState({loading: false})
    }
  }

  // componentDidUpdate = () => {
  //   console.log("CommentArea updated")

  // }

  render() {
    return (
      <ListGroup>
        COMMENTS
        <CommentsList />
        {/* <CommentsList handleId={this.handleId} /> */}
      </ListGroup>
    )
  }
}

export default CommentArea
