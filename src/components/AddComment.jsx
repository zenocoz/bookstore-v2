import React from "react"
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap"
import CommentsList from "./CommentsList"

class AddComment extends React.Component {
  state = {
    comment: {
      review: "",
      rating: "0",
    },
    errMessage: "",
    loading: false,
  }

  updateComment = (e) => {
    let comment = { ...this.state.comment } // creating a copy of the current state
    let currentId = e.currentTarget.id // 'name', 'phone', etc.
    comment[currentId] = e.currentTarget.value

    //reservation['name'] --> reservation.name = 'S'
    //reservation['phone'] --> reservation.phone = '3'
    this.setState({ comment: comment })
  }

  submitComment = async (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          method: "POST",
          body: JSON.stringify(this.state.comment),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      )
      if (response.ok) {
        alert("Comment entered!")
        this.setState({
          comment: {
            review: "",
            rating: "",
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
    // return <CommentsList>rating="BUONO"</CommentsList>

    return (
      <div>
        {this.state.errMessage && (
          <Alert variant="danger">
            We encountered a problem with your request
            {this.state.errMessage}
          </Alert>
        )}
        {this.state.loading && (
          <div className="d-flex justify-content-center my-5">
            Loading Comments
            <div className="ml-2">
              <Spinner animation="border" variant="success" />
            </div>
          </div>
        )}
        <Form className="w-100 mb-5" onSubmit={this.submitComment}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="name">Comment</Form.Label>
                <Form.Control
                  type="text"
                  name="comment"
                  id="comment"
                  placeholder="Your comment"
                  value={this.state.comment.review}
                  onChange={this.updateReservationField}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="phone">Rating</Form.Label>
                <Form.Control
                  type="number"
                  name="rating"
                  id="rating"
                  placeholder="Your rating"
                  required
                  value={this.state.comment.rating}
                  onChange={this.updateReservationField}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    )
  }
}

export default AddComment
