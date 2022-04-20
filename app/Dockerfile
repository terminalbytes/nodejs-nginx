# syntax=docker/dockerfile:experimental
FROM mhart/alpine-node:14 as builder
COPY package.json .
COPY yarn.lock .
RUN  yarn install --frozen-lockfile --non-interactive
COPY tsconfig.json .
COPY src src/.
RUN yarn build

FROM mhart/alpine-node:14
RUN mkdir -p /var/app
WORKDIR /var/app
COPY package.json .
COPY yarn.lock .
# Install production modules only
RUN yarn install --frozen-lockfile --non-interactive --production && \
    yarn cache clean
COPY --from=builder dist dist/
EXPOSE 9883

CMD ["yarn", "start"]
