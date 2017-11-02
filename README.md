# Analytics

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
