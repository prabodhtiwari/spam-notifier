# Spam Notifier

An API Endpoint that sends a message to a Slack channel if the payload matches desired criteria.

## Prerequesties

```
Node.js version 18
Yarn
```

## Environment variables

```
SLACK_BOT_TOKEN
CHANNEL_ID
```

## Install

From project root's cmd directory run following commands

```
yarn
```

## Test

From project root run following commands

```
yarn test
```

## Starting Server

From project root run following command

```
yarn build && yarn start
```

You can access it at http://127.0.0.1:3000

## Requests

Create a new deck

```
http POST :3000/ Type=SpamNotification Email=zaphod@example.com
http POST :3000/ Type=HardBounce Email=zaphod@example.com
```

> These commands assume [httpie](https://httpie.org/) is installed
