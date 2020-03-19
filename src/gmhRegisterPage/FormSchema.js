const Countries = window.Countries = require("../../data/countries.json").map(x=> `(${x.code}) ${x.name}`);
const Airports = window.Airports = require("../../data/airports.json").map(x=> `(${x.airportCode}) ${x.airportName}`);

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
            "type": "string",
            "title": "Country",
            "examples": Countries
          },
          "airport": {
            "type": "string",
            "title": "Airport",
            "examples": Airports
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
            "type": "string",
            "title": "Country",
            "examples": Countries
          },
          "airport": {
            "type": "string",
            "title": "Airport",
            "examples": Airports
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
            "title": "Other information"
          }
        }
      },
    }
}