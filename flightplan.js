var plan = require('flightplan');

var appName = 'telegram-tetris';
var ip = '46.101.120.73';
var username = 'deploy';
var startFile = 'server.js';

var tmpDir = appName+'-' + new Date().getTime();


// configuration
plan.target('staging', [
  {
    host: ip,
    username: username,
    agent: process.env.SSH_AUTH_SOCK
  }
]);

// run commands on localhost
plan.local(function(local) {
  // uncomment these if you need to run a build on your machine first
  // local.log('Run build');
  // local.exec('gulp build');

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files', {silent: true});
  filesToCopy.stdout += 'config.js\n';
  // rsync files to all the destination's hosts
  local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

// run commands on remote hosts (destinations)
plan.remote(function(remote) {
  remote.log('Move folder to root');
  remote.sudo('cp -R /tmp/' + tmpDir + ' ~', {user: username});
  remote.rm('-rf /tmp/' + tmpDir);

  remote.log('Install dependencies');
  remote.sudo('npm --production --prefix ~/' + tmpDir + ' install ~/' + tmpDir, {user: username});

  remote.log('Setup SSL');
  remote.exec('openssl req -newkey rsa:2048 -sha256 -nodes -keyout ~/'+tmpDir+'/private.key -x509 -days 365 -out ~/'+tmpDir+'/public.pem -subj "/C=DE/ST=Baden Wuerttemberg/L=Stuttgart/O=LuLeBe/CN='+ip+'"');

  remote.log('Reload application');
  remote.sudo('ln -snf ~/' + tmpDir + ' ~/'+appName, {user: username});
  remote.exec('forever stop ~/'+appName+'/'+startFile, {failsafe: true});
  remote.exec('forever start ~/'+appName+'/'+startFile);
});
