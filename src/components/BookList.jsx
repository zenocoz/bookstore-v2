import React from "react"
import SingleBook from "./SingleBook"
import {Container, Row, Col} from "react-bootstrap"
import {useState} from "react"
import CommentArea from "./CommentArea"

const BookList = (props) => {
  let clickedColor = "green"

  const handleSelect = (book) => {
    book.props.clicked = clickedColor
    console.log(props.test)
  }

  return (
    <Row>
      {props.books.slice(0, 12).map((book) => (
        <SingleBook
          handleId={props.handleId}
          onClicked={() => handleSelect(book)}
          clicked={null}
          key={book.asin}
          singleBook={book}
        />
      ))}
    </Row>
  )
}

export default BookList
