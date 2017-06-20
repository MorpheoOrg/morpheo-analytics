#! /usr/bin/env node
const shell = require("shelljs");

//shell.exec("aws s3 --region eu-central-1 cp ./build/frontend s3://dreem-fronts/analytics/ --recursive");
//shell.exec("aws cloudfront create-invalidation --cli-input-json '{\"DistributionId\":\"E3BTH1EYFN3UC7\",\"InvalidationBatch\":{\"Paths\":{\"Quantity\":1,\"Items\":[\"/analytics/*\"]},\"CallerReference\":\"'\"$(uuidgen)\"'\"}}'");

const timestamp = new Date().getTime();

console.log(`Deploying registry.morpheo.io/analytics:${timestamp}`);

shell.exec(`docker build -t registry.morpheo.io/analytics:${timestamp} -t registry.morpheo.io/analytics:latest . && docker push registry.morpheo.io/analytics:${timestamp} && kubectl --namespace staging set image deployment/analytics analytics-server=registry.morpheo.io/analytics:${timestamp} && docker push registry.morpheo.io/analytics:latest`);
