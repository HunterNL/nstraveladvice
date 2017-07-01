import { getStations } from '../../../../imports/client/stations';

Template.stationDataList.onCreated(function onstationDataListCreated() {
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
    return getStations();
  },
});
