import moment from 'moment';

const statusMap = {
  'VOLGENS-PLAN': 'AS_PLANNED',
};


export function normalizeBoolean(stringBool) {
  const lowerStringBool = stringBool.toLocaleLowerCase();
  
  if (lowerStringBool === 'false') {
    return false;
  }
  
  if (lowerStringBool === 'true') {
    return true;
  }
  
  throw new Meteor.Error('bool_parse_error', `Cannot parse bool value ${stringBool}`);
}


function lookupStatus(status) {
  const newStatus = statusMap[status];

  if (!newStatus) {
    throw new Meteor.Error('unknown_journey_status', `Could not find journey status ${status}`);
  }

  return newStatus;
}

function parseTime(dateString) {
  const time = moment(dateString, 'YYYY-MM-DD[T]HH:mm:ss ZZ');
  if (!time.isValid) {
    throw new Meteor.Error('timeparsing_error', 'Failed to parse time', { dateString });
  }
  
  return time.toDate();
}

export function normalizeTrack(track) {
  return {
    changed: normalizeBoolean(track.wijziging),
    track: track.$t,
  };
}

export function normalizeJourneyStop(stop) {
  return {
    name: stop.Naam,
    time: parseTime(stop.Tijd),
    track: (stop.Spoor ? normalizeTrack(stop.Spoor) : null),
  };
}

export function normalizeJourneyPart(journey) {
  return {
    stops: [].concat(journey.ReisStop).map(normalizeJourneyStop),
    
    type: journey.VervoerType,
    company: journey.Vervoerder,
    kind: journey.reusSoort,
    
    scheduleNumber: journey.RitNummer,
    
    status: lookupStatus(journey.Status),
    
  };
}

export function normalizeJourneyOption(option) {
  return {
    transferCount: parseInt(option.AantalOverstappen, 10),
    
    liveArrivalTime: parseTime(option.ActueleAankomstTijd),
    liveTravelTime: parseTime(option.ActueleReisTijd),
    liveDepartureTime: parseTime(option.ActueleVertrekTijd),
    
    plannedArrivalTime: parseTime(option.GeplandeAankomstTijd),
    plannedTravelTime: parseTime(option.GeplandeReisTijd),
    plannedDepartureTime: parseTime(option.GeplandeVertrekTijd),
    
    optimal: normalizeBoolean(option.Optimaal),
    
    state: lookupStatus(option.Status),
    
    journeyParts: [].concat(option.ReisDeel).map(normalizeJourneyPart),
    
  };
}

