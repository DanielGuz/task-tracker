import axiosInstance from './Interceptor';

class DataService {
  public ResponseTypeBlob: { // Encabezado del formulario para la petición
    responseType: string;
  };

  public fileHeader: { // Encabezado del formulario para la petición
    headers: { 'Content-Type': string; };
  };

  constructor() {
    this.fileHeader = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    // Response Type Blob
    this.ResponseTypeBlob = {
      responseType: 'blob',
    };
  }

  public get(path: any, params: any) {
    return axiosInstance.get(path, params)
      .then((response) => response.data);
  }

  public getResponseFull(path: any, data: any) {
    return axiosInstance.get(path, data)
      .then((response) => response);
  }

  public post(path: any, data: any) {
    return axiosInstance.post(path, data)
      .then((response) => response.data);
  }

  public postResponseFull(path: any, data: any) {
    return axiosInstance.post(path, data)
      .then((response) => response);
  }

  public getFile(path: any, params: any) {
    return axiosInstance.get(path, { params, responseType: 'blob' });
  }

  public postWithFiles(path: any, data: any) {
    return axiosInstance.post(path, data, this.fileHeader);
  }

  public put(path: any, data: any, id: any) {
    return axiosInstance.put(`${path}${id}/`, data)
      .then((response) => response.data);
  }

  public delete(path: any, id: any) {
    return axiosInstance.delete(`${path}${id}/`)
      .then((response) => response.data);
  }
}

export const dataService = new DataService();

export default {};
