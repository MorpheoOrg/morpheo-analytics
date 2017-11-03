#! /usr/bin/env node
const shell = require('shelljs');

const timestamp = new Date().getTime();
const registry = '984406419997.dkr.ecr.eu-central-1.amazonaws.com';
const name = 'restaurantdelaposte';

console.log(`Deploying ${registry}/${name}:${timestamp}`);

shell.exec(`docker build -t ${registry}/${name}:${timestamp} -t ${registry}/${name}:latest . && docker push ${registry}/${name}:latest`);
