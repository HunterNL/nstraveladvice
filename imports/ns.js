var zlib = require("zlib");
import xml2json from "xml2json";
import querystring from "querystring";

console.log(xml2json);

var NS_API_NAME = Meteor.settings.NS_API_NAME;
var NS_API_PASSWORD = Meteor.settings.NS_API_PASSWORD;

var authString = NS_API_NAME+":"+NS_API_PASSWORD;

var baseURL = "https://webservices.ns.nl/";
var adviceUrl = "ns-api-treinplanner"
var stationsURL = "ns-api-stations-v2";

function throwIfErrorProperty(object) {
  if(object.error) {
    throw new Error(object.error.message);
  }
  
  return object;
}

function decodeRequest(resultString) {
  return JSON.parse(xml2json.toJson(resultString));
}


function makeRequest(path) {
  return throwIfErrorProperty(decodeRequest(HTTP.get(baseURL+path,{auth:authString,npmRequestOptions:{gzip:true}}).content));  
}


export function getStationList() {
  return makeRequest(stationsURL).Stations.Station;
}

export function getTravelAdvise(options) {
  return makeRequest(adviceUrl+"?"+querystring.stringify(options)).ReisMogelijkheden.ReisMogelijkheid;
}
