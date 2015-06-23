'use strict';

var async = require('async');
var moment = require('moment');
var config = require('../config.json');
var Linerate = require('linerate_node_rest_api_module');

var concurrency = config.backup.concurrency || 10;

function do_backup(host, callback) {
  var linerate = new Linerate();
  linerate.connect(host, function(err) {
    if (err) {
      console.log('Could not connect to host ' + 
          host.host + 
          '.  Skipping.');
      console.log(err);
      return;
    }

    var destination = ['backup', host.host, get_stamp()].join('_');

    if (host.destination) {
      destination = host.destination + destination;
      if (destination.indexOf('scp') === 0) {
        destination += '.tar.bz2';
      }
    }

    console.log('Starting backup for host ' + 
        host.host + 
        ', dest = ' + 
        destination);
    linerate.backup_home(destination, function(err) {
      if (err) {
        console.log('Backup failed for host ' + host.host);
        console.log(err);
        return;
      }

      console.log('Backup completed for host ' + host.host);
      callback();

    });

  });
}

function get_stamp() {
  return moment().format('YYYYMMDD-HHmmss.SSS');
}

async.eachLimit(config.hosts, concurrency, do_backup, function(err) {
  if (err) { 
    console.log(err);
  } else { 
    console.log('All backups completed successfully');
  }
});
