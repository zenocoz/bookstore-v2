import React from "react";
import { Badge } from "react-bootstrap";

function MyBadge(props) {
	return <Badge variant={props.color}>${props.text}</Badge>;
}

export default MyBadge;
