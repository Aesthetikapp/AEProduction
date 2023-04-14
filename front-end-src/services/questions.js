import { Baseurl } from "../common/util";
import axios from "axios";

// var baseurl1;
// if (process.env.REACT_APP_HOST === "local") {
// 	baseurl1 = "http://localhost:3001/";
// } else if (process.env.REACT_APP_HOST === "123") {
// 	baseurl1 = "http://123.176.43.187:3004/";
// } else {
// 	baseurl1 = window.location.origin + "/api/";
// }

const baseurl = Baseurl() + "question";

const formatYmd = (date) => date.toISOString().slice(0, 10);

const CREATE_QUESTION =
	() => `mutation create($question: String!, $kind:String!, $childquestionid: String!, $isrequired: Boolean!, $answer: String!,$order: Int!){
    questions(question:$question, kind:$kind, childquestionid:$childquestionid, isrequired:$isrequired, answer:$answer, order:$order){
	    id,
        question,
        kind,
        childquestionid,
        isrequired,
        answer,
        order
    }
  }`;

const UPDATE_QUESTION = () => `mutation create($id:ID,$obj:String){
    update(id:$id, obj:$obj){
      id
    }
  }`;

const UPDATE_MULTIQUESTIONS =
	() => `mutation create($multiquestions:[multiqtype]){
    updatemany(multiquestions:$multiquestions){
      order
    }
  }`;

export const returnMultiUpdateVariables = (props) => {
	console.log("props..", props.length);
	var returnstring = `{"multiquestions": [xobj]}`;
	var rstr = `{"id": "#id#", "obj": "#obj#"}`;
	var ttrstr = ``;
	props.map((obj, i) => {
		console.log(ttrstr);
		const id = obj.id;
		delete obj.id;
		var trstr = rstr;
		const escapestr = JSON.stringify(obj).replaceAll(/"/g, '\\"');
		trstr = trstr.replaceAll(/#id#/g, id);
		trstr = trstr.replaceAll(/#obj#/g, escapestr);
		var sep = i == props.length - 1 ? "" : ",";
		trstr = trstr + sep;
		console.log("props..trstr", trstr, i, sep);
		ttrstr = ttrstr + trstr;
		console.log("props..ttrstr", ttrstr);
	});
	returnstring = returnstring.replace("xobj", ttrstr);
	console.log("props..", returnstring);

	return returnstring;
};

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
        "question": "#question#",
        "kind": "#kind#",
        "childquestionid": "#childquestionid#",
        "isrequired": #isrequired#,
        "answer": "#answer#",
        "order": #order#
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

const QUESTION_BYID = () => `query {
  questionByID(id: "#id#"){
	    id,
	    question,
        kind,
        childquestionid,
        isrequired,
        answer,
        order
  	}
  }
`;

const NOTIFICATION_BYCHILDQUESTIONID = () => `query {
	notificationBychildquestionid(childquestionid: "#childquestionid#"){
		id,
	    question,
        kind,
        childquestionid,
        isrequired,
        answer,
        order
		}
	}`;

const GET_QUESTION = () => `query{
    questions{
		id,
	    question,
        kind,
        childquestionid,
        isrequired,
        answer,
        order
}
}`;

export const GetQuestion = () =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: GET_QUESTION(),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetQuestionById = (id) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: QUESTION_BYID().replace("#id#", id),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetQuestionByChildquestionid = (id) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: NOTIFICATION_BYCHILDQUESTIONID().replace("#childquestionid#", id),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const CreateQuestion = (props) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: CREATE_QUESTION(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export const UpdateQuestion = (props) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: UPDATE_QUESTION(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export const UpdateMultiQuestion = (props) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: UPDATE_MULTIQUESTIONS(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export async function DeleteQuestion(props) {
	console.log("ee", props);
	var propss = `{
    "id": "#id#"
  }`;
	propss = propss.replace("#id#", props);
	console.log("eew", propss);

	try {
		const response = await axios({
			url: baseurl,
			method: "post",
			data: {
				query: `{
          deleteQuestion (id:"#id#"){
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
