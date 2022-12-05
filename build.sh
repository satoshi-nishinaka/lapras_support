#!/bin/bash

rm -fr LaprasScout.zip LaprasScout \
&& npm install \
&& npm run lint:fix \
&& npm run build \
&& cp -r dist LaprasScout \
&& zip -r LaprasScout.zip LaprasScout
