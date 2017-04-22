import moment from 'moment';

function combine(array, func) {
  const returnArray = [];
  
  for (let i = 0; i < array.length - 1; i++) {
    returnArray.push(func(array[i], array[i + 1]));
  }
  
  return returnArray;
}


function arrayLast(array) {
  return array[array.length - 1];
}

function formatJourneyPart(journeyPart) {
  return {
    track: journeyPart.stops[0].track.track,
    time: journeyPart.stops[0].time,
    trainDestination: arrayLast(journeyPart.stops).name,
    trainType: journeyPart.type,
    arrivalTime: arrayLast(journeyPart.stops).time,
  };
}

function formatTransfer(lastPart, nextPart) {
  return {
    arrivalTrack: arrayLast(lastPart.stops).track.track,
    transferTime: 404,
    departureTrack: nextPart.stops[0].track.track,
    trainDirection: arrayLast(nextPart.stops).name,
    trainType: nextPart.type,
  };
}

function formatTransfers(journey) {
  console.log(combine(journey.journeyParts, formatTransfer));
  return combine(journey.journeyParts, formatTransfer);
}
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
    console.log(formatJourneyPart(arrayLast(this.journey.journeyParts)));
    return formatJourneyPart(arrayLast(this.journey.journeyParts));
  },
  
  formatTime(date) {
    return moment(date).format('HH:mm');
  },
});
