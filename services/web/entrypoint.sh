#!/bin/bash

# Generate enviroment variables
npx react-env --dest build

# Execute serve with build files
exec serve -s build
