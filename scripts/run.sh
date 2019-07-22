#!/bin/bash
set -e
npm install
./node_modules/.bin/sequelize db:migrate --url 'postgres://admin:zyX1Jw31pOT5OFDUqYgNR93b@postgres:5432/database'
npm run production