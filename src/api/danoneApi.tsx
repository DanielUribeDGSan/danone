import axios from 'axios';

const danoneApi = axios.create({
  baseURL: 'https://apidanone.mediaserviceagency.com/api',
});

export default danoneApi;
