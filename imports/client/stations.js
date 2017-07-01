import { HTTP } from 'meteor/http';
import { ReactiveVar } from 'meteor/reactive-var';
import createEventListener from "../justevents";

const stations = new ReactiveVar();
const eventListener = createEventListener();

HTTP.get(Meteor.settings.public.STATION_DOWNLOAD_PATH, {}, (err, res) => {
  if (err) throw err;
  stations.set(res.data);
  eventListener.fireCallbacks(res.data);
});

export function getStations() {
  return stations.get();
}

export function onHasStations(cb) {
  eventListener.registerCallback(cb);
}
