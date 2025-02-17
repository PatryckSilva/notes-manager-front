import { HttpClient, HttpRequest } from "@/@types/httpTypes";

export class HttpClientAdapter implements HttpClient {
  async request(data: HttpRequest) {
    try {
      const body =
        data.body && typeof data.body === "object" ? JSON.stringify(data.body) : data.body;
      const response = await fetch(data.url, {
        method: data.method,
        headers: data.headers,
        body: body,
        credentials: "include",
        next: {
          tags: data.tag ? [data.tag] : [],
        },
      });

      let fetchResponse;

      try {
        fetchResponse = await response;

        const objResponse = {
          statusCode: fetchResponse.status,
          body: await fetchResponse.json(),
          ok: response.ok,
        };

        return objResponse;
      } catch (error) {
        const _error = error as Error;
        console.log(`error==========`, error);

        return {
          statusCode: 500,
          body: _error.message,
          ok: false,
        };
      }
    } catch (error) {
      console.log("error==========", error);
      return {
        statusCode: 500,
        body: { message: "Internal Server Error" },
        ok: false,
      };
    }
  }
}
