# Morpheo Analytics

#### Synopsis

This project intends to display api in adequacy with the bender open source API.
To browse this site, an authentication is required and only users with policies team or admin will be allowed.
The project use babel, webpack and hot reloading for a better development experience.
It is highly scalable thanks to webpack lazy loading and store/sagas asynchronously injection.
In a nutshell, it will only download what it needs for displaying our pages making it heavily efficient.
BrowserSync is also available for testing the code on other platform than localhost.
Fela is included, allowing painless styling of complex components.

## Installation

This project run on node >= 7.4.0.
Install node and then install the dependencies locally:

```shell
npm install
```

If you installed yarn, you can also use:
```shell
yarn
```

Be careful, you need to stick with one or another or you could encounter inconsistencies during development while you add new dependencies.

Now you're ready to launch the local server which runs on webpack devserver:

```shell
npm run start
```

If it's the first time, you should get a warning message:

    The DLL manifest is missing. Please run `npm run dll:dev`

We need to create the dev dll locally :
```shell
npm run dll:dev
```

The dev dll allow us to optimize the way we deal with vendors code in order not to rebuild them every time.
:warning: **<span style="color:red">Be careful: each time you want to add or update a dependency in your package.json, you will have to run this command!</span>**
:bulb: Alternatively you should use `npm run update-dependencies` for running `npm install` and dll creation in a row.

You can re run `npm run start` now.

The website should be available on `http://localhost:3000/`
If you make any modifications on the rendering code, you'll see your page updating automatically witjout refreshing thanks to the hot module configuration (though it will do a full refresh for sagas files).

Thanks to BrowserSync, you can also test your website on other devices:
Head to `http://localhost:3002/` for more explanation on how to use BrowserSync.

## Configuration

A config directory is present on the root of this project, it will help you configuring multiple environments for dev, prod, debug and staging.
It is very helpful for managing global variables.
Be aware that `npm run start` uses the `DEVELOPMENT` configuration.

## Build and Deployment

Until we get a decent CI system in place (that sthould be coming in a few weeks
at most) we need to build and deploy the production image locally. Make sure
you're hooked to our production Kubernetes cluster and run the following with
care:

```shell
# Install deps necessary to build the project
npm install

# Build the project
npm run build

# Make a docker image (tagged after the current date for now)
export ANAL_BUILD_DATE="$(date +%Y%m%d-%H%M%S)"
docker build -t "registry.morpheo.io/analytics:$ANAL_BUILD_DATE" .

# Push it
docker push "registry.morpheo.io/analytics:$ANAL_BUILD_DATE"

# Tell Kubernetes to roll-update to this new image
kubectl --namespace staging set image deployment/analytics \
  analytics-server=registry.morpheo.io/analytics:$ANAL_BUILD_DATE
```

## Development tools

For developing on this website, I recommend using the excellent IDE  WebStorm, it will allow you to easily debug your code and test it with one mouse click.

One of the first things to do after loading your project in Webstorm is mapping npm scripts.
For this, create new configurations:

<img src="./assets/img/new configurations.png" />

Create new npm configurations:
<img src="./assets/img/npm configurations.png" />

You can now run your dev server with one click by selecting the start option and run it from WebStorm :tada: :tada: :tada:
A lot of scripts are available as you can see. Don't hesitate to add them too.

#### Debug with breakpoints:

Adding breakpoints in the chrome devtools panel is a way to go.
But it's possible to debug with breakpoints inside WebStorm :tada: :tada: :tada:

Launch the `build-debug` utility. This tool will build your project in debug mode and rebuild it when you modify your code after saving it (Ctrl+S).
```shell
npm run build:debug
```
Or you can directly click on one of your predefined mapping :rocket:

Mark your freshly new created build directory as excluded:
- click right on the build directory located on the root of the project
- Select `Mark directory as...`
- Selected `Excluded`

Create a new `Javascript Debug` configuration:
<img src="./assets/img/config debug.png" />

Make sure you correctly filled the fields, especially the `Remote URL`. The port can change, make sure to specify the good one regarding your settings.

Modify the way WebStorm update the project when you modify it:
Open settings (Ctrl+Alt+S), then
<img src="./assets/img/config no reload.png"/>

You can now launch in debug mode your `Javascript Debug` mapping, set breakpoints and enjoy breakpoint debugging :tada:
<img src="./assets/img/port.png"/>

:warning: Only drawback: you'll lose the hot module replacement.
So you'll have to reload your `Javascript Debug` configuration after a modification.
It will refresh the website.

## Test

You can test your project with:
```shell
npm run test
```

And you can also create a mocha configuration if you want to be specific and use breakpoints in your tests:
<img src="./assets/img/config test.png" />

## Linter

A `.eslintrc` file is present in the root of the project.
You'll find our Rythm configuration wich extends from the airbnb configuration.

Test the linting of your code:
```shell
npm run eslint
```

### Commit

When you'll commit your changes, a test suite and a eslint commands will be executed thanks to pre-commit.
It ensures the code commited to our repositories does not comport inconsistencies.

## TODO

- [ ] Finish css
- [ ] Handle errors in form and reset fields after modal onClose
- [ ] Proptypes
- [ ] defaultProps
- [ ] Optimize rendering
