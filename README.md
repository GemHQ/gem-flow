## Prerequisites

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
```
cd gem-flow
```
Update `.env.template` with your **API keys** and **save** file.

```
cp .env.template ./server
```

### 3. **Build your environment**
```
sh scripts/rebuild.sh
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

## Happy Coding!
