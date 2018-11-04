const nodemon = require('nodemon');
const {
    join,
    resolve
} = require('path');
const {
    echo,
} = require('shelljs');
const chalk = require('chalk');
const clear = require('console-clear');
const pkg = require('../package');

const entryFile = pkg.main || 'index.js';
const nodemonConfig = pkg.nodemonConfig || {};
const rootPath = join(resolve(__dirname), '..');

clear();
echo(chalk.green('Watcher started ...'));

nodemon({
        script: entryFile,
        watch: join(rootPath, entryFile),
        stdout: process.env.DEV === 'true',
        ...nodemonConfig
    })
    .on('quit', process.exit)
    .on('restart', () => {
        clear();
        echo(chalk.cyan('Watcher restarted ...'));
    })
    .on('crash', () => {
        clear();
        echo(chalk.red('Watcher crashed for some reason ...'));
        nodemon.emit('restart');
    });