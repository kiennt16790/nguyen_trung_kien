import axios, { AxiosResponse } from 'axios';

const request = axios.create({
  timeout: 100 * 1000,
});

request.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const { status } = error.response;

    if (status === 400) {
      const {
        data: { message },
      } = error.response;

      console.log(message);
    }

    return Promise.reject(error);
  },
);

export default request;
