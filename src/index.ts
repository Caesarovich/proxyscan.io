import * as https from 'https';

export interface FetchOptions {
  /**
   * Format api output
   */
  format?: 'json' | 'txt';
  /**
   * Anonymity Level
   */
  level?: 'transparent' | 'anonymous' | 'elite';
  /**
   * Proxy Protocol
   */
  type?: 'http' | 'https' | 'socks4' | 'socks5';
  /**
   * Seconds the proxy was last checked
   */
  last_check?: Number;
  /**
   * Proxies with a specific port.
   * Must be between (1 - 65535).
   */
  port?: Number;
  /**
   * How fast you get a response after you've sent out a request.
   */
  ping?: Number;
  /**
   * How many proxies to list.
   */
  limit?: Number;
  /**
   * How reliably a proxy has been running
   */
  uptime?: Number;
  /**
   * Country of the proxy
   * @example 'fr, en'
   */
  country?: String;
  /**
   * Avoid proxy countries
   * @example 'cn, us'
   */
  not_country?: String;
}

export interface ProxyLocation {
  city: string;
  continent: string;
  country: string;
  countryCode: string;
  ipName: string;
  ipType: string;
  isp: string;
  lat: string;
  lon: string;
  org: string;
  query: string;
  region: string;
  status: string;
}

export interface Proxy {
  Ip: String;
  Port: number;
  Ping: number;
  Time: number;
  Location: ProxyLocation;
  Type: Array<String>;
  Failed: boolean;
  Anonymity: String;
  WorkingCount: number;
  Uptime: number;
  RecheckCount: number;
}

function optionsToParams(options: FetchOptions): string {
  let params: Array<string> = [];

  for (const key of Object.keys(options) as Array<keyof FetchOptions>) {
    params.push(`${key}=${options[key]}`);
  }

  return params.join('&');
}

export function fetchProxies(
  options?: FetchOptions & { format: 'txt' }
): Promise<String>;
export function fetchProxies(options?: FetchOptions): Promise<Array<Proxy>>;
export function fetchProxies(options?: FetchOptions) {
  return new Promise((resolve, reject) => {
    const params = options ? optionsToParams(options) : '';
    https
      .get('https://www.proxyscan.io/api/proxy?' + params, (res) => {
        let data: string = '';

        res.on('data', (d) => {
          data += d;
        });

        res.on('end', () => {
          if (res.statusCode !== 200) return reject(res.statusMessage);
          if (options?.format !== 'txt') {
            resolve(JSON.parse(data));
          } else {
            resolve(data);
          }
        });
      })
      .on('error', reject);
  });
}
