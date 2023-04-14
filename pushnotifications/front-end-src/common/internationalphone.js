import { React, forwardRef } from "react";
import { TextField } from "@material-ui/core";

const Internationalphone = (props, ref) => { 
	return (
		<TextField
			size="small"
			{...props}
			inputRef={ref}
			variant="outlined"
			inputProps={{ className: "form-control " }}
		/>
	);
};

export default forwardRef(Internationalphone);
