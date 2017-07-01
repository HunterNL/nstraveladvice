import { getStations } from '../../../../imports/client/stations';

function getStationName(station) {
  return station.Namen.Lang;
}

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
    return getStations()//.map(getStationName);
  },
});
