![](flow-demo-1.gif)

<br/>

# Gem Flow

Gem Flow is an example app demonstrating how to excecute entire flows with Gem's Api.

<br/>

## Flows

### Onramp

Gem Onramp flow demonstrates the steps from creating a user through excecuting a buy transaction using a Plaid linked account (via Wyre). 

These steps includes user creation, creating a profile for that user, using this profile to set up a Wyre connection, linking a Plaid account to the Wyre connection, and finally making a transaction with the linked Plaid account. 

<br/>

## Prerequisites

You must obtain a Gem API Key and Secret pair.

You must have docker installed. Please refer to Docker's official site:

Mac: https://docs.docker.com/docker-for-mac/install/

Windows: https://docs.docker.com/docker-for-windows/install/

<br/>

## **Get Started**
### 1. **Clone repo**
```
git clone git@github.com:GemHQ/gem-flow.git
cd gem-flow
```

### 2. **Enter your creds**

Create a `.env` file under `<root>/server` directory with your **API keys** and **save** file. A `.env.example` is attached for a full example.

```
GEM_API_KEY=<your-api-key>
GEM_API_SECRET=<your-api-secret>
```

Create a `.env` file under `<root>/client` directory with your **Coinbase Client ID** and **save** file. If you do not have a Coinbase Client ID then contact us to supply one.

```
REACT_APP_COINBASE_CLIENT_ID=<your-coinbase-client-id>
```

### 3. **Start your environment**
```
sh start.sh
```
Then navigate to http://localhost:3000

<br/>

## **Useful Scripts**

#### **To reboot your setup with a fresh build:**
```
sh scripts/reboot.sh
```
#### **To start your setup:**
```
sh scripts/start.sh
```
#### **To stop your setup:**
```
sh scripts/stop.sh
```
#### **To clean up:**
```
sh scripts/remove.sh
```

<br/>

If you run into issues, it will always be resolved by running rebuild.sh.
Worst case, restart your docker.

<br/>

## Architecture

Flow consists of multiple services handling different segments of the stack:

- [NodeJS](https://nodejs.org/en/) and [Express](https://expressjs.com/) for the backend server
- [React](https://reactjs.org/) frontend with [MobX](https://mobx.js.org/README.html) for state management
- [PostgreSQL](https://www.postgresql.org/) database for managing access tokens
- [Docker Compose](https://docs.docker.com/compose/) to orchestrate these services

The backend server uses [Gem's Node SDK](https://github.com/GemHQ/gem-node) to authenticate and make requests to the API.

