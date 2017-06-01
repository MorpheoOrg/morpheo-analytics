#! /usr/bin/env node
const shell = require('shelljs');

// shell.exec("aws s3 --region eu-central-1 cp ./build/frontend s3://dreem-fronts/analytics/ --recursive");
// shell.exec("aws cloudfront create-invalidation --cli-input-json '{\"DistributionId\":\"E3BTH1EYFN3UC7\",\"InvalidationBatch\":{\"Paths\":{\"Quantity\":1,\"Items\":[\"/analytics/*\"]},\"CallerReference\":\"'\"$(uuidgen)\"'\"}}'");

shell.exec('npm run build && docker build -t registry.morpheo.io/notebook . && docker push registry.morpheo.io/notebook');
