import moment from 'moment';

/* eslint-disable quote-props */
const statusMap = {
  'VOLGENS-PLAN': 'AS_PLANNED',
  'VERTRAAGD': 'DELAYED',  
  'GEWIJZIGD': 'PLAN_CHANGED',  // Temporary new route/timing
  'NIET-OPTIMAAL': 'NOT_OPTIMAL', // /probably/ just AS_PLANNED, but there's a faster train for the given journey
  'NIEUW': 'NEW', // unscheduled extra train
  'NIET-MOGELIJK': 'IMPOSSIBLE', // Connection missed due to delay?
  'OVERSTAP-NIET-MOGELIJK': 'IMPOSSIBLE-TRANSFER',
  'GEANNULEERD': 'CANCELLED',
};
/* eslint-enable quote-props */


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

    liveTravelTime: option.ActueleReisTijd,
    liveDepartureTime: parseTime(option.ActueleVertrekTijd),
    liveArrivalTime: parseTime(option.ActueleAankomstTijd),
    
    plannedTravelTime: option.GeplandeReisTijd,
    plannedDepartureTime: parseTime(option.GeplandeVertrekTijd),
    plannedArrivalTime: parseTime(option.GeplandeAankomstTijd),
    
    
    optimal: normalizeBoolean(option.Optimaal),
    
    state: lookupStatus(option.Status),
    
    journeyParts: [].concat(option.ReisDeel).map(normalizeJourneyPart),
    
  };
}

