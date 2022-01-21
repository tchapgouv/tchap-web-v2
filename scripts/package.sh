#!/bin/bash

set -e

dev=""
version=`node -e 'console.log(require("./package.json").version)'`
now=$(date +%Y%m%d)

yarn clean
# Estelle change build command for now
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

# Estelle remove tar for now
#tar chvzf dist/tchap-$version-$now.tar.gz tchap-$version
cp -r tchap-$version/* dist/
rm -r tchap-$version

echo
#echo "Packaged dist/tchap-$version-$now.tar.gz"
echo "Package dist/tchap-$version"
