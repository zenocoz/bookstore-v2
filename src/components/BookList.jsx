import React from "react";
import SingleBook from "./SingleBook";
import { Row } from "react-bootstrap";
import { useState } from "react";

const BookList = (props) => {
	// const { books } = props.books;

	// const [selected, setSelected] = useState(false);
	// let clictedColor = selected ? "green" : "white";

	let clickedColor = "green";
	const handleSelect = (book) => {
		book.props.clicked = clickedColor;
		// setSelected(!selected);
	};
	return (
		// {console}
		<Row>
			{props.books.map((book) => (
				<SingleBook
					onClicked={() => handleSelect(book)}
					clicked={null}
					key={book.asin}
					singleBook={book}
				/>
			))}
		</Row>
	);
};

export default BookList;
