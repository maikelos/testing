/**
 * Main application startup file
 */
'use strict';

var koe = require('./koe');
var logger = koe.logger;
var express = require('express');
var CronJob = require('cron').CronJob;
var rssImporter = require('./rssImport');

var app = express();

// Assert API key is present
if(!koe.config.rssimporter.apikey) {
  logger.error('Missing config.rssimporter.apikey / RSSIMPORTER_APIKEY setting');
  process.exit();
}

logger.info('--------------------------------------------');
logger.info('-  Starting Marketplace RSS Importer       -');
logger.info('--------------------------------------------');

// Application health check end point.
app.get('/check', function(req, res) {
  res.status(200);
  res.send('OK');
});

logger.info("Environment : ", koe.config.environment);
logger.info("Marktplace Post URL : ", koe.config.rssimporter.marketplacePostURL);
logger.info('Schedule set as ', koe.config.rssimporter.schedule);

// Run RSS Importer as scheduled cron job
var runImporterCron = new CronJob(koe.config.rssimporter.schedule, function() {
  logger.info('Executing RSS Importer at ', new Date());
  rssImporter.runImporter();
}, null, true, 'UTC');

// Start app
var server = app.listen(koe.config.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  logger.info('Express server listening at http://%s:%s', host, port);
});