import axios from 'axios'
import { NotificationProgrammatic as BNotification } from 'buefy'
import router from '@/router'

const axiosInstance = axios.create();

const defaultMessageError = 'Ha ocurrido un error, intenta nuevamente más tarde o contacta con soporte!';

const defaultDuration = 4000;

const notification = new BNotification();

axiosInstance.
interceptors.
request.
use(
  (config) => {
    if (window.localStorage.getItem('_token')) {
      config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('_token');
    }
    return config;
  }, (err) => {
    return Promise.reject(err);
  }
);

const getFileContents = (file: any) => {
  return new Promise((resolve, reject) => {
    let contents = '';
    const reader = new FileReader();
    reader.onloadend = (e) => {
      // @ts-ignore
      contents = JSON.parse(e.target.result);
      resolve(contents);
    };
    reader.onerror = (e) => {
      reject(e);
    };
    reader.readAsText(file);
  });
};

// interceptor to catch errors
const errorInterceptor = async (error: any) => {
  // check if it"s a server error
  if (!error.response) {
    notification.open({
      duration: defaultDuration,
      type: 'is-danger',
      message: 'Network/Server error',
    });
    return Promise.reject(error);
  }

  // Convertir Blobtype error in json Response
  if (error.request.responseType === "blob" && error.response.data instanceof Blob &&
    error.response.data.type && error.response.data.type.toLowerCase().indexOf("json") !== -1) {
    error.response.data = await getFileContents(error.response.data);
  }

  // all the other error responses
  switch (error.response.status) {
    case 400: {
      notification.open({
        duration: defaultDuration,
        type: 'is-danger',
        message: error.message || defaultMessageError,
      });
      break;
    }
    case 401: {
      const response = error.response.data;
      const typeErrorClass = response.status === 'error' ? 'is-danger' : 'is-warning';
      const messageError = response.status === 'error'
        ? response.message
        : response.data.message;

      notification.open({
        duration: defaultDuration,
        type: typeErrorClass,
        message: messageError || defaultMessageError,
      });

      window.localStorage.removeItem('_token');
      router.push('/login').catch(() => console.error('Interceptor routing error!'));
      break;
    }
    case 422: {
      const response = error.response.data;
      const typeErrorClass = 'is-warning';
      const messageError = response.message;

      notification.open({
        duration: defaultDuration,
        type: typeErrorClass,
        message: messageError || defaultMessageError,
      });
      break;
    }
    default: {
      const response = error.response.data;
      const typeErrorClass = response.status === 'error' ? 'is-danger' : 'is-warning';
      const messageError = response.status === 'error'
        ? `${response.message}, ${response.errors.Message}`
        : JSON.stringify(response.data);

      notification.open({
        duration: defaultDuration,
        type: typeErrorClass,
        message: messageError || defaultMessageError,
      });
      break;
    }
  }
  return Promise.reject(error);
};

// Interceptor for success responses
const responseInterceptor = (response: any) => {
  const res = response.data;

  switch (res.status) {
    case 'error':
      if ('message' in res) {
        const message = Array.isArray(res.message) ? res.message.join("<br/>") : `${res.message}, ${res.errors.Message}`;
        notification.open({
          duration: defaultDuration,
          type: 'is-danger',
          message: message || defaultMessageError,
        });
      }
      break;
    case 'success':
      if (res.data.message != null) {
        notification.open({
          duration: defaultDuration,
          type: 'is-success',
          message: res.data.message,
        });
      }
      break;
    default:
      if(!(res instanceof Blob)) {
        if (res.data.message != null) {
          notification.open({
            duration: defaultDuration,
            type: 'is-warning',
            message: res.data.message,
          });
        }
      }
      break;
  }
  return response;
};

axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

export default axiosInstance;
