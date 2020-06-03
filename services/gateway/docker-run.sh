#!/bin/bash

# Prevents bash from replacing /<something with /Program Files/Git/<something>
export MSYS_NO_PATHCONV=1

docker run --rm --env-file '.env' --name gateway \
    -v "$(pwd)/config/gateway.config.yml:/var/lib/eg/gateway.config.yml" \
    -p 9080:9080 \
    api-eg
