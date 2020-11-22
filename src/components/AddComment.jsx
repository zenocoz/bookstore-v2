import React from "react"
import {Alert, Button, Col, Form, Row, Spinner} from "react-bootstrap"
import {ThemeConsumer} from "react-bootstrap/esm/ThemeProvider"
import CommentsList from "./CommentsList"

class AddComment extends React.Component {
  state = {
    comment: {
      comment: "",
      rate: "0",
      elementId: this.props.book_id,
    },
    errMessage: "",
    loading: false,
  }

  updateComment = (e) => {
    let comment_ = {...this.state.comment} // creating a copy of the current state
    let currentId = e.currentTarget.id // 'name', 'phone', etc.
    comment_[currentId] = e.currentTarget.value

    // //reservation['name'] --> reservation.name = 'S'
    // //reservation['phone'] --> reservation.phone = '3'
    this.setState({comment: comment_})
  }

  submitComment = async (e) => {
    e.preventDefault()
    this.setState({loading: true})
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          method: "POST",
          body: JSON.stringify(this.state.comment),

          headers: new Headers({
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2YTdjNDk4MzViMDAwMTc1ODRmOWMiLCJpYXQiOjE2MDYwNTYzMTQsImV4cCI6MTYwNzI2NTkxNH0.3NxdfiG5NWnzrociARu35Zt_oSH-o-JEziOiEw7jUko",
          }),
        }
      )
      if (response.ok) {
        alert("Comment entered!")
        this.setState({
          comment: {
            comment: "",
            rate: "",
          },
          errMessage: "",
          loading: false,
        })
      } else {
        console.log("an error occurred")
        let error = await response.json()
        this.setState({
          errMessage: error.message,
          loading: false,
        })
      }
    } catch (e) {
      console.log(e) // Error
      this.setState({
        errMessage: e.message,
        loading: false,
      })
    }
  }

  render() {
    // return <CommentsList>rate="BUONO"</CommentsList>

    return (
      <div>
        {this.state.errMessage && (
          <Alert variant="danger">
            We encountered a problem with your request
            {this.state.errMessage}
          </Alert>
        )}
        {/* {this.state.loading && (
          <div className="d-flex justify-content-center my-5">
            Loading Comments
            <div className="ml-2">
              <Spinner animation="border" variant="success" />
            </div>
          </div>
        )} */}
        <Form className="w-100 mb-5" onSubmit={this.submitComment}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="comment">Comment</Form.Label>
                <Form.Control
                  type="text"
                  name="comment"
                  id="comment"
                  placeholder="Leave a comment here"
                  value={this.state.comment.comment}
                  onChange={this.updateComment}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="rate">rate</Form.Label>
                <Form.Control
                  type="number"
                  name="rate"
                  id="rate"
                  placeholder="Your rate"
                  required
                  value={this.state.comment.rate}
                  onChange={this.updateComment}
                />
              </Form.Group>
            </Col>
            {/* <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="elementId"></Form.Label>
                <Form.Control
                  type="text"
                  name="elementId"
                  id="elementId"
                  placeholder="ID"
                  value={this.props.book_id}
                  onChange={this.updateComment}
                />
              </Form.Group>
            </Col> */}
          </Row>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    )
  }
}

export default AddComment
