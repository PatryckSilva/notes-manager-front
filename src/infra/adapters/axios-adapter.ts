import { HttpClient, HttpRequest } from "@/@types/httpTypes";
import axios, { AxiosError, AxiosResponse } from "axios";

export class HttpClientAdapter implements HttpClient {
  async request(data: HttpRequest) {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
        withCredentials: true,
      });

      return {
        statusCode: axiosResponse.status,
        body: axiosResponse?.data,
        ok: axiosResponse.status >= 200 && axiosResponse.status < 300,
      };
    } catch (error) {
      const _error = error as AxiosError<{ message: string }>;
      console.log(`error==========`, error);
      return {
        statusCode: _error.response?.status || 500,
        body: _error.response?.data || { message: "Internal Server Error" },
        ok: false,
      };
    }
  }
}
