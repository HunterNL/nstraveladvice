import moment from 'moment';
import { formatJourneyPart, formatTransfers } from '../../../../imports/journey';

/*
{{arrivalTrack}}
{{transferTime}}
{{departureTrack}}
{{departureTime}}
{{trainDirection}}
{{trainType}}
 */

Template.journey.onCreated(function onjourneyCreated() {
  if (!this.data.journey) {
    throw new Meteor.Error('journey template missing journey data');
  }
});

Template.journey.onRendered(() => {

});

Template.journey.events({

});

Template.journey.helpers({
  departure() {
    return formatJourneyPart(this.journey.journeyParts[0]);
  },
  
  transfers() {
    return formatTransfers(this.journey);
  },
  
  arrival() {
    const journeyParts = this.journey.journeyParts;
    return formatJourneyPart(journeyParts[journeyParts.length - 1]);
  },
  
  formatTime(date) {
    return moment(date).format('HH:mm');
  },
});
