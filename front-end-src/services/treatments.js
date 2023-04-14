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

const baseurl = Baseurl() + "treatments";

const CREATE_TREATMET =
	() => `mutation create($treatmenttype:String!,$bodyarea:String!,$treatmentname:String!,$syringemin:String!,$syringemax:String!,$duration:String!,$description:String!,$quantitysold:String!,$quantityavailable:String!,$pricepersyring:String!,$sellingprice:String!,$advancedsetting:String!,$defaultdisclosure:String!,$customdisclosure:String!,$photo1:String!,$photo2:String!,$video:String!,$assigneddoctors:String!,$active:String!,$userid:String!,$createdate:String!,$updatedate:String!){
  globaltreatments(treatmenttype:$treatmenttype,bodyarea:$bodyarea,treatmentname:$treatmentname,syringemin:$syringemin,syringemax:$syringemax,duration:$duration,description:$description,quantitysold:$quantitysold,quantityavailable:$quantityavailable,pricepersyring:$pricepersyring,sellingprice:$sellingprice,advancedsetting:$advancedsetting,defaultdisclosure:$defaultdisclosure,customdisclosure:$customdisclosure,photo1: $photo1,photo2: $photo2,video:$video,assigneddoctors:$assigneddoctors,active:$active,userid:$userid,createdate:$createdate,updatedate:$updatedate)
	{
    treatmenttype,
    bodyarea,
    treatmentname,
    syringemin,
    syringemax,
    duration,
    description,
    quantitysold,
    quantityavailable,
    pricepersyring,
    sellingprice,
    advancedsetting,
    defaultdisclosure,
    customdisclosure,
    photo1,
    photo2,
    video,
    active,
    assigneddoctors,
    userid,
    createdate,
    updatedate
  }
}`;

const GET_GLOBAL_TREATMENTS = () => `query{
  globaltreatments
	{
    id,
    treatmenttype,
    bodyarea,
    treatmentname,
    syringemin,
    syringemax,
    duration,
    description,
    quantitysold,
    quantityavailable,
    pricepersyring,
    sellingprice,
    advancedsetting,
    defaultdisclosure,
    customdisclosure,
    photo1,
    photo2,
    video,
    active,
	assigneddoctors,
    userid,
    createdate,
    updatedate
  }
}`;

const GET_TREATMENTS_SEARCH = () => `query{
   treatmentsBySearch(search: "search")
	{
    id,
    treatmenttype,
    bodyarea,
    treatmentname,
    syringemin,
    syringemax,
    duration,
    description,
    quantitysold,
    quantityavailable,
    pricepersyring,
    sellingprice,
    advancedsetting,
    defaultdisclosure,
    customdisclosure,
    photo1,
    photo2,
    video,
    active,
	assigneddoctors,
    userid,
    createdate,
    updatedate
  }
}`;

const UPDATE_TREATMENT = () => `mutation create($id:ID,$obj:String){
  update(id:$id, obj:$obj){
    treatmenttype
  }
}`;

const TREATMENT_BYID = () => `query {
    treatmentsByID(id: "#id#")
	{
    id,
    treatmenttype,
    bodyarea,
    treatmentname,
    syringemin,
    syringemax,
    duration,
    description,
    quantitysold,
    quantityavailable,
    pricepersyring,
    sellingprice,
    advancedsetting,
    defaultdisclosure,
    customdisclosure,
    photo1,
    photo2,
    video,
    active,
	assigneddoctors,
    userid,
    createdate,
    updatedate
  }
  }
`;
// const DELETE_TREATMENT = () => `mutation {
//     delete(id: "#id#"){
//       treatmenttype
//     }
//   }`;

export const returnUpdateVariables = (props) => {
	console.log(props);
	var returnstring = `{
      "id": "#id#",
      "obj": "#obj#"
  }`;
	const id = props.id;
	delete props.id;
	const escapestr = JSON.stringify(props).replaceAll(/"/g, '\\"');
	console.log(escapestr);
	returnstring = returnstring.replaceAll(/#id#/g, id);
	returnstring = returnstring.replaceAll(/#obj#/g, escapestr);

	return returnstring;
};

export const returnCreateVariables = (props) => {
	console.log(props);

	var returnstring = `{
    "treatmenttype":"#treatmenttype#",
    "bodyarea":"#bodyarea#",
    "treatmentname":"#treatmentname#",
    "syringemin":"#syringemin#",
    "syringemax":"#syringemax#",
    "duration":"#duration#",
    "description":"#description#",
    "quantitysold":"#quantitysold#",
    "quantityavailable":"#quantityavailable#",
    "pricepersyring":"#pricepersyring#",
    "sellingprice":"#sellingprice#",
    "advancedsetting":"#advancedsetting#",
    "defaultdisclosure":"#defaultdisclosure#",
    "customdisclosure":"#customdisclosure#",
    "photo1":"#photo1#",
    "photo2":"#photo2#",
    "video":"#video#",
    "active":"#active#",
    "assigneddoctors":"#assigneddoctors#",
    "userid":"#userid#",
    "createdate":"#createdate#",
    "updatedate":"#updatedate#"
    }`;
	Object.keys(props).forEach((key, index) => {
		returnstring = returnstring.replace(
			"#" + key.toLowerCase() + "#",
			props[key]
		);
	});
	returnstring = returnstring.replaceAll(/#createdate#/g, new Date());
	returnstring = returnstring.replaceAll(/#updatedate#/g, new Date());
	returnstring = returnstring.replaceAll(/#[a-z0-9]{1,}#/g, "");

	return returnstring;
};

export const GetGlobalTreatments = () =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: GET_GLOBAL_TREATMENTS(),
		},
	}).then((result) => {
		console.log("12", result);
		return result.data.data;
	});

export const CreateTreatment = (props) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: CREATE_TREATMET(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export const Uploadandcreate = (file, props) =>
	// console.log(file);

	axios({
		url: Baseurl() + "multi",
		data: file,
		method: "post",
		headers: { "Content-Type": "multipart/form-data" },
	}).then((result) => {
		// return file.name;
		console.log(result);
		console.log(props);
		axios({
			url: baseurl,
			method: "post",
			data: {
				query: CREATE_TREATMET(),
				variables: props,
			},
		})
			.then((res) => {
				console.log(res);
				// return res.data.data;
			})
			.catch((err) => console.log(err));
		return result.data.data;
		// return res.data.data;
	});

export const DisableTreatment = (props) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: UPDATE_TREATMENT(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export async function DeleteTreatment(props) {
	console.log("ee", typeof props);
	var propss = `{
    "id": "#id#"
  }`;
	propss = propss.replace("#id#", props);

	try {
		const response = await axios({
			url: baseurl,
			method: "post",
			data: {
				query: `mutation delete($id: ID)
                {
                  delete(id:$id){
                    id
                  }
                }`,
				variables: propss,
			},
		});
		return response.data;
	} catch (error) {
		return [""];
	}
}

export const GetTreatmentsBySearch = (search) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: GET_TREATMENTS_SEARCH().replace("#search#", search),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetTreatmentById = (id) =>
	axios({
		url: baseurl,
		method: "post",
		data: {
			query: TREATMENT_BYID().replace("#id#", id),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetAllTreatmentIds = () =>
	axios({
		url: Baseurl() + "getAllTreatmentids",
		method: "get",
		data: {
			// query: TREATMENT_BYID().replace("#id#", id),
		},
	}).then((result) => {
		console.log(result);
		return result.data;
	});
