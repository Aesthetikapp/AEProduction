import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./components/signUp";
import Home from "./components/home";
import Everyone from "./components/everyone";
import Business from "./components/business";
import Login from "./components/login";
import ForgotPassword from "./components/forgotpassword";
import EmailNotification from "./components/SignUpPages/emailnotification";
import Welcome from "./components/ProfileSetup/welcome";
import DoctorOrClinic from "./components/ProfileSetup/doctororclinic";
import ClinicName from "./components/ProfileSetup/clinicname";
import CreateBusiness from "./components/ProfileSetup/createbusiness";
import Personalprofile from "./components/ProfileSetup/personalprofile";
import AddDocument from "./components/ProfileSetup/adddocument";
import Payment from "./components/ProfileSetup/payment";
import Paymentdone from "./components/ProfileSetup/paymentdone";
import Subscribe from "./components/ProfileSetup/subscribe";
import DashBoard from "./components/DashBoard/dashboard";
import Treatments from "./components/Treatments/treatment";
import NewTreatment from "./components/Treatments/newtreatment";
import Payments from "./components/Settings/payments";
import Setting from "./components/Settings/setting";
import Subscription from "./components/Settings/subscription";
import ManageTeam from "./components/Settings/manageteam";
import Profile from "./components/Settings/profile";
import Analytics from "./components/Analytics/analytics";
import Appointments from "./components/Appointments/appointments";
import Patients from "./components/Patients/patients";
import Notification from "./components/Notifications/notification";
import Accept from "./components/Notifications/accept";
import Error from "./components/error";
import Sumsub from "./components/sumsub";
import Stripepayment from "./components/stripepayment";
import Logout from "./components/logout";
import Businessrequest from "./common/request";
import Inviteaccept from "./components/ProfileSetup/inviteaccept";
import Resetpassword from "./components/ProfileSetup/resetpassword";
import Onboardingrefresh from "./components/ProfileSetup/onboardingrefresh";
import Patientresetpassword from "./components/ProfileSetup/patient_resetpassword";
import Sumsuberror from "./components/ProfileSetup/sumsubstatuspage";
import Thankyou from "./components/ProfileSetup/thankyou";
import ThirdPartyLogin from "./components/thirdpartylogin";
import Privacypolicy from "./components/privacypolicy";
import Msg from "./components/Msg";
import { useEffect } from "react";
import Questions from "./components/questions/question";

function App() {
	function ScrollToTop() {
		const { pathname } = useLocation();
		useEffect(() => {
			window.scrollTo(0, 0);
		}, [pathname]);
		return null;
	}
	return (
		<>
			<BrowserRouter>
				<ScrollToTop />
				{/* <Msg></Msg> */}
				<Routes>
					<Route path="/" element={<Msg />}>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/home" element={<Home />} />
						<Route exact path="/everyone" element={<Everyone />} />
						<Route exact path="/business" element={<Business />} />
						<Route exact path="/error" element={<Error />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/logout" element={<Logout />} />
						<Route exact path="/question" element={<Questions />} />
						<Route exact path="/forgotpassword" element={<ForgotPassword />} />
						<Route exact path="/signup/:signupstate" element={<SignUp />} />
						<Route exact path="/welcome/:userid" element={<Welcome />} />
						<Route exact path="/doctororclinic" element={<DoctorOrClinic />} />
						<Route exact path="/clinicname" element={<ClinicName />} />
						<Route exact path="/createbusiness" element={<CreateBusiness />} />
						<Route
							exact
							path="/personalprofile"
							element={<Personalprofile />}
						/>
						<Route exact path="/adddocument" element={<AddDocument />} />
						<Route exact path="/payment" element={<Payment />} />
						<Route exact path="/stripepayment" element={<Stripepayment />} />
						<Route exact path="/subscribe" element={<Subscribe />} />
						<Route exact path="/dashboard" element={<DashBoard />} />
						<Route exact path="/emailnotify" element={<EmailNotification />} />
						<Route exact path="/treatments" element={<Treatments />} />
						<Route exact path="/newtreatment" element={<NewTreatment />} />
						<Route exact path="/payments" element={<Payments />} />
						<Route exact path="/setting" element={<Setting />} />
						<Route exact path="/sumsuberror" element={<Sumsuberror />} />
						<Route exact path="/subscription" element={<Subscription />} />
						<Route exact path="/manageteam" element={<ManageTeam />} />
						<Route exact path="/profile" element={<Profile />} />
						<Route exact path="/analytics" element={<Analytics />} />
						<Route exact path="/request" element={<Businessrequest />} />
						<Route
							exact
							path="/appointments"
							element={<Appointments page="appointments" />}
						/>
						<Route exact path="/patients" element={<Patients />} />
						<Route exact path="/notifications" element={<Notification />} />
						<Route exact path="/sumsub" element={<Sumsub />} />
						<Route exact path="/paymentdone" element={<Paymentdone />} />
						<Route exact path="/thankyou" element={<Thankyou />} />
						<Route
							exact
							path="/onboard-user/refresh"
							element={<Onboardingrefresh />}
						/>
						<Route
							exact
							path="/thirdpartylogin"
							element={<ThirdPartyLogin />}
						/>
						<Route exact path="/privacypolicy" element={<Privacypolicy />} />
						<Route
							exact
							path="/accept/:userid/:userid1/:userid2"
							element={<Accept />}
						/>
						<Route
							exact
							path="/inviteaccept/:userid"
							element={<Inviteaccept />}
						/>
						<Route
							exact
							path="/resetpassword/:userid"
							element={<Resetpassword />}
						/>
						<Route
							exact
							path="/patientresetpassword/:userid"
							element={<Patientresetpassword />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
