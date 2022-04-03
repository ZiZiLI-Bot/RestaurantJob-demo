import axiosClient from './axiosClient';

const TableAPI = {
  getAllTables: () => {
    const url = '/api/tables';
    return axiosClient.get(url);
  },
  createTable: (table) => {
    const url = '/api/tables';
    return axiosClient.post(url, table);
  },
};

export default TableAPI;
