# LineRate Backup Manager

### Install
```
git clone https://github.com/b225ccc/linerate_backup_manager.git
npm install
```

### Configuration
See **config.json** section below.

### Usage
`node lib/index.js`

This will backup each host defined in `config.json`.

You may want to create a cron job for this.

---

### The backup file name
The backup filename will be in the format `backup_<host>_<timestamp>.tar.bz2`, where `host` is taken from `config.json` and `timestamp` is in the format `YYYYMMDD-HHmmss.SSS`.  Example: `backup_172.16.87.196_20150623-121740.897.tar.bz2`.

### config.json

The `hosts` top-level key should contain and array of objects, with each element in the array defining one host.

The `backup` top-level key contains global backup-related settings.

Supported keys in the host blocks:

* `host`
* `port`
* `username`
* `password`
* `destination`  
  Optional.  By default, the backup will be saved locally to `/home/linerate/backups/`.  You can specify an alternate local path here or a network destination.  You must use a full URI (`file://...`, `scp://...`.  See the docs [here](https://docs.lineratesystems.com/087Release_2.6/250REST_API_Reference_Guide/exec/system/util/backup/home).  Note that you'll probably need to specify SSH username and password in the SCP URI (`scp://user:pass@host:/backups/`).  The filename will automatically be appended to the path set here.

Supported keys in the backup block:

* `concurrency`  
  This defines the maximum number of backups that will run in parallel.  If this key is missing or set to `0`, it will default to 10.


### Network backups
By default, backups will be saved locally to `/home/linerate/backups`.  If the host configuration declaration contains a 'destination' key containing an array of one or more destinations.

If you specify a network destination, you'll need to have SSH keys exchanged beforehand.  Only specify the path; the actual filename will be generated automatically and appended to the path.