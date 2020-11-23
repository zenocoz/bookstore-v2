import React from "react"
import { ListGroup } from "react-bootstrap"
import CommentsList from "./CommentsList"

class CommentArea extends React.Component {
  state = {
    comments: [],
    elementID: "",
    loading: true,
  }

  componentDidMount = async () => {
    console.log("There are no comments")
    console.log(this.state.elementID)
  }

  fetchComments = async () => {
    try {
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
      this.setState({ comments: comments_, loading: false })
    } catch (e) {
      console.log("error happened, that's life", e)
      this.setState({ loading: false })
    }
  }

  handleId = (id) => {
    this.setState({ elementId: id })
    console.log(id)
  }
  // componentDidUpdate = () => {
  //   console.log("CommentArea updated")

  // }

  render() {
    return (
      <ListGroup>
        COMMENTS
        <CommentsList handleId={this.handleId} />
      </ListGroup>
    )
  }
}

export default CommentArea
