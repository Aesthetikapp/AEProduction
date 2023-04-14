import { Outlet } from "react-router-dom";

const Msg = () => {
	console.log("ScrollToTop msg", window.location.hostname);

	return (
		<>
			{window.location.hostname != "aesthetik.app" ? (
				<div id="testmsg" className="testmsg">
					&nbsp;
				</div>
			) : (
				<></>
			)}
			{/* <div id="testmsg" className="testmsg">
				&nbsp;
			</div> */}
			<Outlet />
		</>
	);
};
export default Msg;
