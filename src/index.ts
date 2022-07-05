import { got } from 'got';

export type AnonymityLevel = 'transparent' | 'anonymous' | 'elite';

export type ProxyProtocol = 'http' | 'https' | 'socks4' | 'socks5';

export interface FetchOptions {
  /**
   * Anonymity Level.
   */
  level?: AnonymityLevel;
  /**
   * Proxy Protocol.
   */
  type?: ProxyProtocol;
  /**
   * How many seconds since the proxy was last checked.
   */
  lastCheck?: number;
  /**
   * Proxies with a specific port.
   * Must be between (1 - 65535).
   */
  port?: number;
  /**
   * How fast you get a response after you've sent out a request.
   */
  ping?: number;
  /**
   * How many proxies to list.
   *
   * @default 5
   */
  limit?: number;
  /**
   * How reliably a proxy has been running.
   */
  uptime?: number;
  /**
   * The countries the proxies must be located into.
   * @example ['fr', 'en']
   */
  countries?: string[];
  /**
   * The countries the proxies must NOT be located into.
   * @example ['cn', 'us']
   */
  avoidCountries?: string[];
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

  if (options?.level) params.set('level', options.level);
  if (options?.type) params.set('type', options.type);
  if (options?.lastCheck)
    params.set('last_check', options.lastCheck.toString());
  if (options?.port) params.set('port', options.port.toString());
  if (options?.ping) params.set('ping', options.ping.toString());
  params.set('limit', options?.limit?.toString() ?? '5');
  if (options?.uptime) params.set('uptime', options.uptime.toString());
  if (options?.countries) params.set('country', options.countries.join(','));
  if (options?.avoidCountries)
    params.set('not_country', options.avoidCountries.join(','));

  return params;
}

export async function fetchProxies(options?: FetchOptions): Promise<Proxy[]> {
  const { body } = await got.get('https://www.proxyscan.io/api/proxy', {
    searchParams: fetchOptionsToParams(options),
    timeout: {
      request: 10000,
    },
  });

  const rawData: RawProxy[] = JSON.parse(body);
  let proxies = [];

  for (let proxy of rawData) {
    proxies.push(parseRawProxy(proxy));
  }
  return proxies;
}
