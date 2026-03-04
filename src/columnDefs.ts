import { ColDef } from 'ag-grid-enterprise';


export const defaultColDef: ColDef = {
  resizable: true,
  sortable: true,
  editable: true,
  filter: true,
  floatingFilter: true,
};


export const columnDefs: ColDef[] = [
  { field: 'OrderId', cellDataType: 'number' },
  {
    field: 'CompanyName',
    cellDataType: 'text',
  },
  {
    field: 'ContactName',
    cellDataType: 'text',
  },
  {
    field: 'Employee',
    cellDataType: 'text',
  },
  {
    field: 'InvoicedCost',
    cellDataType: 'number',
  },
];