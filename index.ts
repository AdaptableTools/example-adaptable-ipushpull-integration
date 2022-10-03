import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham-dark.css';

import '@adaptabletools/adaptable/index.css';
import '@adaptabletools/adaptable/themes/dark.css';

import { Module, ColDef } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SparklinesModule } from '@ag-grid-enterprise/sparklines';
import { GridChartsModule } from '@ag-grid-enterprise/charts';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { StatusBarModule } from '@ag-grid-enterprise/status-bar';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';

import Adaptable from '@adaptabletools/adaptable/agGrid';
import ipp from '@adaptabletools/adaptable-plugin-ipushpull';
import { IPushPullApi } from '@adaptabletools/adaptable/src/Api/IPushPullApi';
import finance from '@adaptabletools/adaptable-plugin-finance';

import { AdaptableOptions, PredefinedConfig } from '@adaptabletools/adaptable/types';

const columnDefs: ColDef[] = [
  { field: 'OrderId', type: 'abColDefNumber' },
  {
    field: 'CompanyName',

    type: 'abColDefString',
  },
  {
    field: 'ContactName',
    type: 'abColDefString',
  },
  {
    field: 'Employee',
    type: 'abColDefString',
  },
  {
    field: 'InvoicedCost',
    editable: true,
    type: 'abColDefNumber',
  },
];

const rowData: any[] = [
  {
    OrderId: 1,
    CompanyName: 'IBM',
    ContactName: 'Joe Bloggs',
    Employee: 'Mary Shields',
    InvoicedCost: 32.53,
  },
];

let demoConfig: PredefinedConfig = {
  Dashboard: {
    Tabs: [
      {
        Name: 'Dashboard Toolbars',
        Toolbars: ['Layout', 'IPushPull', 'Export'],
      },
    ],
  },
  Export: {
    Revision: Date.now(),
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
};

const adaptableOptions: AdaptableOptions = {
  primaryKey: 'OrderId',
  userName: 'Demo User',
  adaptableId: 'IPushPull Integration Demo',
  licenseKey: process.env.REACT_APP_ADAPTABLE_LICENSE_KEY,

  plugins: [
    finance(),
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
  gridOptions: {
    columnDefs,
    defaultColDef: {
      resizable: true,
      sortable: true,
      editable: true,
      filter: true,
      floatingFilter: true,
    },
    rowData,
    enableRangeSelection: true,
  },
  predefinedConfig: demoConfig,
};

export const agGridModules: Module[] = [
  ClientSideRowModelModule,
  SideBarModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  StatusBarModule,
  MenuModule,
  RangeSelectionModule,
  RichSelectModule,
  ExcelExportModule,
  GridChartsModule,
  SparklinesModule,
  RowGroupingModule,
  ClipboardModule,
];

Adaptable.init(adaptableOptions, { agGridModules }).then((adaptableApi) => {
  const ipushpullApi: IPushPullApi = adaptableApi.pluginsApi.getipushpullPluginApi();
  // we simulate server loading when ready
  adaptableApi.eventApi.on('AdaptableReady', () => {
    // we load the json orders
    import('./orders.json')
      .then((data) => data.default)
      .then((data) => {
        // add an extra timeout
        setTimeout(() => {
          // and then set the correct row data
          adaptableApi.gridApi.setGridData(data);
        }, 500);
      });
  });
});
