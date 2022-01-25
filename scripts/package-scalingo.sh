#!/bin/bash

# Tchap: File copied from scripts/package.json.

set -e

version=`node -e 'console.log(require("./package.json").version)'`
now=$(date +%Y%m%d)

yarn clean
yarn build:scalingo

# include the sample config in the tarball. Arguably this should be done by
# `yarn build`, but it's just too painful.
cp config.sample.json webapp/

mkdir -p dist
cp -r webapp tchap-$version

# if $version looks like semver with leading v, strip it before writing to file
if [[ ${version} =~ ^v[[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+(-.+)?$ ]]; then
    echo ${version:1} > tchap-$version/version
else
    echo ${version} > tchap-$version/version
fi

# Do not make a tar file. Just copy the files in /dist, ready to be served.
cp -r tchap-$version/* dist/
rm -r tchap-$version

echo
echo "Package dist/tchap-$version"
