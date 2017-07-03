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
  this.selectedAdvice = new ReactiveVar();
  
  const self = this;
  
  // For easy developemnt for now
  Meteor.call('getTravelAdvise', { fromStation: 'LEDN', toStation: 'Maastricht' }, (err, res) => {
    if (err) throw err;
    self.advices.set(res);
  });
  
  window.addEventListener('popstate', (event) => {
    console.log(event);
    this.selectedAdvice.set(null);
    console.log(this.selectedAdvice.get());
  });
});

Template.formAdvice.onRendered(() => {

});

Template.formAdvice.events({
  submit(e, tmp) {
    e.preventDefault();
    
    const options = gatherFields(tmp);
    
    Meteor.call('getTravelAdvise', options, (err, res) => {
      if (err) throw err;
      tmp.advices.set(res);
    });
  },
});

Template.formAdvice.helpers({
  advices() {
    return Template.instance().advices.get();
  },
  
  selectedAdvice() {
    return Template.instance().selectedAdvice;
  },
  
  navcolumn_active_class() {
    return (Template.instance().selectedAdvice.get() ? 'active' : '');
  },
});
