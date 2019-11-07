# Gem Flow

Gem Flow is an example app demonstrating how a transaction can be made using Gem Api.

## Flows

### Onramp

Gem Onramp flow demonstrates the steps from creating a user through excecuting a buy transaction using a Plaid linked account (via Wyre). These steps includes user creation, creating a profile for that user, using this profile to set up a Wyre connection, linking a Plaid account to the Wyre connection, and finally making a transaction with the linked Plaid account. 

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

Create a `.env` file in the root directory with your **API keys** and **save** file.

```
GEM_API_KEY=<your-api-key>
GEM_API_SECRET=<your-api-secret>
```


### 3. **Build your environment**
```
sh build.sh
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

## Architecture

Flow consists of multiple services handling different segments of the stack:

- NodeJS and Express for the backend server
- React frontend with MobX for state management
- PostgreSQL database for managing access tokens
- Docker to orchestrate these services

The backend server also uses [Gem's Node SDK](https://github.com/GemHQ/gem-node) to authenticate and make requests to the API.

