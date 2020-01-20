import AdaptableBlotter from "@adaptabletools/adaptable/agGrid";
import ipushpull from "ipushpull-js";

import "@adaptabletools/adaptable/index.css";
import "@adaptabletools/adaptable/themes/dark.css";

import finance from "@adaptabletools/adaptable-plugin-finance";

import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css";

import {
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi
} from "@adaptabletools/adaptable/types";

// this configuration needs to be done in a sync way, here
// as ipushpull config system is a bit awkward, and won't pick up
// all those configs if configured later

ipushpull.config.set({
  api_url: "https://www.ipushpull.com/api/1.0",
  ws_url: "https://www.ipushpull.com",
  web_url: "https://www.ipushpull.com",
  docs_url: "https://docs.ipushpull.com",
  storage_prefix: "ipp_local",
  api_key: "", // this can safely be an an empty string, as the AdaptableBlotter uses it's own ipushpull api key
  api_secret: "", // this can safely be an an empty string, as the AdaptableBlotter uses it's own ipushpull api secret
  transport: "polling",
  hsts: false // strict cors policy
});

const columnDefs = [
  { field: "OrderId", type: "abColDefNumber" },
  {
    field: "CompanyName",

    type: "abColDefString"
  },
  {
    field: "ContactName",
    type: "abColDefString"
  },
  {
    field: "Employee",
    type: "abColDefString"
  },
  {
    field: "InvoicedCost",
    type: "abColDefNumber"
  }
];

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: [
      "IPushPull",
      "QuickSearch",
      "Export",
      "Layout",
      "AdvancedSearch"
    ]
  },

  IPushPull: {
    iPushPullInstance: ipushpull,
    Username: (process.env.IPUSHPULL_USERNAME || "") as string,
    Password: (process.env.IPUSHPULL_PASSWORD || "") as string
  }
};

const adaptableOptions: AdaptableOptions = {
  primaryKey: "OrderId",
  userName: "Demo User",
  adaptableId: "IPushPull Integration Demo",
  plugins: [finance()],

  vendorGrid: {
    columnDefs,
    columnTypes: {
      abColDefNumber: {},
      abColDefString: {},
      abColDefBoolean: {},
      abColDefDate: {},
      abColDefNumberArray: {},
      abColDefObject: {}
    },
    rowData: null
  },
  predefinedConfig: demoConfig
};

const api: AdaptableApi = AdaptableBlotter.init(adaptableOptions);

// we simulate server loading - so when the blotter is ready
api.eventApi.on("AdaptableReady", () => {
  // we load the json orders
  import("./orders.json")
    .then(data => data.default)
    .then(data => {
      // add an extra timeout
      setTimeout(() => {
        // and then set the correct row data
        api.gridApi.getVendorGrid().api.setRowData(data);
      }, 500);
    });
});
