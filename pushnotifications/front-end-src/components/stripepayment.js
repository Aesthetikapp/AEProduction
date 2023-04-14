import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./Checkoutform";
import axios from "axios";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
	"pk_test_51LkQC3B02aVPUqomMG8YDacpleaklU2UTYYCj0IAX4v4jWpCAC19bFTu4fLuTKNzpMGKdOqHN94KNeXD8ryoQtpo00VxgBEbJv"
);

export default function App() {
	// const options = {
	// 	// passing the client secret obtained from the server
	// 	clientSecret:
	// 		"pi_3Mib6yB02aVPUqom1i5kUHAx_secret_IxlNN2kQGDHfqv3IOL7pTG8He",
	// };
	// return (
	// 	<Elements stripe={stripePromise} options={options}>
	// 		<CheckoutForm />
	// 	</Elements>
	// );

	const handleCheckout = () => {
		axios
			.post(`http://localhost:4242/create-checkout-session`, {
				cartItems: "cartItems",
				userId: "user._id",
			})
			.then((response) => {
				console.log("response", response);
				if (response.data.url) {
					window.location.href = response.data.url;
				}
			})
			.catch((err) => console.log(err.message));
	};
	return (
		<>
			<button onClick={() => handleCheckout()}>Check out</button>
		</>
	);
}
