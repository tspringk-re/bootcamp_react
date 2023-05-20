/* eslint-env node */
const port = process.env.PORT ?? 4444;
module.exports = {
  server: {
    command: `concurrently "npm run start:server_backend" "npm run start:server_frontend"`,
    port: port,
    launchTimeout: 30000,
  },
  launch: {
    headless: "new",
  },
  browserContext: "incognito",
};
