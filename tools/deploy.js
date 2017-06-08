#! /usr/bin/env node
const shell = require('shelljs');

// shell.exec("aws s3 --region eu-central-1 cp ./build/frontend s3://dreem-fronts/notebook/ --recursive");
// shell.exec("aws cloudfront create-invalidation --cli-input-json '{\"DistributionId\":\"E3BTH1EYFN3UC7\",\"InvalidationBatch\":{\"Paths\":{\"Quantity\":1,\"Items\":[\"/notebook/*\"]},\"CallerReference\":\"'\"$(uuidgen)\"'\"}}'");

const timestamp = new Date().getTime();

console.log(`Deploying registry.morpheo.io/notebook:${timestamp}`);

shell.exec(`docker build -t registry.morpheo.io/notebook:${timestamp} -t registry.morpheo.io/notebook:latest . && docker push registry.morpheo.io/notebook:${timestamp} && kubectl --namespace staging set image deployment/notebook notebook=registry.morpheo.io/notebook:${timestamp} && docker push registry.morpheo.io/notebook:latest`);
