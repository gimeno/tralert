#!/bin/bash

environment=${1}
serviceName=${2}

printHeader() {
    message="----- ${1^^} -----"
    size=${#message}
    lines=""

    i=0
    while [ "${i}" -lt "${size}" ]
    do
        lines="${lines}-"
        i=$((i + 1))
    done

    echo "${lines}"
    echo "${message}"
    echo "${lines}"
}

printHeader "DEPLOY SCRIPT - ${serviceName} SERVICE - START"
# Log in to Docker Hub
echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USER}" --password-stdin

# Docker image name and tags
IMAGE="${DOCKER_USER}/tralert-${serviceName}-service"
GIT_VERSION=$(git describe --always --abbrev --tags --long)

# Build, tag and push image
printHeader "BUILD & PUSH COMMIT IMAGE"
docker build -t service -f "./services/${serviceName}/Dockerfile" .
docker tag service "${IMAGE}:${GIT_VERSION}"
docker push "${IMAGE}:${GIT_VERSION}"

# If env is production image is tagged as latest
printHeader "CREATE ${environment} TAG"
if [ "${environment}" == "production" ]
then
    docker tag service "${IMAGE}:latest"
    docker push "${IMAGE}:latest"
else
    docker tag service "${IMAGE}:${environment}"
    docker push "${IMAGE}:${environment}"
fi

# If env is dev also deploy to Heroku
if [ "${environment}" == "development" ]
then
    printHeader "DEPLOY IMAGE TO HEROKU"
    # Get Heroku cli
    wget -qO- https://toolbelt.heroku.com/install.sh | sh

    # Login into Heroku registry
    echo "${HEROKU_PASSWORD}" | docker login -u "${HEROKU_USERNAME}" --password-stdin registry.heroku.com

    HEROKU_APP_NAME="tralert-${serviceName}-service-dev"

    # Tag and push image to heroku registry
    docker tag service "registry.heroku.com/${HEROKU_APP_NAME}/web"
    docker push "registry.heroku.com/${HEROKU_APP_NAME}/web"

    # Release image in app
    heroku container:release web --app "${HEROKU_APP_NAME}"

fi

printHeader "DEPLOY SCRIPT - ${serviceName} SERVICE - FINISH"

exit 0
