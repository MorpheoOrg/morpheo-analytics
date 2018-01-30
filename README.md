# Analytics &middot; [![GitHub license](https://img.shields.io/badge/License-CECILL%202.1-blue.svg)](https://github.com/MorpheoOrg/morpheo-analytics/blob/master/LICENSE) [![Travis Status](https://www.travis-ci.org/MorpheoOrg/morpheo-analytics.svg?branch=master)](https://www.travis-ci.org/MorpheoOrg/morpheo-analytics)

## Installation

To install Analytics you must install yarn 1.4.0 or higher and node 8.4.0 or higher.

You can install the last version of yarn (certainly using sudo privilege):
```
apt-get install yarn
yarn install -g yarn@latest
```

To manage the node version, we recommand to use `n` from https://github.com/tj/n:
```
yarn install -g n
n latest
```

Then, you must install all the packages used by Analytics:
```
yarn install
```

## Launch
To launch Analytics in dev mode as an electron app:
```
yarn run dev
```
