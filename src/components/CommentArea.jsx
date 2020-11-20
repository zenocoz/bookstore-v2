import React from "react"
import { ListGroup } from "react-bootstrap"
import CommentsList from "./CommentsList"
import AddComment from "./AddComment"

class CommentArea extends React.Component {
  state = {}

  render() {
    return (
      <ListGroup>
        COMMENTS
        <CommentsList />
        <AddComment id={this.props.id} />
      </ListGroup>
    )
  }
}

export default CommentArea
