import { got } from 'got';

export type AnonymityLevel = 'transparent' | 'anonymous' | 'elite';

export type ProxyProtocol = 'http' | 'https' | 'socks4' | 'socks5';

export interface FetchOptions {
  /**
   * Anonymity Level
   */
  level?: AnonymityLevel;
  /**
   * Proxy Protocol
   */
  type?: ProxyProtocol;
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

interface RawProxy {
  Ip: string;
  Port: number;
  Ping: number;
  Time: number;
  Location: ProxyLocation;
  Type: ProxyProtocol[];
  Failed: boolean;
  Anonymity: AnonymityLevel;
  WorkingCount: number;
  Uptime: number;
  RecheckCount: number;
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
  ip: string;
  port: number;
  ping: number;
  time: number;
  location: ProxyLocation;
  types: ProxyProtocol[];
  failed: boolean;
  anonymity: AnonymityLevel;
  workingCount: number;
  uptime: number;
  recheckCount: number;
}

function parseRawProxy(raw: RawProxy): Proxy {
  return {
    ip: raw.Ip,
    port: raw.Port,
    ping: raw.Ping,
    time: raw.Time,
    location: raw.Location,
    types: raw.Type,
    failed: raw.Failed,
    anonymity: raw.Anonymity,
    workingCount: raw.WorkingCount,
    uptime: raw.Uptime,
    recheckCount: raw.RecheckCount,
  };
}

function fetchOptionsToParams(options?: FetchOptions): URLSearchParams {
  let params = new URLSearchParams();

  if (!options) return params;

  for (let key in options) {
    const option = options[key as keyof FetchOptions];
    if (option && options.hasOwnProperty(key)) {
      params.set(key, option.toString());
    }
  }

  return params;
}

export async function fetchProxies(options?: FetchOptions): Promise<Proxy[]> {
  const { body } = await got.get('https://www.proxyscan.io/api/proxy', {
    searchParams: fetchOptionsToParams(options),
  });

  const rawData: RawProxy[] = JSON.parse(body);
  let proxies = [];

  for (let proxy of rawData) {
    proxies.push(parseRawProxy(proxy));
  }
  return proxies;
}
