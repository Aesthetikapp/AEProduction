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

const CREATE_PATIENTHISTORY =
	() => `mutation create($patientid: String!, $sign1:String!, $sign2: String!, $answers: Boolean!){
    parenthistory($patientid:$patientid, sign1:$sign1, sign2:$sign2, answers:$answers){
	    id,
        patientid,
        sign1,
        sign2,
        answers
    }
  }`;

const UPDATE_PATIENTHISTORY = () => `mutation create($id:ID,$obj:String){
    update(id:$id, obj:$obj){
      id
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
        "patientid": "#patientid#",
        "sign1": "#sign1#",
        "sign2": "#sign2#",
        "answers": "#answers#"
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

const PATIETNHISTORY_BYID = () => `query {
  patienthistoryByID(id: "#id#"){
	    id,
	    patientid,
        sign1,
        sign2,
        answers
  	}
  }
`;

const PATIENTHISTORY_BYPATIENTID = () => `query {
	patienthistorybypatientid(patientid: "#patientid#"){
		id,
	    patientid,
        sign1,
        sign2,
        answers
		}
	}`;

const GET_PATIENTHISTORY = () => `query{
    patienthistory{
		id,
	    patientid,
        sign1,
        sign2,
        answers
}
}`;

export const GetPatienthistory = () =>
	axios({
		url: Baseurl() + "patienthistory",
		method: "post",
		data: {
			query: GET_PATIENTHISTORY(),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetPatienthistoryById = (id) =>
	axios({
		url: Baseurl() + "patienthistory",
		method: "post",
		data: {
			query: PATIETNHISTORY_BYID().replace("#id#", id),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetPatienthistoryBypatientid = (id) =>
	axios({
		url: Baseurl() + "patienthistory",
		method: "post",
		data: {
			query: PATIENTHISTORY_BYPATIENTID().replace("#patientid#", id),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const CreatePatienthistory = (props) =>
	axios({
		url: Baseurl() + "patienthistory",
		method: "post",
		data: {
			query: CREATE_PATIENTHISTORY(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export const UpdatePatienthistory = (props) =>
	axios({
		url: Baseurl() + "patienthistory",
		method: "post",
		data: {
			query: UPDATE_PATIENTHISTORY(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export async function DeletePatienthistory(props) {
	console.log("ee", props);
	var propss = `{
    "id": "#id#"
  }`;
	propss = propss.replace("#id#", props);
	console.log("eew", propss);
	try {
		const response = await axios({
			url: Baseurl() + "patienthistory",
			method: "post",
			data: {
				query: `{
          deletepatienthistory (id:"#id#"){
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
