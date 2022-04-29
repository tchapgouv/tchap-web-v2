# Builder
FROM node:14.17.3-buster as builder

WORKDIR /src

COPY . /src
RUN yarn --network-timeout=100000 install
RUN yarn build:js-sdk && yarn install:react-sdk && yarn build:react-sdk && yarn reskindex && yarn build:res && yarn build:bundle

# Copy the config now so that we don't create another layer in the app image
RUN cp /src/config.sample.json /src/webapp/config.json

# App
FROM nginx:alpine

COPY --from=builder /src/webapp /app

# Insert wasm type into Nginx mime.types file so they load correctly.
RUN sed -i '3i\ \ \ \ application/wasm wasm\;' /etc/nginx/mime.types

# Override default nginx config
COPY /nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html \
  && ln -s /app /usr/share/nginx/html
