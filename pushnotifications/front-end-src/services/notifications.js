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

const CREATE_NOTIFICATION =
	() => `mutation create($status: String!, $patientid:String!, $adminid: String!, $isopened: Boolean!, $doctorid: String!, $message1: String!, $message2: String!, $message3: String!, $message4: String!, $kind: String!){
    notification(status:$status, patientid:$patientid, isopened:$isopened, adminid:$adminid, doctorid:$doctorid, message1:$message1, message2:$message2, message3:$message3, message4:$message4, kind:$kind){
		id,
        status,
        isopened,
        patientid,
        adminid,
        doctorid,
        kind,
        message1,
        message2,
        message3,
        message4
    }
  }`;

const UPDATE_NOTIFICATION = () => `mutation create($id:ID,$obj:String){
    update(id:$id, obj:$obj){
      status
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
        "status": "#status#",
        "isopened": #isopened#,
        "patientid": "#patientid#",
        "adminid": "#adminid#",
        "doctorid": "#doctorid#",
        "message1": "#message1#",
        "message2": "#message2#",
        "message3": "#message3#",
        "message4": "#message4#",
        "kind": "#kind#"
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
  notificationByID(id: "#id#"){
	id,
	  status,
	  isopened,
      patientid,
      doctorid,
      adminid,
      message1,
      message2,
      message3,
      message4,
      kind
  	}
  }
`;

const NOTIFICATION_BYKINDANDSTATUS = () => `query {
  		notificationByKindandStatus(kind: "#kind#", status: "#status#", adminid: "#adminid#"){
	id,
	  status,
	  isopened,
      patientid,
      doctorid,
      adminid,
      message1,
      message2,
      message3,
      message4,
      kind
  	}
  }
`;

const NOTIFICATION_BYADMINID = () => `query {
  		notificationByAdminid(adminid: "#adminid#"){
	id,
	  status,
      patientid,
      doctorid,
	  isopened,
      adminid,
      message1,
      message2,
      message3,
      message4,
      kind
  	}
  }`;

const NOTIFICATION_BYDOCTORID = () => `query {
	notificationByDoctorid(doctorid: "#doctorid#"){
		id,
		status,
		isopened,
		patientid,
		doctorid,
		adminid,
		message1,
		message2,
		message3,
		message4,
		kind
		}
	}`;

const GET_NOTIFICATION = () => `query{
    notification{
		id,
      status,
      patientid,
      doctorid,
      adminid,
	  isopened,
      message1,
      message2,
      message3,
      message4,
      kind
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

export const GetNotificationByAdminid = (id) =>
	axios({
		url: Baseurl() + "notification",
		method: "post",
		data: {
			query: NOTIFICATION_BYADMINID().replace("#adminid#", id),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetNotificationByDoctorid = (id) =>
	axios({
		url: Baseurl() + "notification",
		method: "post",
		data: {
			query: NOTIFICATION_BYDOCTORID().replace("#doctorid#", id),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetNotificationByKindandStatus = (kind, status, adminid) =>
	axios({
		url: Baseurl() + "notification",
		method: "post",
		data: {
			query: NOTIFICATION_BYKINDANDSTATUS()
				.replace("#kind#", kind)
				.replace("#status#", status)
				.replace("#adminid#", adminid),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const CreateNotification = (props) =>
	axios({
		url: Baseurl() + "notification",
		method: "post",
		data: {
			query: CREATE_NOTIFICATION(),
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
