function purePop(array) {
  return array.slice(1,array.length);
}

function getFirstStation(travelPart) {
  return travelPart.ReisStop[0];
}

export function getTransferStations(advice) {
  const {ReisDeel} = advice;
  if(!Array.isArray(ReisDeel)) return []; //Reisdeel is not an array, thus no transfers, thus no tranfer stations
  
  const travelParts = purePop(ReisDeel);
  
  return travelParts.map(getFirstStation);
}

export function getTravelParts(advice) {
  const {ReisDeel} = advice;
  if(!Array.isArray(ReisDeel)) return [ReisDeel];
  return ReisDeel;
}

export function getJourneyStations(advice) {
  const firstTravelPart = getFirstTravelPart(advice);
  const lastTravelPart = getLastTravelPart(advice);

  return [].concat(getDepartureStation(firstTravelPart),getTransferStations(advice),getArrivalStation(lastTravelPart));
}

export function getFirstTravelPart(advice) {
  const {ReisDeel} = advice;
  if(!Array.isArray(ReisDeel)) return ReisDeel;
  
  return ReisDeel[0];
}

export function getLastTravelPart(advice) {
  const {ReisDeel} = advice;
  if(!Array.isArray(ReisDeel)) return ReisDeel;
  
  return ReisDeel[ReisDeel.length-1];
}

export function getDepartureStation(travelPart) {
  return travelPart.ReisStop[0];
}

export function getArrivalStation(travelPart) {
  return travelPart.ReisStop[travelPart.ReisStop.length-1];
}