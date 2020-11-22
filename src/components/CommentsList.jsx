import React from "react"
import AddComment from "./AddComment"
import {ListGroup} from "react-bootstrap"

class CommentsList extends React.Component {
  state = {
    comments: [],
    loading: true,
    id: this.props.book_id,
  }

  componentDidMount = async () => {
    try {
      console.log(this.state.id)
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + this.state.id,
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

  render() {
    return (
      <div className="mb-5">
        <h2 className="text-center mb-3">COMMENTS</h2>

        {this.state.comments.map((comment, index) => (
          <ListGroup key={index}>
            <ListGroup.Item>
              Author: {comment.author}, comment: {comment.comment}, rating{" "}
              {comment.rate}
            </ListGroup.Item>
          </ListGroup>
        ))}
      </div>
    )
  }
}

export default CommentsList
