import { Meteor } from 'meteor/meteor';
import { getStationList, getTravelAdvise} from "/imports/ns.js";

var Stations = new Mongo.Collection("stations");

function insertIntoStationsCollection(station) {
  Stations.insert(station)
}

Meteor.publish("stations.all",function(){
  return Stations.find();
})

function updateStationList() {
  var stations = getStationList();
  Stations.remove({});
  stations.forEach(insertIntoStationsCollection);
}

Meteor.startup(() => {
  if(!Meteor.settings.NS_API_NAME) {
    throw new Meteor.Error("api_name_missing","Missing NS API name")
  }
  
  if(!Meteor.settings.NS_API_PASSWORD) {
    throw new Meteor.Error("api_password_missing","Missing NS API password");
  }
});

// WebApp.connectHandlers.use("/api",function(req,res,next) {
  // res.writeHead(200);
  // res.end(Object.keys(getStationList()).toString())
  //res.end(JSON.stringify(getStationList()));
  // console.log("Done");
// })
// 

var methods = {
  updateStationList,
  getTravelAdvise
}

Meteor.methods(methods);