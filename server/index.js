const chalk = require('chalk');
const server = require('./app');
// const app = require('app');
const PORT = process.env['PORT'] ?? 5001;
// const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(
    chalk.blueBright('Server is listening on PORT:'),
    chalk.yellow(PORT),
    chalk.blueBright('Pollution up and running!')
  );
});
