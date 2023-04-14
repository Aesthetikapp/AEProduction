const CREATE_PATIENTSETTINGS =
	() => `mutation create($patientid:String!,$consultation:inputconsultation,$treatment:inputtreatment,$message:inputmessage){
    patientsetting(patientid:$patientid, consultation:$consultation, treatment:$treatment, message:$message){
    patientid,
      consultation{
        receiveNew,
	    receiveCancel,
	    receiveNotification1hr,
	    receiveNotification24hr,
	    receiveNotification2hr,
	    receiveNotification15min,
        status,
      },
      treatment{
        receiveNew,
	    receiveCancel,
	    receiveNotification1hr,
	    receiveNotification24hr,
	    receiveNotification2hr,
	    receiveNotification15min,
        status,
     },
      message{
        receiveNew,
        status,
    }
  }
}`;

const UPDATE_PATIENTSETTINGS =
	() => `mutation create($patientid:String!,$obj:String){
    update(patientid:$patientid, obj:$obj){
    patientid
    }
  }`;

const PATIENTSETTINGS_BYID = () => `query {
    patientSettingsByPatientID(patientid: "#id#"){
     id,
     consultation{
        receiveNew,
	    receiveCancel,
	      receiveNotification1hr,
	    receiveNotification24hr,
	    receiveNotification2hr,
	    receiveNotification15min,
        status
      },
      treatment{
        receiveNew,
	    receiveCancel,
	    receiveNotification1hr,
	    receiveNotification24hr,
	    receiveNotification2hr,
	    receiveNotification15min,
        status,
     },
      message{
        receiveNew,
        status,
    }
  }
}
`;

export const returnCreatePatientSettings = (props) => {
	console.log(props);

	var returnstring = `{
        "patientid": "${props.id}",
        "consultation":{
          "receiveNew": true,
          "receiveCancel": true,
          "receiveNotification1hr": true,
          "receiveNotification24hr": true,
          "receiveNotification2hr": true,
          "receiveNotification15min": true,
          "status" : false
        },
        "treatment": {
          "receiveNew": true,
          "receiveCancel": true,
          "receiveNotification1hr": true,
          "receiveNotification24hr": true,
          "receiveNotification2hr": true,
          "receiveNotification15min": true,
          "status" : false
        },
        "message": {
            "receiveNew": true,
            "status" : false
        }
      }`;

	return returnstring;
};

export const returnUpdatePatientSettings = (props) => {
	var returnstring = `{
        "patientid": "#id#",
        "obj": "#obj#"
    }`;
	const id = props.id;
	delete props.id;
	const escapestr = JSON.stringify(props).replaceAll(/"/g, '\\"');
	returnstring = returnstring.replaceAll(/#id#/g, id);
	returnstring = returnstring.replaceAll(/#obj#/g, escapestr);

	return returnstring;
};

// --------------------------- patient payment details-------------------

const CREATE_PATIENTPAYMENTDETAILS =
	() => `mutation create($patientid: String!, $number:String!, $expiry: String!, $name: String!, $default: Boolean!){
    patientpaymentdetails(patientid:$patientid, number:$number, expiry:$expiry, name:$name, default:$default){
        patientid,
        number,
        expiry,
        name,
        default
    }
  }`;

const UPDATE_PATIENTPAYMENTDETIALSBYID =
	() => `mutation create($id:ID,$obj:String){
    update(id:$id, obj:$obj){
      patientid
    }
  }`;

const UPDATE_PATIENTPAYMENTDETIALSBYPATIENTID =
	() => `mutation create($patientid:String,$obj:String){
    updateByPatientid(patientid:$patientid, obj:$obj){
      patientid
    }
  }`;

export const returnUpdateVariablesByID = (props) => {
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
        "patientid": "#patientid#",
        "number": "#number#",
        "expiry": "#expiry#",
        "name": "#name#",
        "default": #default#
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

const PATIENTPAYMENTDETAILS_BYID = () => `query {
  patientpaymentByID(id: "#id#"){
      id,
	  patientid,
      number,
      expiry,
      name,
      default
  	}
  }
`;

const PATIENTPAYMENTDETAILS_BYPATIENTID = () => `query {
  patientpaymentBypatientid(patientid: "#id#"){
      id,
	  patientid,
      number,
      expiry,
      name,
      default
  	}
  }
`;

const GET_PATIENTPAYMENTDETAILS = () => `query{
    patientpayment{
       id,
	  patientid,
      number,
      expiry,
      name,
      default
    }
}`;
