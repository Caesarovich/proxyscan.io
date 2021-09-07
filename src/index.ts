import * as https from 'https';

export interface FetchOptions {
  format?: 'json' | 'txt';
  level?: 'transparent' | 'anonymous' | 'elite';
  type?: 'http' | 'https' | 'socks4' | 'socks5';
  last_check?: Number;
  port?: Number;
  ping?: Number;
  limit?: Number;
  uptime?: Number;
  country?: String;
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
