import { userConstants } from '../_constants';

export function registration(state = {

  registering: false,
  registered: false,
  user: {
    "currently":{
       "country":{
          "name":"",
          "code":"",
       },
       "airport":{
          "name": "",
          "city": "",
          "country": "",
          "code": "",
          "lat": "",
          "lng": "",
          "timezone": "",
       },
       "address":""
    },
    "residence":{
       "country":{
          "name":"",
          "code":""
       },
       "airport":{
          "name":"",
          "city":"",
          "country":"",
          "code":"",
          "lat":"",
          "lng":"",
          "timezone":""
       },
       "address":""
    },
    "flight":{
       "flightno":"",
       "airline":"",
    },
    "other":{
       "notes":""
    },
    "firstName":"",
    "lastName":"",
    "phone":"",
    "email":"",
    "dob":""
 },

}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { ...state, registering: true };
    case userConstants.REGISTER_SUCCESS:
      return { ...state, registered:true };
    case userConstants.REGISTER_FAILURE:
      return {};
    case userConstants.REGISTER_INPUT:
      return { ...state, user: action.payload };
    default:
      return state
  }
}