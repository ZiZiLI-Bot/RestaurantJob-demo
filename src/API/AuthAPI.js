import axiosClient from './axiosClient';

const AuthAPI = {
  login: (user) => {
    const url = '/service/signin';
    return axiosClient.post(url, user);
  },
  register: (user) => {
    const url = '/service/register';
    return axiosClient.post(url, user);
  },
  UpdateCustomer: (user) => {
    const url = '/api/customers';
    return axiosClient.put(url, user);
  },
  CreateCustomer: (user, token) => {
    const url = '/api/customers';
    return axiosClient.post(url, user, {
      token: token,
    });
  },
};

export default AuthAPI;
