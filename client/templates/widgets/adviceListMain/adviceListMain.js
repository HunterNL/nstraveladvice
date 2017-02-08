import {getJourneyStations, getTravelParts, getDepartureStation,getFirstTravelPart,getArrivalStation} from "/imports/advice";
import moment from "moment";

Template.adviceListMain.onCreated(function onadviceListMainCreated() {
  console.log(this);
  if(!this.data.advices) {
    throw new Meteor.Error("adviceListMain_no_advices");
  }
});

Template.adviceListMain.onRendered(function onadviceListMainRendered() {

}); 

Template.adviceListMain.events({
 
});

Template.adviceListMain.helpers({
  debug(a) {
    console.log(a);
  },
  
  advices() {
    return Template.currentData().advices;
  },
  
  getStations(advice)  {
    return getJourneyStations(advice);
  },
  
  departureStation(advice) {
    return getDepartureStation(getFirstTravelPart(advice));
  },
  
  travelParts(advice) {
    return getTravelParts(advice);
  },
  
  arrivalStationTravelPart(travelPart) {
    return getArrivalStation(travelPart);
  },
  
  formatDate(dateString) {
    return moment(dateString).format("HH:mm")
  }
});
