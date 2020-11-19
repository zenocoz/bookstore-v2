import React from "react";
import { Alert } from "react-bootstrap";

function WarningSign(props) {
	return (
		<div>
			<Alert variant={"danger"}>
				There is no book contains {props.text}
			</Alert>
		</div>
	);
}

export default WarningSign;
