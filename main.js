const {homedir} = require('os');
const {join} = require('path');
const carlo = require('carlo');

(async () => {
  // Launch the browser.
  const app = await carlo.launch({
    bgcolor: '#c5cbe8',
    width: 500,
    height: 500,
    userDataDir: join(homedir(), '.carlo-stater'),
    args: process.env.DEV === 'true' ? ['--auto-open-devtools-for-tabs'] : []
  });
  
  // Tell carlo where your web files are located.
  await app.serveFolder(join(__dirname, 'www'));
  await app.serveFolder(join(__dirname, 'node_modules'), 'node_modules');
  
  // Expose 'env' function in the web environment.
  await app.exposeFunction('env', _ => process.env);
  
  // Navigate to the main page of your app.
  await app.load('index.html');

  // app event
  app.on('exit', () => process.exit());
})();