import { Stations } from '/imports/stations';

Template.stationDataList.onCreated(function onstationDataListCreated() {
  this.subscribe('stations.all');
  
  if (!this.data.id) {
    throw new Meteor.Error('stationDataList_requires_id');
  }
});

Template.stationDataList.onRendered(() => {

});

Template.stationDataList.events({

});

Template.stationDataList.helpers({
  stations() {
    return Stations.find();
  },
});
