import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import moment from "moment";

function toObject(array) {
  return array.reduce(function(acc,cur) {
    acc[cur.key]=cur.value;
    return acc;
  },{})
}


function selectAdvice(travelOppertunities) {
  for (var i = 0; i < travelOppertunities.length; i++) {
    var to = travelOppertunities[i]
    console.log(to);
    if(to.AantalOverstappen === "0") {
      console.log("Got advice!");
      return to
    }
  }
  
  throw new Error("no_oppertunities_selected");
}

import {Stations} from "/imports/stations";

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  //this.subscribe('stations.all');
});

Template.adviceSingle.helpers({
  debug(a) {
    console.log(this,a);
  },
  
  formatDate(dateString) {
    return moment(dateString).format("HH:mm")
  }
})


Template.hello.helpers({
  stations() {
    return Stations.find();
  },
  
  
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
