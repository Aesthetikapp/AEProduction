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

const baseurl = Baseurl() + "patient";

const formatYmd = (date) => date.toISOString().slice(0, 10);

const CREATE_PATIENTUSER =
	() => `mutation create($firstname: String!, $lastname:String!, $sumsubstatus:String!, $email: String!, $channelid: String!, $dob: Date!, $gender: String!, $password: String!, $favourites: String!, $address: inputaddress){
    patient(firstName:$firstname, lastName:$lastname, sumsubstatus:$sumsubstatus, email:$email, channelid:$channelid, dob:$dob, gender:$gender, password:$password, address:$address, favourites:$favourites){
      id,
      firstName,
      lastName,
	  sumsubstatus,
      email,
      channelid,
      dob,
      gender,
      password,
      favourites,
      address{
          line1
          line2
          towncity
          postcode
          state
          country
        }
    }
  }`;

const CREATE_APPOINTMENT =
	() => `mutation create($patientid: String!, $treatmentid:String!, $videourl: String!, $starttime: String!, $cstarttime: String!,$endtime: String!, $cendtime: String!, $duration: String!, $history: String!, $complete: String!, $scanimages: String!, $isstarted: String!, $iscompleted: String!, $startpin: String!, $endpin: String!, $isdoctorcheckedin: String!, $doctorid: String!, $createddate: Date!, $updateddate: Date!, $appointmentdate: Date!, $consultationdate: Date!){
    appointment(patientid:$patientid, treatmentid:$treatmentid, videourl:$videourl, starttime:$starttime, cstarttime:$cstarttime, endtime:$endtime, cendtime:$cendtime, duration:$duration, history:$history, complete:$complete, scanimages:$scanimages, isstarted:$isstarted, iscompleted:$iscompleted, startpin:$startpin, endpin:$endpin, isdoctorcheckedin:$isdoctorcheckedin, doctorid:$doctorid, createddate:$createddate, updateddate:$updateddate, appointmentdate:$appointmentdate, consultationdate:$consultationdate){
      id,
      patientid,
      treatmentid,
      videourl,
      starttime,
      cstarttime,
      endtime,
      cendtime,
      duration,
      history,
	  complete,
	  scanimages,
	  isstarted,
	  iscompleted,
	  startpin,
	  endpin,
	  isdoctorcheckedin,
	  doctorid,
	  createddate,
	  updateddate,
	  appointmentdate,
	  consultationdate
    }
  }`;

const getAllappointments = () => `query{
		appointment{
			id,
			patientid,
			treatmentid,
			videourl,
			initialsyringes,
      		finalsyringes,
			starttime,
			cstarttime,
			endtime,
			cendtime,
			duration,
			history,
			complete,
			scanimages,
			isstarted,
			iscompleted,
			startpin,
			endpin,
			isdoctorcheckedin,
			doctorid,
			createddate,
			updateddate,
			appointmentdate,
			consultationdate
		}
    }`;

