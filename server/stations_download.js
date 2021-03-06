import { getStationList } from '../imports/ns';

function isInTheNetherlands(station) {
  return station.Land === 'NL';
}

const stations = getStationList().filter(isInTheNetherlands);
const PATH = Meteor.settings.public.STATION_DOWNLOAD_PATH;

const DAY = 60 * 60 * 24;

WebApp.connectHandlers.use(PATH, (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-control', 'public, max-age=' + DAY); // eslint-disable-line prefer-template
  res.writeHead(200);
  res.end(JSON.stringify(stations));
});
