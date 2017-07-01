Template.adviceListMain.onCreated(function onadviceListMainCreated() {
  if (!this.data.advices) {
    throw new Meteor.Error('adviceListMain_no_advices');
  }
});

Template.adviceListMain.onRendered(() => {

}); 

Template.adviceListMain.events({
 
});

Template.adviceListMain.helpers({

});
