#!/bin/sh
http-server -p 9998 -c 0 --cors loader/build/ &
http-server -p 9999 -c 0 --cors notification-app/build &
cd main-app
yarn start
