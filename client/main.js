import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { gatherFields} from "/imports/utils.js";
import moment from "moment";

function toObject(array) {
  return array.reduce(function(acc,cur) {
    acc[cur.key]=cur.value;
    return acc;
  },{})
}

function hasTransfers(oppertunity) {
  return oppertunity.AantalOverstappen !== "0"
}

function hasNoTransfers(oppertunity) {
  return !hasTransfers(oppertunity)
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

var Stations = new Mongo.Collection("stations");

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  //this.subscribe('stations_all');
});

Template.adviceForm.onCreated(function(){
  this.advices = new ReactiveVar();
})

Template.advice2.helpers({
  debug(a) {
    console.log(this,a);
  },
  
  formatDate(dateString) {
    return moment(dateString).format("HH:mm")
  }
})

Template.adviceForm.events({
  "submit" :function (e,tmp) {
    e.preventDefault()
    
    var options = toObject(gatherFields(tmp));
    
    Meteor.call("getTravelAdvise",options,function(err,res) {
      if(err) throw err;
      
      console.log("Set advices to ",res);
      tmp.advices.set(res.filter(hasNoTransfers));
    })
  }
})

Template.adviceForm.helpers({
  advices() {
    return Template.instance().advices.get();
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
