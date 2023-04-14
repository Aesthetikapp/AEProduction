import { Baseurl } from "../common/util";
const axios = require("axios").default;

// const baseurl1 =
// 	// "https://lilmahesh.com/api/";
// 	process.env.REACT_APP_HOST === "local"
// 		? "http://localhost:3001/"
//     : window.location.origin + "/api/";
// var baseurl1;
// if (process.env.REACT_APP_HOST === "local") {
// 	baseurl1 = "http://localhost:3001/";
// } else if (process.env.REACT_APP_HOST === "123") {
// 	baseurl1 = "http://123.176.43.187:3004/";
// } else {
// 	baseurl1 = window.location.origin + "/api/";
// }

// const baseurl = Baseurl() + "aeuser";

const formatYmd = (date) => date.toISOString().slice(0, 10);

const COMPARE_PASSWORD = () => `query {
comparePassword(pwd: "#password#", hashpwd: "#hash#")
{
  id,
  password
}
}
`;
const USER_BYID = () => `query {
    userByID(id: "#id#"){
      id,
      email,
      firstName,
      lastName,
      title,
      primaryTelephone,
      countryCode,
      clinicname,
      notifyme,
      business{
      btype,
          name,
          bio,
          location{
          line1
          line2
          towncity
          postcode
          state
          country
      },
      website,
          bavatar,
          noofemployees
  },
  gender,
      avatar,
      dob,
      bio1,
      channelid,
      verification{
      idv
      ml
      od
      mi
      ev
  },
  payment,
      plan,
      source,
      isadmin,
      complete,
      step,
      currentstep,
      prevstep,
      createdate,
      updatedate,
      createuser,
      updateuser,
      password
    }
  }
`;
const CLINICS_BY_ADMIN = () => `query{
    userByAdmin(isadmin:true){
      id,
      email,
      firstName,
      clinicname,
      isadmin,
      notifyme,
      business{
      btype,
          name,
          bio,
          location{
          line1
          line2
          towncity
          postcode
          state
          country
      },
      website,
          bavatar,
          noofemployees
    }
    }
  }`;

const USER_BYEMAIL = () => `query {
  userByEmail(email: "#email#"){
    id,
      email,
      firstName,
      lastName,
      notifyme,
      title,
      primaryTelephone,
      countryCode,
      clinicname,
      business{
      btype,
          name,
          bio,
          location{
          line1
          line2
          towncity
          postcode
          state
          country
      },
      website,
          bavatar,
          noofemployees
  },
  gender,
      avatar,
      dob,
      bio1,
      channelid,
      verification{
      idv
      ml
      od
      mi
      ev
  },
  payment,
      plan,
      source,
      isadmin,
      complete,
      step,
      currentstep,
      prevstep,
      createdate,
      updatedate,
      createuser,
      updateuser,
      password
    }
  }
`;

const USER_BYPHONE = () => `query {
  userByPhone(phone: "#phone#"){
    id,
      email,
      firstName,
      lastName,
      notifyme,
      title,
      primaryTelephone,
      countryCode,
      clinicname,
      business{
      btype,
          name,
          bio,
          location{
          line1
          line2
          towncity
          postcode
          state
          country
      },
      website,
          bavatar,
          noofemployees
  },
  gender,
      avatar,
      dob,
      bio1,
      channelid,
      verification{
      idv
      ml
      od
      mi
      ev
  },
  payment,
      plan,
      source,
      isadmin,
      complete,
      step,
      currentstep,
      prevstep,
      createdate,
      updatedate,
      createuser,
      updateuser,
      password
    }
  }
`;

const GET_USER = () => `query{
    user{
    id,
    email,
    firstName,
    lastName,
    title,
    primaryTelephone,
    notifyme,
    countryCode,
    clinicname,
    business{
    btype,
        name,
        bio,
        location{
        line1
        line2
        towncity
        postcode
        state
        country
    },
    website,
        bavatar,
        noofemployees
},
gender,
    avatar,
    dob,
    bio1,
    channelid,
    verification{
    idv
    ml
    od
    mi
    ev
},
payment,
    plan,
    source,
    isadmin,
    complete,
    step,
    currentstep,
    prevstep,
    createdate,
    updatedate,
    createuser,
    updateuser,
    password
}
}`;

