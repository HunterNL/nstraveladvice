import { getStationList } from '../imports/ns';

const stations = getStationList();
const PATH = Meteor.settings.public.STATION_DOWNLOAD_PATH;

WebApp.connectHandlers.use(PATH, (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(stations));
});
