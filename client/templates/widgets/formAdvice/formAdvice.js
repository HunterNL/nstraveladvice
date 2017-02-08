import { gatherFields } from '/imports/harvest.js';
// import testData from "/testData/api_advice.json";

function hasTransfers(oppertunity) {
  return oppertunity.AantalOverstappen !== '0';
}

function hasNoTransfers(oppertunity) {
  return !hasTransfers(oppertunity);
}


Template.formAdvice.onCreated(function onformAdviceCreated() {
  this.advices = new ReactiveVar([]);
});

Template.formAdvice.onRendered(() => {

});

Template.formAdvice.events({
  submit(e, tmp) {
    e.preventDefault();
    
    const options = gatherFields(tmp);
    
    Meteor.call('getTravelAdvise', options, (err, res) => {
      if (err) throw err;
      
      console.log('Set advices to ', res);
      tmp.advices.set(res);
    });
  },
});

Template.formAdvice.helpers({
  advices() {
    return Template.instance().advices.get();
  },
});
