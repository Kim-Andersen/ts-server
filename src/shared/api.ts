import axios, { AxiosInstance } from 'axios';

export interface GrapQLCLientConfigOptions {
  JWT: string;
  baseURL: string;
  graphqlApiURL: string;
}
class GrapQLCLient {
  private graphqlInstance!: AxiosInstance;
  public configure(options: GrapQLCLientConfigOptions) {
    this.graphqlInstance = axios.create({
      baseURL: options.baseURL,
      timeout: 5000,
      responseType: 'json',
      headers: {
        Credentials: 'same-origin',
        Authorization: `bearer ${options.JWT}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  public query(query: string): Promise<any> {
    return this.graphqlInstance
      .post(
        '/api/graphql',
        JSON.stringify({
          query: ` ${query}`
        })
      )
      .then(response => response.data.data);
  }
}

export default new GrapQLCLient();
