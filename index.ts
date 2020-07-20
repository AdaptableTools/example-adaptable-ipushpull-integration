import Adaptable from "@adaptabletools/adaptable/agGrid";

import "@adaptabletools/adaptable/index.css";
import "@adaptabletools/adaptable/themes/dark.css";
import ipp from "@adaptabletools/adaptable-plugin-ipushpull";
import { IPushPullApi } from "@adaptabletools/adaptable/src/Api/IPushPullApi";
import finance from "@adaptabletools/adaptable-plugin-finance";

import { AllEnterpriseModules } from "@ag-grid-enterprise/all-modules";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css";

import {
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi,
} from "@adaptabletools/adaptable/types";

const columnDefs = [
  { field: "OrderId", type: "abColDefNumber" },
  {
    field: "CompanyName",

    type: "abColDefString",
  },
  {
    field: "ContactName",
    type: "abColDefString",
  },
  {
    field: "Employee",
    type: "abColDefString",
  },
  {
    field: "InvoicedCost",
    type: "abColDefNumber",
  },
];

const rowData: any[] = [
  {
    OrderId: 1,
    CompanyName: "IBM",
    ContactName: "Joe Bloggs",
    Employee: "Mary Shields",
    InvoicedCost: 32.53,
  },
];

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: [
      "IPushPull",
      "QuickSearch",
      "Export",
      "Layout",
      "AdvancedSearch",
    ],
  },
};

const adaptableOptions: AdaptableOptions = {
  primaryKey: "OrderId",
  userName: "Demo User",
  adaptableId: "IPushPull Integration Demo",

  plugins: [
    finance(),
    ipp({
      throttleTime: 5000,
      includeSystemReports: true,
      autoLogin: true,
      ippConfig: {
        api_secret: "]provide your own here]",
        api_key: "[provide your own here]",
        api_url: "https://www.ipushpull.com/api/1.0",
        ws_url: "https://www.ipushpull.com",
        web_url: "https://www.ipushpull.com",
        docs_url: "https://docs.ipushpull.com",
        storage_prefix: "ipp_local",
        transport: "polling",
        hsts: false, // strict cors policy
      },
    }),
  ],
  // vendorGrid: { ...gridOptions, modules: AllEnterpriseModules },
  vendorGrid: {
    columnDefs,
    rowData,
    columnTypes: {
      abColDefNumber: {},
      abColDefString: {},
      abColDefBoolean: {},
      abColDefDate: {},
      abColDefNumberArray: {},
      abColDefObject: {},
    },
    // rowData: null,
    modules: AllEnterpriseModules,
  },
  predefinedConfig: demoConfig,
};

Adaptable.init(adaptableOptions).then((adaptableApi) => {
  const ipushpullApi: IPushPullApi = adaptableApi.pluginsApi.getPluginApi(
    "ipushpull"
  );

  // we simulate server loading when ready
  adaptableApi.eventApi.on("AdaptableReady", () => {
    // we load the json orders
    import("./orders.json")
      .then((data) => data.default)
      .then((data) => {
        // add an extra timeout
        setTimeout(() => {
          // and then set the correct row data
          adaptableApi.gridApi.getVendorGrid().api.setRowData(data);
        }, 500);
      });
  });
});
