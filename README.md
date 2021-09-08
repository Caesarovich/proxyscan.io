![Logo](https://www.proxyscan.io/images/logo.png)

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

You first need to import the library.

```js
const proxyscan-io = require('proxyscan.io');
```

Then use the `fetchProxies` function to fetch proxies from the API.

```js
const proxyscan-io = require('proxyscan.io');

proxyscan-io.fetchProxies()
  .then(console.log) // [ {Ip: 1.1.1.1, ...} ]
  .catch(console.error);
```

## 📔 Documentation

### fetchProxies(options?: ProxyOptions)

Since this library includes only this function, I recommend that you only import it:

```js
const { fetchProxies } = require('proxyscan.io');
```

The `fetchProxies` function will make an HTTP GET call to the API and retrieve results based on the specified options.

**Example:**

```js
const { fetchProxies } = require('proxyscan.io');

fetchProxies().then(console.log);

/*
  [
    {
      "Ip": "185.208.100.72",
      "Port": 4145,
      "Ping": 21,
      "Time": 1630973749,
      ...
    }
  ]
*/
```

### Returns: Promise\<String> | Promise<Array<Proxy>>

> Note: The return type depends on the `format?` option. If this options is set to `'txt'` then the function returns the raw data in a string.
> Otherwise the function parses the JSON data and returns it as an array of proxies. See below.

### FetchOptions

The fetch options allows for more precise API requests. I strongly recommend using at least some.

| Option      | Value                               | Description                                                 |
| ----------- | ----------------------------------- | ----------------------------------------------------------- |
| format      | 'json', 'txt'                       | Format api output                                           |
| level       | 'transparent', 'anonymous', 'elite' | Anonymity Level                                             |
| type        | 'http', 'https', 'socks4', 'socks5' | Proxy Protocol                                              |
| last_check  | Number                              | Seconds the proxy was last checked                          |
| port        | Number (1 - 65535)                  | Proxies with a specific port                                |
| ping        | Number                              | How fast you get a response after you've sent out a request |
| limit       | Number (1 - 20)                     | How many proxies to list.                                   |
| uptime      | Number (1 - 100)                    | How reliably a proxy has been running                       |
| country     | String (eg: 'EN, US')               | Country of the proxy                                        |
| not_country | String (eg: 'CN, NL')               | Avoid proxy countries                                       |

> Note: using `format: 'txt'` will result in the function returning a `Promise\<String>`.

### Proxy

This is the type returned by a succesful fetch.

| Key          | Type           | Description                                      |
| ------------ | -------------- | ------------------------------------------------ |
| Ip           | String         | The proxy's IP address                           |
| Port         | Number         | The proxy's port number                          |
| Ping         | Number         | The proxy's latency in Milliseconds (ms)         |
| Time         | Number         | The timestamp of when this proxy was scanned     |
| Location     | ProxyLocation  | The proxy's location informations                |
| Type         | Array\<String> | The list of supported protocols                  |
| Failed       | Bool           | Wether or not scan was unsuccesful               |
| Anonimity    | String         | The proxy's anonimity level                      |
| WorkingCount | Number         | How many times this proxy was succesfully tested |
| RecheckCount | Number         | How many times this proxy was checked            |
| Uptime       | Number         | The uptime ration of this proxy                  |

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
