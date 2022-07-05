docker run --name redis-demo  -p 6379:6379 -e REDIS_PASSWORD=redis -d redis /bin/sh -c 'redis-server --appendonly yes --requirepass \"${REDIS_PASSWORD}\"'
