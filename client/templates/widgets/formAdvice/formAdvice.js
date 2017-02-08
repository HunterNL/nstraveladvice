import {gatherFields} from "/imports/harvest.js";
// import testData from "/testData/api_advice.json";

function hasTransfers(oppertunity) {
  return oppertunity.AantalOverstappen !== "0"
}

function hasNoTransfers(oppertunity) {
  return !hasTransfers(oppertunity)
}


Template.formAdvice.onCreated(function onformAdviceCreated() {
  this.advices = new ReactiveVar([]);
});

Template.formAdvice.onRendered(function onformAdviceRendered() {

});

Template.formAdvice.events({
  "submit" :function (e,tmp) {
    e.preventDefault()
    
    var options = gatherFields(tmp);
    
    Meteor.call("getTravelAdvise",options,function(err,res) {
      if(err) throw err;
      
      console.log("Set advices to ",res);
      tmp.advices.set(res);
    })
  }
});

Template.formAdvice.helpers({
  advices() {
    return Template.instance().advices.get();
  }
});
