#!/bin/sh

set -eux

if [[ "${NODE_ENV}" == "development" ]]; then
  npx nest start --watch --debug=0.0.0.0
else
  node --enable-source-maps dist/main.js
fi
