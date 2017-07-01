Template.adviceListMain.onCreated(function onadviceListMainCreated() {
  if (!this.data.advices) {
    throw new Meteor.Error('adviceListMain_no_advices');
  }
});

Template.adviceListMain.onRendered(() => {

}); 

Template.adviceListMain.events({
  'click [data-action=select-advice]': function (event, templateInstance) {
    templateInstance.data.selectedAdvice.set({ journey: this });
  },
});

Template.adviceListMain.helpers({

});
