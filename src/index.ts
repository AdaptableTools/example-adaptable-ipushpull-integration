import { Adaptable, AdaptableOptions, AgGridConfig, IPushPullApi } from '@adaptabletools/adaptable';

import { GridOptions, themeQuartz } from 'ag-grid-enterprise';
import { rowData } from './rowData';
import '@adaptabletools/adaptable/index.css';
import '@adaptabletools/adaptable/themes/dark.css';
import ipp from '@adaptabletools/adaptable-plugin-ipushpull';

import { columnDefs, defaultColDef } from './columnDefs';
import { agGridModules } from './agGridModules';

//@ts-ignore
const licenseKey = process.env.ADAPTABLE_LICENSE_KEY;

const adaptableOptions: AdaptableOptions = {
  primaryKey: 'id',
  licenseKey,
  userName: 'ipushpull user',
  adaptableId: 'Adaptable iPushpull',
  /*
  plugins: [
    ipp({
      throttleTime: 5000,
      includeSystemReports: true,
      autoLogin: true,
      ippConfig: {
        api_url: 'https://www.ipushpull.com/api/1.0',
        ws_url: 'https://www.ipushpull.com',
        web_url: 'https://www.ipushpull.com',
        docs_url: 'https://docs.ipushpull.com',
        storage_prefix: 'ipp_local',
        transport: 'polling',
        hsts: false, // strict cors policy
      },
    }),
  ],
  */
  initialState: {
    Dashboard: {
      PinnedToolbars: ['Layout', 'IPushPull', 'Export'],
    },
    Layout: {
      Layouts: [
        {
          Name: 'Layout Toolbars',
          TableColumns: ['OrderId', 'ContactName', 'Employee', 'InvoicedCost'],
        },
      ],
    },
    Export: {
      Reports: [
        {
          Name: 'Invoice greater than 500',
          ReportColumnScope: 'AllColumns',
          ReportRowScope: 'ExpressionRows',
          Query: {
            BooleanExpression: '[InvoicedCost] > 500',
          },
        },
        {
          Name: 'Wilman Kala Contracts',
          ReportColumnScope: 'AllColumns',
          ReportRowScope: 'ExpressionRows',
          Query: {
            BooleanExpression: '[CompanyName] = "Wilman Kala"',
          },
        },
      ],
    },
  },
};

// Create an AG Grid GridOptions object with the Column Definitions and Row Data created above
const gridOptions: GridOptions = {
  defaultColDef,
  columnDefs,
  rowData,
  theme: themeQuartz,
};

// Create an AG Grid Config object which contains AG Grid Grid Options and Modules
const agGridConfig: AgGridConfig = {
  modules: agGridModules,
  gridOptions: gridOptions,
};

// Asynchronously instantiate AdapTable with Adaptable Options and AG Grid Config
Adaptable.init(adaptableOptions, agGridConfig).then((adaptableApi) => {
  const ipushpullApi: IPushPullApi = adaptableApi.pluginsApi.getipushpullPluginApi();
});
