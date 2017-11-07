# Analytics &middot; [![GitHub license](https://img.shields.io/badge/License-CECILL%202.1-blue.svg)](https://github.com/MorpheoOrg/morpheo-analytics/blob/master/LICENSE) [![Travis Status](https://www.travis-ci.org/tguillemot/morpheo-analytics.svg?branch=master)](https://www.travis-ci.org/tguillemot/morpheo-analytics)

## Installation

To install Analytics you must install npm 5.5.1 or higher and node 8.4.0 or higher.

You can install the last version of npm (certainly using sudo privilege):
```
apt-get install npm
npm install -g npm@latest
```

To manage the node version, we recommand to use `n` from https://github.com/tj/n:
```
npm install -g n
n latest
```

Then, you must install all the packages used by Analytics:
```
npm install
```

## Launch
To launch Analytics in dev mode as an electron app:
```
npm run dev
```
