import React from "react"
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap"
import SingleBook from "./SingleBook"

class AddComment extends React.Component {
  state = {
    reservation: {
      name: "",
      phone: "",
      id: "",
    },
    errMessage: "",
    loading: false,
  }

  handleId = (book) => {
    this.setState({ id: book.asin })
  }

  updateReservationField = (e) => {
    let reservation = { ...this.state.reservation } // creating a copy of the current state
    let currentId = e.currentTarget.id // 'name', 'phone', etc.

    if (currentId === "smoking") {
      reservation[currentId] = e.currentTarget.checked
    } else {
      reservation[currentId] = e.currentTarget.value // e.currentTarget.value is the keystroke
    }
    //reservation['name'] --> reservation.name = 'S'
    //reservation['phone'] --> reservation.phone = '3'
    this.setState({ reservation: reservation })
  }

  submitReservation = async (e) => {
    let endpoint = "https://striveschool-api.herokuapp.com/api/comments/"
    e.preventDefault()
    this.setState({ loading: true })
    try {
      let response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          ...this.state.reservation,
          elementId: this.props.id,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2YTdjNDk4MzViMDAwMTc1ODRmOWMiLCJpYXQiOjE2MDU4MDYwMjAsImV4cCI6MTYwNzAxNTYyMH0.jy3raNKX96CLfQFVdGzus3H7t5h_EgZxNialgpNW0fI",
        }),
      })
      if (response.ok) {
        alert("Reservation saved!")
        this.setState({
          reservation: {
            name: "",
            phone: "",
            numberOfPersons: "1",
            smoking: false,
            dateTime: "",
            specialRequests: "",
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
            Reserving your table, please wait
            <div className="ml-2">
              <Spinner animation="border" variant="success" />
            </div>
          </div>
        )}
        <Form className="w-100 mb-5" onSubmit={this.submitReservation}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="name">Comment</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  value={this.state.reservation.name}
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
                  name="phone"
                  id="phone"
                  placeholder="Your phone"
                  required
                  value={this.state.reservation.phone}
                  onChange={this.updateReservationField}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="id">
                  {/* <SingleBook> </SingleBook> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id="id"
                  placeholder="ID"
                  value={this.state.reservation.id}
                  onChange={this.updateReservationField}
                  required
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
