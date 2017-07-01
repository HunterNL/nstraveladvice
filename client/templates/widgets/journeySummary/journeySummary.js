import moment from 'moment';
import { formatJourneyPart, formatTransfers } from '../../../../imports/journey';

Template.journeySummary.onCreated(() => {
  
});

Template.journeySummary.onRendered(() => {

});

Template.journeySummary.events({

});

Template.journeySummary.helpers({
  departure() {
    return formatJourneyPart(this.journey.journeyParts[0]);
  },
  
  transfers() {
    return formatTransfers(this.journey);
  },
  
  arrival() {
    const journeyParts = (this.journey.journeyParts);
    return formatJourneyPart(journeyParts[journeyParts.length - 1]);
  },
  
  formatTime(date) {
    return moment(date).format('HH:mm');
  },
});
