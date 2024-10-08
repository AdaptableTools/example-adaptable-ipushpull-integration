# iPushPull <> AdapTable Integration Example

This demo shows how you can use ipushpull inside AdapTable.

The code is using TypeScript for convenience - but it could easily be just JavaScript.

## Versions and Dependencies

The demo is built using these key packages:

- [AdapTable](https://docs.adaptabletools.com/) version 19
- [AdapTable IPushPull Plugin](https://www.npmjs.com/package/@adaptabletools/adaptable-plugin-ipushpull) version 19
- [AG Grid](https://www.ag-grid.com) version 32.1

## Installation

NOTE: In order to be able to run `npm install`, you need to follow the [AdapTable installation instructions](https://docs.adaptabletools.com/guide/dev-guide-getting-started).

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

Now navigate to **[localhost:1234](http://localhost:1234)** in order the see AdapTable in action.

Any change you make in your sources will trigger a browser reload, since parceljs comes with built-in hot-reloading in order to keep you productive.

## Licences

An AdapTable Licence provides access to all product features as well as quarterly updates and enhancements through the lifetime of the licence, comprehensive support, and access to all 3rd party libraries.

Licences can be purchased individually, for a team, for an organisation or for integration into software for onward sale.

We can make a Trial Licence available for a short period of time to allow you to try out AdapTable for yourself.

Please contact [`sales@adaptabletools.com`](mailto:sales@adaptabletools.com) for more information.

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Documentation](https://docs.adaptabletools.com).  

Here you can see a large number of AdapTable demos each showing a different feature, function or option in AdapTable.

## Demo

To see AdapTable in action visit our [Demo Site](https://www.adaptabletools.com/demos) which contains a few larger demos.

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com) 
 
## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
