import moment from 'moment';
import { formatJourneyPart, formatTransfers } from '../../../../imports/journey';

const CLASS_NORMAL = '';
const CLASS_LOW_TRANSFER_TIME = 'text-color-warning';
const SHORT_CONNECTION_MINUTES = 5;


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
  
  transferWarning(minutes) {
    return (minutes < SHORT_CONNECTION_MINUTES ? CLASS_LOW_TRANSFER_TIME : CLASS_NORMAL);
  },
});
