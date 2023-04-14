import { Baseurl } from "../common/util";
const axios = require("axios").default;

// var baseurl1;
// if (process.env.REACT_APP_HOST === "local") {
// 	baseurl1 = "http://localhost:3001/";
// } else if (process.env.REACT_APP_HOST === "123") {
// 	baseurl1 = "http://123.176.43.187:3004/";
// } else {
// 	baseurl1 = window.location.origin + "/api/";
// }

const baseurl = Baseurl() + "patientpayment";

const formatYmd = (date) => date.toISOString().slice(0, 10);

const CREATE_PATIENTPAYMENT =
	() => `mutation create($appointmentid: String!, $date:String!, $amount: String!, $refund: String!, $kind: String!, $tax: String!, $month: String!, $year: String!){
    patientpayment(appointmentid:$appointmentid, date:$date, amount:$amount, kind:$kind, tax:$tax, month:$month, refund:$refund, year:$year){
        appointmentid,
        date,
        amount,
        kind,
        tax,
        month,
		refund,
        year
    }
  }`;

const UPDATE_PATIENTPAYMENT = () => `mutation create($id:ID,$obj:String){
    update(id:$id, obj:$obj){
      appointmentid
    }
  }`;

export const returnUpdateVariables = (props) => {
	// console.log(props);
	var returnstring = `{
        "id": "#id#",
        "obj": "#obj#"
    }`;
	const id = props.id;
	delete props.id;
	const escapestr = JSON.stringify(props).replaceAll(/"/g, '\\"');
	returnstring = returnstring.replaceAll(/#id#/g, id);
	returnstring = returnstring.replaceAll(/#obj#/g, escapestr);

	return returnstring;
};

export const returnCreateVariables = (props) => {
	// console.log(props);

	var returnstring = `{
        "appointmentid": "#appointmentid#",
        "date": "#date#",
        "amount": "#amount#",
        "kind": "#kind#",
        "tax": "#tax#",
        "month": "#month#",
        "year": "#year#",
		"refund": "#refund#"
      }`;

	Object.keys(props).forEach((key, index) => {
		returnstring = returnstring.replace(
			"#" + key.toLowerCase() + "#",
			props[key]
		);
	});

	returnstring = returnstring.replaceAll(/#[a-z0-9]{1,}#/g, "");

	return returnstring;
};

const PATIENTPAYMENT_BYID = () => `query {
  patientpaymentByID(id: "#id#"){
      id,
	  appointmentid,
      date,
      kind,
      amount,
      tax,
	  refund,
      month,
      year
  	}
  }
`;

const PATIENTPAYMENT_BYAPPOINTMENTID = () => `query {
  patientpaymentByAppointmentID(appointmentid: "#id#"){
      id,
	  appointmentid,
      date,
      kind,
      amount,
      tax,
	  refund,
      month,
      year
  	}
  }
`;

const GET_PATIENTPAYMENT = () => `query{
    patientpayment{
      id,
      appointmentid,
      date,
      kind,
      amount,
	  refund,
      tax,
      month,
      year
    }
}`;

export const GetPatientpayment = () =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: GET_PATIENTPAYMENT(),
		},
	}).then((result) => {
		// console.log(result);
		return result.data.data;
	});

export const GetPatientpaymentById = (id) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: PATIENTPAYMENT_BYID().replace("#id#", id),
		},
	}).then((result) => {
		// console.log(result);
		return result.data.data;
	});

export const GetPatientpaymentByAppointmentId = (id) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: PATIENTPAYMENT_BYAPPOINTMENTID().replace("#id#", id),
		},
	}).then((result) => {
		// console.log(result);
		return result.data.data;
	});
export const CreatePatientpayment = (props) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: CREATE_PATIENTPAYMENT(),
			variables: props,
		},
	})
		.then((res) => {
			// console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export const UpdatePatientpayment = (props) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: UPDATE_PATIENTPAYMENT(),
			variables: props,
		},
	})
		.then((res) => {
			// console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export async function DeletePatientpayment(props) {
	// console.log("ee", props);
	var propss = `{
    "id": "#id#"
  }`;
	propss = propss.replace("#id#", props);
	// console.log("eew", propss);

	try {
		const response = await axios({
			url: baseurl,
			method: "post",
			data: {
				query: `{
          deletePatientpayment (id:"#id#"){
          id
             }
           }`.replace("#id#", props),
			},
		});
		// console.log("user", response.data);
		return response.data;
	} catch (error) {
		return [""];
	}
}
