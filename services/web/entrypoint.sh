#!/bin/bash

cd services/web/

echo "===> Building ..."
npm run build

echo "===> Running ... "
exec serve -s build
