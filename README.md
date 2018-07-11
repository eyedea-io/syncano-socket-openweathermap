# Syncano Socket for OpenWeatherMap

[![Syncano Socket](https://img.shields.io/badge/syncano-socket-blue.svg)](https://syncano.io)
[![CircleCI branch](https://img.shields.io/circleci/project/github/eyedea-io/syncano-socket-openweathermap/master.svg)](https://circleci.com/gh/eyedea-io/syncano-socket-openweathermap/tree/master)
![Codecov branch](https://img.shields.io/codecov/c/github/eyedea-io/syncano-socket-openweathermap/master.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/dw/@eyedea-sockets/openweathermap.svg)](https://www.npmjs.com/package/@eyedea-sockets/)
![license](https://img.shields.io/github/license/eyedea-io/syncano-socket-openweathermap.svg)

Main Socket features:

* **openweathermap/get-temperature** — current temperature for the city
* **openweathermap/get-three-hours** — 3 hours forecast for the city

## Getting Started

Install package in your project:

```sh
cd my_project
npm install @syncano/cli --save-dev
npm install @eyedea-sockets/openweathermap --save
npx s deploy
```

Use it:

```js
import Syncano from @syncano/core

const s = new Syncano(<instaneName>)

// Temperature for the given city
const cityTemp = await s.get('openweathermap/get-temperature', {city: 'Oslo'})

// Three hours forecast for given city
const forecast = await s.get('openweathermap/get-three-hours', {city: 'Oslo'})
```

## Endpoints

### openweathermap/get-temperature

#### Input:

| Parameter | Type   | Required  | Example   |
|-----------|--------|-----------|-----------|
| city      | string | Yes       | `Oslo`    |

#### Outputs:

**success** - **Operation Successful**

- Code: 200
- Mimetype: application/json

| Parameter | Type   | Description           | Example      |
|-----------|--------|-----------------------|--------------|
| temp      | float  | Current City Temp     | `-12.2`      |


**fail** - **Operation failed**

- Code: 400
- Mimetype: application/json

| Parameter | Type   | Description            | Example              |
|-----------|--------|------------------------|----------------------|
| message   | string | Error message          | `Internal error.`    |

### openweathermap/get-three-hours

#### Input:

| Parameter | Type   | Required  | Example   |
|-----------|--------|-----------|-----------|
| city      | string | Yes       | `Oslo`    |

#### Outputs:

**success** - **Operation Successful**

- Code: 200
- Mimetype: application/json

| Type   | Description           | Example      |
|--------|-----------------------|--------------|
| array  | Three hours forecast  | `[{"forecast": "Clouds", "hour": "5 PM"}, {"forecast": "Clear", "hour": "8 PM"}, {"forecast": "Clear", "hour": "11 PM"}]`      |


**fail** - **Operation failed**

- Code: 400
- Mimetype: application/json

| Parameter | Type   | Description            | Example                 |
|-----------|--------|------------------------|-------------------------|
| message   | string | Error message          | `Internal error.`       |
