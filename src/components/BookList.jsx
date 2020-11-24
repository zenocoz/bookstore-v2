import React from "react"
import SingleBook from "./SingleBook"
import { Container, Row, Col } from "react-bootstrap"
import { useState } from "react"
import CommentArea from "./CommentArea"

const BookList = (props) => {
  // const { books } = props.books;

  // const [selected, setSelected] = useState(false);
  // let clictedColor = selected ? "green" : "white";

  let clickedColor = "green"
  const handleSelect = (book) => {
    book.props.clicked = clickedColor
    // setSelected(!selected);
  }
  return (
    // {console}

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
