import React, { Component } from "react";
import {
	Container,
	InputGroup,
	DropdownButton,
	FormControl,
	Dropdown,
} from "react-bootstrap";
import BookList from "./BookList";

import history from "../data/history.json";

import WarningSing from "./WarningSign";
let allBooks = {
	history: require("../data/history.json"),
	fantasy: require("../data/fantasy.json"),
	horror: require("../data/horror.json"),
	romance: require("../data/romance.json"),
	scifi: require("../data/scifi.json"),
};

let userQuery = null;
class Home extends Component {
	state = {
		books: history,
	};

	handleSearch(query) {
		if (query) {
			let filteredArray = this.state.books.filter((book) =>
				book.title.toLowerCase().includes(query.toLowerCase())
			);
			this.setState({ books: filteredArray });
			userQuery = query;
		} else {
			this.setState({ books: history });
		}
	}
	render() {
		return (
			<Container className='mt-5'>
				<InputGroup className='mb-3 mt-4'>
					<DropdownButton
						as={InputGroup.Prepend}
						variant='outline-secondary'
						title='Dropdown'
						id='input-group-dropdown-1'>
						<Dropdown.Item href='#'>Action</Dropdown.Item>
					</DropdownButton>
					<FormControl
						onKeyUp={(e) => this.handleSearch(e.target.value)}
						aria-describedby='basic-addon1'
					/>
				</InputGroup>
				{this.state.books.length === 0 && (
					<WarningSing text={userQuery} />
				)}
				<BookList books={this.state.books} />
			</Container>
		);
	}
}

export default Home;
