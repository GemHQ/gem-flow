docker build . -t gem-flow
docker run -p 3000:3000 -p 3001:3001 -d gem-flow 
