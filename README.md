
[![Build Status](https://travis-ci.org/nxcd/merge-deep.svg?branch=master)](https://travis-ci.org/nxcd/merge-deep)
[![GitHub license](https://img.shields.io/github/license/nxcd/merge-deep.svg)](https://github.com/nxcd/merge-deep/blob/master/LICENSE)
[![Javascript code Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Github All Releases](https://img.shields.io/github/downloads/nxcd/merge-deep/total.svg)](https://github.com/nxcd/merge-deep)
[![GitHub package version](https://img.shields.io/github/package-json/v/nxcd/merge-deep.svg)](https://github.com/nxcd/merge-deep)

## Instalation

Simply run

**NPM:**
```bash
$ npm install @nxcd/tardis
```

**Yarn:**
```bash
$ yarn add @nxcd/tardis
```

## Usage

### Javascript:

```js
const mergeDeep = require('@nxcd/merge-deep')

const target = { a: 'a' }
const source = { b: 'b' }

mergeDeep(target, source) // { a: a, b: b }

```
