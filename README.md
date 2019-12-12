# AdaptableBlotter IPushPull integration

This demo is using TypeScript for convenience - but it could easily be just JavaScript.

## Installation

**NOTE**: In order to be able to run `npm install`, you need to follow the [Adaptable Blotter installation instructions](https://adaptabletools.zendesk.com/hc/en-us/articles/360002754737-Installation) - so you need to be logged into our private NPM registry.

Run `npm install` (or `yarn`), depending on what tool you're using.

## Running for development

Before running, if you want to prefill your ipushpull username & password in the demo, you can create a `.env` file, with the following contents:

```sh
IPUSHPULL_USERNAME="" # optional, can leave as empty string - if passed, will prefill your username in the IPushPull login dialog
IPUSHPULL_PASSWORD="" # optional, can leave as empty string - if passed, will prefill your password in the IPushPull login dialog
```

You can run the project by executing the following command

```sh
$ npm run dev
```

**NOTE**: The first time you run this, it takes longer as parcel generates some cache, etc - subsequent runs will be a lot faster

Now navigate to **[localhost:1234](http://localhost:1234)** in order the see the AdaptableBlotter in action.

Any change you make in your sources will trigger a browser reload, since parceljs comes with built-in hot-reloading in order to keep you productive.
