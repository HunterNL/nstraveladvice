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

export function formatJourneyPart(journeyPart) {
  return {
    track: journeyPart.stops[0].track.track,
    time: journeyPart.stops[0].time,
    trainDestination: arrayLast(journeyPart.stops).name,
    departureStation: journeyPart.stops[0].name,
    trainType: journeyPart.type,
    arrivalTime: arrayLast(journeyPart.stops).time,
  };
}

export function formatTransfer(lastPart, nextPart) {
  const transferTimeMiliseconds = (nextPart.stops[0].time - arrayLast(lastPart.stops).time);
  const transferTime = Math.floor(transferTimeMiliseconds / (1000 * 60));
  
  return {
    station: nextPart.stops[0].name,
    arrivalTrack: arrayLast(lastPart.stops).track.track,
    transferTime,
    departureTime: nextPart.stops[0].time,
    departureTrack: nextPart.stops[0].track.track,
    trainDirection: arrayLast(nextPart.stops).name,
    trainType: nextPart.type,
  };
}

export function formatTransfers(journey) {
  return combine(journey.journeyParts, formatTransfer);
}