const GET_USER_EMAIL = () => `query{
    user{
    email,
}
}`;

const CREATE_USER =
	() => `mutation create($email: String!, $firstname: String!, $lastname:String!, $title:String!, $primaryTelephone: String!, $countryCode: String!, $notifyme: Boolean!, $business: inputbusiness,$gender: String!, $avatar: String!,$dob: Date!,$bio1: String!,$channelid: String!,$verification: inputverification, $payment: String!,$plan: String!, $source: String!, $isadmin: Boolean!, $complete: String!, $currentstep: String!,$prevstep: String!,$createdate: Date!, $updatedate: Date!, $createuser: String!, $updateuser: String!, $step:String!, $password:String!, $clinicname:String!){
    user(email:$email, firstName:$firstname, notifyme:$notifyme, lastName:$lastname, title:$title, primaryTelephone:$primaryTelephone, countryCode:$countryCode, business:$business, gender:$gender, avatar:$avatar, dob:$dob, bio1:$bio1, channelid:$channelid, verification:$verification, payment:$payment, plan:$plan, source:$source, isadmin:$isadmin, complete:$complete, currentstep:$currentstep, prevstep:$prevstep, createdate:$createdate, updatedate: $updatedate, createuser: $createuser, updateuser:$updateuser, step:$step, password:$password, clinicname:$clinicname){
      id,
      email,
      firstName,
      lastName,
      title,
      notifyme,
      primaryTelephone,
      countryCode,
      clinicname,
      business{
        btype,
        name,
        bio,
        location{
          line1
          line2
          towncity
          postcode
          state
          country
        },
        website,
        bavatar,
        noofemployees
      },
      gender,
      avatar,
      dob,
      bio1,
      channelid,
      verification{
        idv
        ml
        od
        mi
        ev
      },
      payment,
      plan,
      source,
      isadmin,
      complete,
      step,
      currentstep,
      prevstep,
      createdate,
      updatedate,
      createuser,
      updateuser,
      password
    }
  }`;

const UPDATE_USER = () => `mutation create($id:ID,$obj:String){
    update(id:$id, obj:$obj){
      email
    }
  }`;

const USER_BYSEARCH = () => `query {
  usersBySearch(search: "#search#"){
    id,
      email,
      firstName,
      lastName,
      title,
      primaryTelephone,
      countryCode,
      notifyme,
      clinicname,
      business{
          btype,
          name,
          bio,
          location{
          line1
          line2
          towncity
          postcode
          state
          country
      },
      website,
          bavatar,
          noofemployees
  },
  gender,
      avatar,
      dob,
      bio1,
      channelid,
      verification{
      idv
      ml
      od
      mi
      ev
  },
  payment,
      plan,
      source,
      isadmin,
      complete,
      step,
      currentstep,
      prevstep,
      createdate,
      updatedate,
      createuser,
      updateuser,
      password
    }
  }
`;

const CREATE_SETTINGS =
	() => `mutation create($userid:String!,$general:inputgeneral,$calendar:inputcalendar,$appointment:inputappointment,$notification:inputnotification,$subscription:inputsubscription){
    usersetting(userid:$userid, general:$general, calendar:$calendar, appointment:$appointment, notification:$notification, subscription:$subscription){
      general{
        language,
        country,
        dateformat,
        timeformat,
        timezone,
        status,
      },
      calendar{
            sameeveryday,
            days,
            addlatefee,
            latefeesamount,
            latefeesfrom,
            weekends,
            declinedappoinments,
            shorterappoinments,
            startsweek,
            status,
     },
      appointment{
            radius,
            dayrate,
            interval,
            autoacceptbooking,
            autoacceptconsult,
            bookingfee,
            status,
        },
    notification{
        d_request_approval,
        d_apt_activity,
        d_conslt_request,
        d_new_message,
        e_request_approval,
        e_apt_activity,
        e_conslt_request,
        e_new_message,
        status,
    },
    subscription{
      subscription_id,
      date,
      enable,
      status,
    }
  }
}`;

