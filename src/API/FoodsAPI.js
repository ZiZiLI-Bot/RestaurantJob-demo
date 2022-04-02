import axiosClient from './axiosClient';

const FoodsApi = {
  getAllFoods: () => {
    const url = '/api/foods';
    return axiosClient.get(url);
  },
  getFoodById: (id) => {
    const url = `/api/foods/${id}`;
    return axiosClient.get(url);
  },
};

export default FoodsApi;
