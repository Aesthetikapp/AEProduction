import React from "react";

const Logo = (props) => {
	return (
		<>
			{!props && (
				<a
					className="navbar-brand pl-n20"
					href="/"
					style={{ paddingLeft: "50px" }}
				>
					<img
						loading="lazy"
						src="../images/Aes2ALPHA.png"
						style={{ width: "43px", height: "47px" }}
						alt="..."
					></img>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<label
						className="f-fm fm-w7-s28 color-FF"
						style={{
							lineHeight: "35px",
							verticalAlign: "middle",
							cursor: "pointer",
						}}
					>
						Aesthetik
					</label>
				</a>
			)}
			{props.logo === "dark" && (
				<a
					className="navbar-brand d-flex align-items-center  px-lg-5"
					href="/"
				>
					<img
						loading="lazy"
						src="../images/AES6ALPHA.png"
						style={{ width: "43px", height: "47px" }}
						alt="..."
					></img>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<label
						className="f-fm fm-w7-s28 color-00"
						style={{
							lineHeight: "35px",
							verticalAlign: "middle",
							cursor: "pointer",
						}}
					>
						Aesthetik
					</label>
				</a>
			)}
			{props.logo === "dark-light" && (
				<a
					className="navbar-brand d-flex align-items-center  px-lg-5"
					href="/"
				>
					<img
						loading="lazy"
						src="../images/AES6ALPHA.png"
						style={{ width: "43px", height: "47px" }}
						alt="..."
					></img>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<label
						className="f-fm fm-w7-s28 color-FF"
						style={{
							lineHeight: "35px",
							verticalAlign: "middle",
							cursor: "pointer",
						}}
					>
						Aesthetik
					</label>
				</a>
			)}
		</>
	);
};

export default Logo;
