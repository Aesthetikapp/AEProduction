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

// const baseurl = Baseurl() + "notification";

const formatYmd = (date) => date.toISOString().slice(0, 10);

const CREATE_APPNOTIFICATION =
	() => `mutation create($appointmentid: String!, $patientid:String!, $date: String!, $isopened: Boolean!, $time: String!, $title: String!, $description: String!){
    notification(appointmentid:$appointmentid, patientid:$patientid, isopened:$isopened, date:$date, time:$time, title:$title, description:$description){
		id,
        appointmentid,
        isopened,
        patientid,
        date,
        time,
        title,
        description
    }
  }`;

const UPDATE_NOTIFICATION = () => `mutation create($id:ID,$obj:String){
    update(id:$id, obj:$obj){
      appointmentid
    }
  }`;

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

export const returnCreateVariables = (props) => {
	console.log(props);

	var returnstring = `{
        "appointmentid": "#appointmentid#",
        "isopened": #isopened#,
        "patientid": "#patientid#",
        "date": "#date#",
        "time": "#time#",
        "title": "#title#",
        "description": "#description#"
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

const NOTIFICATION_BYID = () => `query {
  appnotificationByID(id: "#id#"){
	  id,
	  appointmentid,
	  isopened,
      patientid,
      time,
      date,
      title,
      description
  	}
  }
`;

// const NOTIFICATION_BYKINDANDSTATUS = () => `query {
//   		notificationByKindandStatus(kind: "#kind#", appointmentid: "#appointmentid#", date: "#date#"){
// 	  id,
// 	  appointmentid,
// 	  isopened,
//       patientid,
//       time,
//       date,
//       title,
//       description,
//       message3,
//       message4,
//       kind
//   	}
//   }
// `;

const NOTIFICATION_BYAPPOINTMENTID = () => `query {
  	appnotificationByAppointmentid(appointmentid: "#appointmentid#"){
	  id,
	  appointmentid,
      patientid,
      time,
	  isopened,
      date,
      title,
      description
  	}
  }`;

const NOTIFICATION_BYPATIENTID = () => `query {
	notificationByPatientid(patientid: "#patientid#"){
		id,
		appointmentid,
		isopened,
		patientid,
		time,
		date,
		title,
		description
		}
	}`;

const GET_NOTIFICATION = () => `query{
    notification{
	  id,
      appointmentid,
      patientid,
      time,
      date,
	  isopened,
      title,
      description
    }
}`;

export const GetNotification = () =>
	axios({
		url: Baseurl() + "notification",
		method: "post",
		data: {
			query: GET_NOTIFICATION(),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetNotificationById = (id) =>
	axios({
		url: Baseurl() + "notification",
		method: "post",
		data: {
			query: NOTIFICATION_BYID().replace("#id#", id),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetNotificationByAppointmentid = (id) =>
	axios({
		url: Baseurl() + "notification",
		method: "post",
		data: {
			query: NOTIFICATION_BYAPPOINTMENTID().replace("#appointmentid#", id),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetNotificationByPatientid = (id) =>
	axios({
		url: Baseurl() + "notification",
		method: "post",
		data: {
			query: NOTIFICATION_BYPATIENTID().replace("#patientid#", id),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

// export const GetNotificationByKindandStatus = (kind, appointmentid, date) =>
// 	axios({
// 		url: Baseurl() + "notification",
// 		method: "post",
// 		data: {
// 			query: NOTIFICATION_BYKINDANDSTATUS()
// 				.replace("#kind#", kind)
// 				.replace("#appointmentid#", appointmentid)
// 				.replace("#date#", date),
// 		},
// 	}).then((result) => {
// 		console.log(result);
// 		return result.data.data;
// 	});

export const CreateNotification = (props) =>
	axios({
		url: Baseurl() + "notification",
		method: "post",
		data: {
			query: CREATE_APPNOTIFICATION(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export const UpdateNotification = (props) =>
	axios({
		url: Baseurl() + "notification",
		method: "post",
		data: {
			query: UPDATE_NOTIFICATION(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export async function DeleteNotification(props) {
	console.log("ee", props);
	var propss = `{
    "id": "#id#"
  }`;
	propss = propss.replace("#id#", props);
	console.log("eew", propss);

	try {
		const response = await axios({
			url: Baseurl() + "notification",
			method: "post",
			data: {
				query: `{
          deleteNotification (id:"#id#"){
          id
             }
           }`.replace("#id#", props),
			},
		});
		console.log("user", response.data);
		return response.data;
	} catch (error) {
		return [""];
	}
}
