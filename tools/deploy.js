#! /usr/bin/env node
import shell from 'shelljs';

shell.exec("aws s3 --region eu-central-1 cp ./build/frontend s3://dreem-fronts/analytics/ --recursive");
shell.exec("aws cloudfront create-invalidation --cli-input-json '{\"DistributionId\":\"E3BTH1EYFN3UC7\",\"InvalidationBatch\":{\"Paths\":{\"Quantity\":1,\"Items\":[\"/analytics/*\"]},\"CallerReference\":\"'\"$(uuidgen)\"'\"}}'");
