#!/bin/bash

set -e

version=`node -e 'console.log(require("./package.json").version)'`

npm run clean
npm run build

# include the sample config in the tarball. Arguably this should be done by
# `npm run build`, but it's just too painful.
cp config.sample.json webapp/

mkdir -p dist
cp -r webapp tchap-$version

# if $version looks like semver with leading v, strip it before writing to file
if [[ ${version} =~ ^v[[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+(-.+)?$ ]]; then
    echo ${version:1} > tchap-$version/version
else
    echo ${version} > tchap-$version/version
fi

tar chvzf dist/tchap-$version.tar.gz tchap-$version
rm -r tchap-$version

echo
echo "Packaged dist/tchap-$version.tar.gz"
