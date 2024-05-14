# ⚠️ Discontinued

The site proxyscan.io no longer exists, therefore this library no longer works.

# proxyscan.io

## A NodeJS wrapper for [proxyscan.io](https://proxyscan.io)'s API

Fetch proxies lists with ease from the [proxyscan.io API](https://proxyscan.io/api).
This packages comes with TS types and JSDoc for ease of use in development.

## 📥 Installation

You can install this library with the [NPM package manager](https://www.npmjs.com/) with the following command:

```
npm install proxyscan.io
```

**Alternatively** you can build your own version with the following commands:

```
git clone https://github.com/Caesarovich/proxyscan.io.git
cd proxyscan.io && npm i
npm build
```

This will build the package into the `dist` directory.

## ⏳ Quick start

Use the `fetchProxies` function to fetch proxies from the API.

```js
import { fetchProxies } from 'proxyscan.io';

fetchProxies()
  .then(console.log) // [ {ip: 1.1.1.1, ...} ]
  .catch(console.error);
```

## 📔 Documentation

### fetchProxies(proxyOptions?: ProxyOptions, requestOptions?: RequestOptions)

The `fetchProxies` function will make an HTTP GET call to the API and retrieve results based on the specified options.

**Example:**

```js
import { fetchProxies } from 'proxyscan.io';

fetchProxies().then(console.log);

/*
  [
    {
      "ip": "185.208.100.72",
      "port": 4145,
      "ping": 21,
      "time": 1630973749,
      ...
    }
  ]
*/
```

#### Returns: Promise<Proxy[]>

### ProxyOptions

The proxy options allows for more precise API requests. I strongly recommend using at least some.

| Option         | Value                               | Description                                                 |
| -------------- | ----------------------------------- | ----------------------------------------------------------- |
| level          | 'transparent', 'anonymous', 'elite' | Anonymity Level                                             |
| type           | 'http', 'https', 'socks4', 'socks5' | Proxy Protocol                                              |
| last_check     | Number                              | Seconds the proxy was last checked                          |
| port           | Number (1 - 65535)                  | Proxies with a specific port                                |
| ping           | Number                              | How fast you get a response after you've sent out a request |
| limit          | Number (1 - 20)                     | How many proxies to list.                                   |
| uptime         | Number (1 - 100)                    | How reliably a proxy has been running                       |
| countries      | string[] (eg: ['EN', 'US'])         | The countries the proxies must be located into.             |
| avoidCountries | string[] (eg: ['CN', 'NL'])         | The countries the proxies must NOT be located into.         |

### RequestOptions

These options are related to the way [Got](https://www.npmjs.com/package/got) will handle the request.

| Option  | Value  | Description                                                                          |
| ------- | ------ | ------------------------------------------------------------------------------------ |
| timeout | Number | Milliseconds to wait for the server to end the response before aborting the request. |

### Proxy

This is the type returned by a succesful fetch.

| Key          | Type           | Description                                      |
| ------------ | -------------- | ------------------------------------------------ |
| ip           | String         | The proxy's IP address                           |
| port         | Number         | The proxy's port number                          |
| ping         | Number         | The proxy's latency in Milliseconds (ms)         |
| time         | Number         | The timestamp of when this proxy was scanned     |
| location     | ProxyLocation  | The proxy's location informations                |
| type         | Array\<String> | The list of supported protocols                  |
| failed       | Bool           | Wether or not scan was unsuccesful               |
| anonimity    | String         | The proxy's anonimity level                      |
| workingCount | Number         | How many times this proxy was succesfully tested |
| recheckCount | Number         | How many times this proxy was checked            |
| uptime       | Number         | The uptime ration of this proxy                  |

### ProxyLocation

This types defines a proxy's location informations.

| Key         | Type   | Description                           |
| ----------- | ------ | ------------------------------------- |
| city        | String | The proxy's city                      |
| continent   | String | The proxy's continent                 |
| country     | String | The proxy's country                   |
| countryCode | String | The proxy's country code              |
| ipName      | String | The ip's hostname                     |
| ipType      | String | The ip's type                         |
| isp         | String | The proxy's Internet Service Provider |
| lat         | String | The proxy's latitude                  |
| lon         | String | The proxy's longitude                 |
| org         | String | The proxy's host organisation         |
| query       | String | The query                             |
| region      | String | The proxy's region                    |
| status      | String | The localisation query status         |

## ⚠️ Disclaimer: This is not an official library, it is not supported by proxyscan.io and comes with no warranty. Use at your own risk !
