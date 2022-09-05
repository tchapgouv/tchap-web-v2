#!/bin/bash

# Tchap: File copied from scripts/package.json.

set -e
echo "prebuild tchap"

if [[ -n "$GITHUB_TOKEN" ]] ; then
# git clone tchapgouv repo and version
grep github:tchapgouv package.json |awk ' { print $2 }' |sed -e 's/"//g;s/,//g; s/github://g ' | awk -F# ' { print $1, $2 } ' |while read repo version ; do

git clone "https://${GITHUB_TOKEN}@github.com/$repo"
( cd $(basename $repo)
  git reset --hard $version
)
done

# fix github ref to file:../matrix-js-sdk 
( cd matrix-react-sdk
  sed -i  -e 's|github:tchapgouv/\(.*\)#.*|file:../\1",|' package.json
)

# replace github ref to file in tchap-web package.json
sed -i -e 's|github:tchapgouv/\(.*\)#.*|file:\1",|' package.json
else
    echo "no prebuild action"
fi
