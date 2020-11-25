import React from "react"
import AddComment from "./AddComment"
import {ListGroup, Spinner, InputGroup, FormControl} from "react-bootstrap"

class CommentsList extends React.Component {
  state = {
    comments: [],
    loading: true,
    id: this.props.book_id,
  }

  componentDidMount = async () => {
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
      this.setState({comments: comments_, loading: false})
    } catch (e) {
      console.log("error happened, that's life", e)
      this.setState({loading: false})
    }
  }

  handleSearch(query) {
    if (query) {
      let filteredArray = this.state.comments.filter((comment) =>
        comment.author.toLowerCase().includes(query.toLowerCase())
      )
      this.setState({comments: filteredArray})
    } else {
      // this.setState({comments: comments})
    }
  }

  render() {
    return (
      <div className="mb-5">
        <h2 className="text-center mb-3">COMMENTS</h2>
        <InputGroup className="mb-3 mt-4">
          <FormControl
            onKeyUp={(e) => this.handleSearch(e.target.value)}
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        {this.state.loading && (
          <div className="font-bold d-flex justify-content-center">
            <span>Fetching comments</span>
            <Spinner animation="border" variant="success" />
          </div>
        )}

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