export const returnCreateAppointmentVariables = (props) => {
	console.log(props);

	var returnstring = `{
        "patientid": "#patientid#",
        "treatmentid": "#treatmentid#" ,
        "videourl": "#videourl#",
        "starttime": "#starttime#",
        "cstarttime": "#cstarttime#",
        "endtime": "#endtime#",
        "cendtime": "#cendtime#",
        "duration": "#duration#",
        "history": "#history#",
        "complete": "#complete#",
        "scanimages": "#scanimages#",
        "isstarted": "#isstarted#",
        "iscompleted": "#iscompleted#",
		"startpin": "#startpin#",
		"endpin": "#endpin#",
		"isdoctorcheckedin": "#isdoctorcheckedin#",
		"doctorid": "#doctorid#",
		"createddate": "#createddate#",
		"updateddate": "#updateddate#",
		"appointmentdate": "#appointmentdate#",
		"consultationdate": "#consultationdate#"
      }`;
	Object.keys(props).forEach((key, index) => {
		returnstring = returnstring.replace(
			"#" + key.toLowerCase() + "#",
			props[key]
		);
	});
	returnstring = returnstring.replaceAll(
		/#dob#/g,
		formatYmd(new Date()).toString()
	);
	returnstring = returnstring.replaceAll(
		/#createddate#/g,
		formatYmd(new Date()).toString()
	);
	returnstring = returnstring.replaceAll(
		/#updateddate#/g,
		formatYmd(new Date()).toString()
	);
	returnstring = returnstring.replaceAll(
		/#appointmentdate#/g,
		formatYmd(new Date()).toString()
	);
	returnstring = returnstring.replaceAll(
		/#consultationdate#/g,
		formatYmd(new Date()).toString()
	);
	returnstring = returnstring.replaceAll(/#[a-z0-9]{1,}#/g, "");
	return returnstring;
};

export const returnCreateVariables = (props) => {
	console.log(props);

	var returnstring = `{
        "firstname": "#firstname#",
        "lastname": "#lastname#",
        "sumsubstatus": "#sumsubstatus#",
        "email": "#email#",
        "channelid": "#channelid#",
        "dob": "#dob#",
        "gender": "#gender#",
        "password": "#password#",
        "favourites": "#favourites#",
        "address": {
            "line1": "#line1#",
            "line2": "#line2#",
            "towncity": "#towncity#",
            "postcode": "#postcode#",
            "state": "#state#",
            "country": "#country#"
          }
      }`;
	Object.keys(props).forEach((key, index) => {
		returnstring = returnstring.replace(
			"#" + key.toLowerCase() + "#",
			props[key]
		);
	});
	returnstring = returnstring.replaceAll(
		/#dob#/g,
		formatYmd(new Date()).toString()
	);
	returnstring = returnstring.replaceAll(/#[a-z0-9]{1,}#/g, "");
	return returnstring;
};

const UPDATE_PATIENTUSER = () => `mutation create($id:ID,$obj:String){
    update(id:$id, obj:$obj){
      email
    }
  }`;

const UPDATE_PATIENTAPPOINTMENT = () => `mutation create($id:ID,$obj:String){
  update(id:$id, obj:$obj){
  id
  }
}`;

const PATIENT_BYEMAIL = () => `query {
  patientByEmail(email: "#email#"){
	      id,
      firstName,
      lastName,
	  sumsubstatus,
	  memberid,
      email,
      channelid,
      dob,
      gender,
      password,
      favourites,
      address{
          line1
          line2
          towncity
          postcode
          state
          country
        }
  	}
  }
`;

const PATIENT_BYID = () => `query {
  patientByID(id: "#id#"){
	      id,
      firstName,
      lastName,
	    sumsubstatus,
	  memberid,
      email,
      avatar,
      dob,
      gender,
      password,
      favourites,
      address{
          line1
          line2
          towncity
          postcode
          state
          country
        }
  	}
  }
`;

export const returnUpdateVariables = (props) => {
	console.log(props);
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

export const returnUpdateAppointments = (props) => {
	console.log(props);

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

export const GetPatientByEmail = (email) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: PATIENT_BYEMAIL().replace("#email#", email),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetPatientByID = (id) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: PATIENT_BYID().replace("#id#", id),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const CreatePatientUser = (props) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: CREATE_PATIENTUSER(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export const UpdatePatientUser = (props) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: UPDATE_PATIENTUSER(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export const Createappointment = (props) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: CREATE_APPOINTMENT(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export const UpdatePatientAppointment = (props) =>
	axios({
		url: Baseurl() + "appointment",
		method: "post",
		data: {
			query: UPDATE_PATIENTAPPOINTMENT(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export const GetAllAppointments = () =>
	axios({
		url: Baseurl() + "appointment",
		method: "post",
		data: {
			query: getAllappointments(),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});
