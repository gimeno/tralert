#!/bin/bash

# Prevents bash from replacing /<something with /Program Files/Git/<something>
export MSYS_NO_PATHCONV=1

docker build -t api-eg .

# Remove dangling images
docker image prune -f
