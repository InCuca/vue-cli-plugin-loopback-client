# vue-cli-plugin-loopback-client
[![Travis](https://img.shields.io/travis/InCuca/vue-loopback-client/master.svg)](https://travis-ci.org/InCuca/vue-loopback-client/branches)

A Vue client template ready to work with any Loopback backend. Featuring Babel, Webpack and Jest for unit tests.

If you are looking for the client and server template, check the [vue-loopback template](https://github.com/InCuca/vue-loopback).

## Features

* Full authentication support, compatible with [vue-loopback](https://github.com/InCuca/vue-loopback) template.
* Ajax Async queue module in `client/modules/async` (useful to see if and how many requests are being made to the server);
* [Stylus](http://stylus-lang.com) and [Vuetify](https://vuetifyjs.com)

## Usage

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli

vue create my-project
cd my-project
vue add vue-loopback-client
```

## Folder structure

1. `build`: vue-cli generated build files
2. `config`: vue-cli generated config plus dev [API endpoint Settings](#api-endpoint-settings)
3. `src`: source code plus [API endpoint Settings](#api-endpoint-settings)
6. `test`: optional directory for test helpers/utilities

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## API endpoint Settings

API service can be configured at `src/services/loopback.config.json`, you should put production data in that file. For developing API service, you have to change the proxyTable at `config/index.js`.

## Linting

```
  $ npm run lint
```

## Testing

```
  $ npm run test
```