const UPDATE_SETTINGS = () => `mutation create($userid:String!,$obj:String){
    update(userid:$userid, obj:$obj){
    userid
    }
  }`;

const USERSETTINGS_BYID = () => `query {
    userSettingsByUserID(userid: "#id#"){
     id
     general{
        language,
        country,
        dateformat,
        timeformat,
        status,
        timezone
      },
      calendar{
            sameeveryday,
            days,
            addlatefee,
            latefeesamount,
            latefeesfrom,
            weekends,
            declinedappoinments,
            shorterappoinments,
            status,
            startsweek,
     },
      appointment{
            radius,
            dayrate,
            interval,
            autoacceptbooking,
            autoacceptconsult,
            bookingfee,
            status,
        },
    notification{
        d_request_approval,
        d_apt_activity,
        d_conslt_request,
        d_new_message,
        e_request_approval,
        e_apt_activity,
        e_conslt_request,
        status,
        e_new_message,
    }
  }
}
`;

const GET_SUBSCRIPTIONS = () => `query{
  Subscription{
    id,
    name,
    description,
    details,
    amount,
    bottom_line,
    active
  }
}`;

export const returnCreateSettings = (props) => {
	console.log(props);

	var returnstring = `{
        "userid": "${props.id}",
        "general":{
          "language": "English",
          "country": "United Kingdom",
          "dateformat": "yyyy-MM-dd",
          "timeformat": "H:mm",
          "timezone": "Europe/London|(GMT+0:00) Edinburgh, London|0|GMT|Greenwich Mean Time|",
          "status" : false
        },
        "calendar": {
            "sameeveryday": true,
            "days": "Mon-09:00to17:00|Tue-09:00to17:00|Wed-09:00to17:00|Thu-09:00to17:00|Fri-09:00to17:00",
            "addlatefee": false,
            "latefeesamount": "",
            "latefeesfrom": "",
            "weekends": false,
            "declinedappoinments": true,
            "shorterappoinments": true,
            "startsweek": "Mon",
            "status" : false
        },
        "appointment": {
            "radius": "7",
            "dayrate": "50",
            "interval": "40",
            "autoacceptbooking": true,
            "autoacceptconsult": true,
            "bookingfee": true,
            "status" : false
        },
        "notification": {
            "d_request_approval": true,
            "d_apt_activity": true,
            "d_conslt_request": true,
            "d_new_message": false,
            "e_request_approval": true,
            "e_apt_activity": true,
            "e_conslt_request": true,
            "e_new_message": false,
            "status" : false
        },
        "subscription": {
          "subscription_id": "${props.subscription_id}",
          "date": "#date#",
          "enable": true,
          "status" : false
        }
      }`;
	returnstring = returnstring.replaceAll(
		/#date#/g,
		formatYmd(new Date()).toString()
	);
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
export const returnUpdateSettings = (props) => {
	console.log(props);

	var returnstring = `{
        "userid": "#id#",
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
        "email": "#email#",
        "firstname": "#firstname#",
        "lastname": "#lastname#" ,
        "title": "#title#",
        "primaryTelephone": "#phone#",
        "countryCode": "#countryCode#",
        "clinicname": "#clinicname#",
        "notifyme": false,
        "business":{
          "btype": "#btype#",
          "name": "#name#",
          "bio": "#bio#",
          "location": {
            "line1": "#line1#",
            "line2": "#line2#",
            "towncity": "#towncity#",
            "postcode": "#postcode#",
            "state": "#state#",
            "country": "#country#"
          },
          "website": "#website#",
          "bavatar": "#bavatar#",
          "noofemployees": "#noofemployees#"
        },
        "gender": "#gender#",
        "avatar": "#avatar#",
        "dob": "#dob#",
        "bio1": "#bio1#",
        "channelid": "#channelid#",
        "verification": {
          "idv": [],
          "ml": [],
          "od": [],
          "mi": [],
          "ev": []
        },
        "payment": "#payment#",
        "plan": "#plan#",
        "source": "#source#",
        "isadmin": true,
        "complete": "#complete#",
        "step": "#step#",
        "currentstep": "#currentstep#",
        "prevstep": "#prevstep#",
        "createdate": "#createdate#",
        "updatedate": "#updatedate#",
        "createuser": "#createuser#",
        "updateuser": "#updateuser#",
        "password": "#password#"
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
		/#createdate#/g,
		formatYmd(new Date()).toString()
	);
	returnstring = returnstring.replaceAll(
		/#updatedate#/g,
		formatYmd(new Date()).toString()
	);
	returnstring = returnstring.replaceAll(/#[a-z0-9]{1,}#/g, "");

	return returnstring;
};

const PATIENT_BYID = () => `query {
  patientByID(id: "#id#"){
	      id,
      firstName,
      lastName,
      memberid,
      avatar,
      email,
      dob,
      gender,
      allergies,
      scannedimages,
      password,
      favourites,
      address{
          line1
          line2
          towncity
          postcode
          state
          country
		  isactive
		  id
		  location
        },
address1{
          line1
          line2
          towncity
          postcode
          state
          country
isactive
		  id
		  location
        },
address2{
          line1
          line2
          towncity
          postcode
          state
          country
    	  isactive
		  id
		  location
        },
address3{
          line1
          line2
          towncity
          postcode
          state
          country
		  isactive
		  id
		  location
        }
  	}
  }
`;

export const GetUser = () =>
	axios({
		url: Baseurl() + "aeuser",
		method: "post",
		data: {
			query: GET_USER(),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetUserEmail = () =>
	axios({
		url: Baseurl() + "aeuser",
		method: "post",
		data: {
			query: GET_USER_EMAIL(),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetSubscription = () =>
	axios({
		url: Baseurl() + "subscription",
		method: "post",
		data: {
			query: GET_SUBSCRIPTIONS(),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetUserById = (id) =>
	// console.log("id", id);
	axios({
		url: Baseurl() + "aeuser",
		method: "post",
		data: {
			query: USER_BYID().replace("#id#", id),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const Imageuploader = (file) =>
	// console.log(file);

	axios({
		url: Baseurl() + "uploadmulti",
		data: file,
		method: "post",
		headers: { "Content-Type": "multipart/form-data" },
	}).then((result) => {
		// return file.name;
		console.log(result);
		return result.data.data;
		// return res.data.data;
	});

export const Uploadandupdate = (file, props) =>
	// console.log(file);

	axios({
		url: Baseurl() + "upload",
		data: file,
		method: "post",
		headers: { "Content-Type": "multipart/form-data" },
	}).then((result) => {
		// return file.name;
		// console.log(result);
		// console.log(props);
		axios({
			url: Baseurl() + "aeuser",
			method: "post",
			data: {
				query: UPDATE_USER(),
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

export const GetClinicsByAdmin = () =>
	axios({
		url: Baseurl() + "aeuser",
		method: "post",
		data: {
			query: CLINICS_BY_ADMIN(),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetUserByEmail = (email) =>
	axios({
		url: Baseurl() + "aeuser",
		method: "post",
		data: {
			query: USER_BYEMAIL().replace("#email#", email),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetUserByPhone = (phone) =>
	axios({
		url: Baseurl() + "aeuser",
		method: "post",
		data: {
			query: USER_BYPHONE().replace("#phone#", phone),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const GetUserBySearch = (search) =>
	axios({
		url: Baseurl() + "aeuser",
		method: "post",
		data: {
			query: USER_BYSEARCH().replace("#search#", search),
		},
	}).then((result) => {
		console.log(result);
		return result.data.data;
	});

export const CreateUser = (props) =>
	axios({
		url: Baseurl() + "aeuser",
		method: "post",
		data: {
			query: CREATE_USER(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export const UpdateUser = (props) =>
	axios({
		url: Baseurl() + "aeuser",
		method: "post",
		data: {
			query: UPDATE_USER(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export const ComparePassword = (pwd, hashpwd) =>
	axios({
		url: Baseurl() + "aeuser",
		method: "post",
		data: {
			query: COMPARE_PASSWORD()
				.replace("#password#", pwd)
				.replace("#hash#", hashpwd),
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export const CreateSettings = (props) =>
	axios({
		url: Baseurl() + "usersettings",
		method: "post",
		data: {
			query: CREATE_SETTINGS(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export const UpdateSettings = (props) =>
	// console.log(props);
	axios({
		url: Baseurl() + "usersettings",
		method: "post",
		data: {
			query: UPDATE_SETTINGS(),
			variables: props,
		},
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));

export const GetUserSettingsById = (id) =>
	axios({
		url: Baseurl() + "usersettings",
		method: "post",
		data: {
			query: USERSETTINGS_BYID().replace("#id#", id),
		},
	}).then((result) => {
		// console.log(result);
		return result.data.data;
	});

export async function getDoctors(props) {
	// console.log("checking props", props);
	try {
		const response = await axios({
			url: Baseurl() + "aeuser",
			method: "post",
			data: {
				query: `{
          usersByClinicName (clinicname:"#id#"){
          id
          firstName
          lastName
          avatar
          email
          isadmin
          clinicname
          complete
             }
           }`.replace("#id#", props),
				// variables: propss,
			},
		});
		console.log("data clinic", response.data);
		return response.data;
	} catch (error) {
		return [""];
	}
}

export async function DeleteUser(props) {
	console.log("ee", props);
	var propss = `{
    "id": "#id#"
  }`;
	propss = propss.replace("#id#", props);
	console.log("eew", propss);

	try {
		const response = await axios({
			url: Baseurl() + "aeuser",
			method: "post",
			data: {
				query: `{
          deleteUser (id:"#id#"){
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

export const CreateSumsub = (props) =>
	// {
	// 	console.log(props);
	// 	console.log("files", files);
	// };

	axios({
		url: Baseurl() + "CreateToken",
		method: "post",
		// data: files,
		data: {
			params: props,
			// file: files,
		},
		// headers: { "Content-Type": "multipart/form-data" },
	}).then((result) => {
		// console.log(result);
		return result.data;
	});

export const GetSumsubDocs = (props) =>
	axios({
		url: Baseurl() + "GetSumsubDocuments",
		method: "post",
		data: {
			userid: props,
		},
	}).then((result) => {
		console.log(result);
		return result.data;
	});

export const GetAppointment = (props) =>
	axios({
		url: Baseurl() + `getAll/undefined/${props}`,
		method: "GET",
	})
		.then((res) => {
			console.log(res.data.data);
			return res;
		})
		.catch((err) => console.log(err));

export const GetAppointmentOfPatients = (props) =>
	axios({
		url: Baseurl() + `getAll/${props}/undefined`,
		method: "GET",
	})
		.then((res) => {
			console.log(res.data.data);
			return res;
		})
		.catch((err) => console.log(err));

export const GetPatientById = (id) =>
	axios({
		url: Baseurl() + "patient",
		method: "post",
		data: {
			query: PATIENT_BYID().replace("#id#", id),
		},
	}).then((result) => {
		console.log(result.data.data);
		return result.data;
	});

export const GetAppointmentOfPatientswithDoctors = (pid, did) =>
	axios({
		url: Baseurl() + `getAll/${pid}/${did}`,
		method: "GET",
	})
		.then((res) => {
			console.log(res.data.data);
			return res;
		})
		.catch((err) => console.log(err));

export const CreateAgoraUser = (props) =>
	axios({
		url: Baseurl() + "agoraRegisterUser",
		method: "post",
		data: props,
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => console.log(err));
