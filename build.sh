docker-compose down
sh scripts/remove-all-containers.sh
sh scripts/remove-all-images.sh
sh scripts/remove-all-volumes.sh
docker-compose up -d
