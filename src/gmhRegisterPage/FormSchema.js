export const Countrys = window.Countrys = require("../../data/countries.json");//.map(x=> `(${x.code}) ${x.name}`);
export const Airports = window.s = require("../../data/airports.json");//.map(x=> `(${x.code}) ${x.name}`);

export const FormSchema = {
    "title": "Register",
    "description": "Register here to have your information passed on to the foreign office and websites",
    "type": "object",
    "required": [
      "firstName",
      "lastName"
      , "phone"
      , "email"
      , "dob"
      //, "notes"
    ],
    "properties": {
      "firstName": {
        "type": "string",
        "title": "First name",
        "default": "Chuck"
      },
      "lastName": {
        "type": "string",
        "title": "Last name"
      },
      "phone": {
        "type": "string",
        "format": "phone",
        "title": "Phone number"
      },
      "email": {
        "type": "string",
        "format": "email",
        "title": "Email address"
      },
      "dob": {
        "type": "string",
        "title": "Date of Birth",
        "format": "date"
      },
      "currently": {
        "type": "object",
        "title": "Where are you now?",
        "description": "Describe as clearly as you can where you are now",
        "required": [
          "country",
          "airport",
          "address"
        ],
        "properties": {
          "country": {
            "type": "number",
            "title": "Country",
            "enum": Countrys.map((x,i)=>i), //x.code
            "enumNames": Countrys.map(x=>x.name),
            "examples": Countrys.map(x=> `(${x.code}) ${x.name}`),
          },
          "airport": {
            "type": "number",
            "title": "Airport",
            "enum": Airports.map((x,i)=>i), //x.code
            "enumNames": Airports.map(x=>x.name),
            "examples": Airports.map(x=> `(${x.code}) ${x.name}`),
          },
          "address": {
            "type": "string",
            "title": "Current address"
          }
        }
      },
      "residence": {
        "type": "object",
        "title": "Where do you live?",
        "description": "Describe as clearly as you need to be, where is 'home'?",
        "required": [
          "country",
          "airport",
          "address"
        ],
        "properties": {
          "country": {
            "type": "number",
            "title": "Country",
            "enum": Countrys.map((x,i)=>i), //x.code
            "enumNames": Countrys.map(x=>x.name),
            "examples": Countrys.map(x=> `(${x.code}) ${x.name}`),
          },
          "airport": {
            "type": "number",
            "title": "Airport",
            "enum": Airports.map((x,i)=>i), //x.code
            "enumNames": Airports.map(x=>x.name),
            "examples": Airports.map(x=> `(${x.code}) ${x.name}`),
          },
          "address": {
            "type": "string",
            "title": "Home address"
          }
        }
      },
      "flight": {
        "type": "object",
        "title": "Original Flight",
        "description": "If you had a flight booked and it was cancelled, please provide details here",
        "properties": {
          "flightno": {
            "type": "string",
            "title": "Flight number"
          },
          "airline": {
            "type": "string",
            "title": "Flight number"
          }
        }
      },
      "other": {
        "type": "object",
        "title": "Other information",
        "description": "Anything else that might help the aurlines help you",
        "properties": {
          "notes": {
            "type": "string",
            "title": "Other information",
            "ui:widget": "textarea"
          }
        }
      },
    }
}