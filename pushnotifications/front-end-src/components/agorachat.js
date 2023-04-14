// App.js
import React, { Component } from "react";
import { EaseApp } from "agora-chat-uikit";
// import "./App.scss";
import { EaseChat } from "agora-chat-uikit";

const addListen = (res) => {
	if (res.isLogin) {
		const WebIM = EaseChat.getSdk();
		WebIM.conn.addEventHandler("testListen", {
			onTextMessage: () => {},
			onError: () => {},
			onConnected: () => {
				console.log("connected");
			},
		});
	}
};


const chat = () => {
	return (
		<div>
			<EaseChat
				appkey={"61729011#973156"}
				username={"lakumnareshgmailcom"}
				agoraToken={
					"007eJxTYAhYkqdtWRz9ePa6t2vq0qIL40zUprY/FMvgn1Y/LXPqBAcFBsO0ZAvTVHNjM0MLIxNTS0tLEwtDEyNjEwNz8xTzFCODQ5yJyQXiDAyM52cwMDKwAjETA4jPwAAAEN8alw=="
				}
				// to={"lakumnareshgmailcom"}
				// successLoginCallback={addListen}
			/>
		</div>
	);
};

class App extends Component {
	render() {
		return (
			<div className="container">
				{/* <EaseApp
					// The App key for your chat project
					appkey="61729011#973156"
					// The user ID of the current user
					username="varunlexicongmailcom"
					// The <Vg k="COMPANY" /> token
					agoraToken="007eJxTYEiyi9DTTd9UOEGC8aCuw/oJqgZLYvZfd5t9eM+fppNz7vkoMBimJVuYppobmxlaGJmYWlpamlgYmhgZmxiYm6eYpxgZlHIkJheIMzAsX5jDxMjAysDIwMQA4jMwAAAMnhse"
				/> */}
				<EaseApp
					appkey="61729011#973156"
					username="lakumnareshgmailcom"
					agoraToken="007eJxTYHBlmvEhU97JM+SBcezlxgi/vAudGkdL3oi9tlvpe4/J7ogCg2FasoVpqrmxmaGFkYmppaWliYWhiZGxiYG5eYp5ipGBKl9icoE4AwPXQj5GRgZWBkYGJgYQn4EBAOhGGVg="
					successLoginCallback={addListen}
					// to={"lakumnareshgmailcom"}
					// successLoginCallback={addListen}
				/>
			</div>
		);
	}
}

export default App;
