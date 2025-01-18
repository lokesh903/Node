## IMplimenting redis

### what problem we were facing
fall scan while searching for title which was very in efficient 
#### temp solution 
as a temp solution for this we should add index to title, but indexing cause more delay if there are more indexs in a table/model

so its better to use cache server in between mongoose and mongodb

### hence for repeated read queries we should use radis
1. Redis is an in memory application which means if server is restarted all data within it will be vanished
2. the node library which we use to intract with redis server is redis

#### instalation of redis in windows 

https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/

basic commands to use [link ](https://learn.microsoft.com/en-us/windows/wsl/basic-commands)
```
wsl --distribution <Distribution Name> --user <User Name>
```
check versions 
```
wsl -l -v
wsl --list --verbose
```
command to start specific wsl 
```
wsl --distribution Ubuntu-22.04
```

Then flow [doc](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/) to install redis 



### basic commands to use redis

to start redis server
``` 
sudo service redis-server start
```

Connect to Redis
```
redis-cli
```

Test the connection with the ping command:
```
127.0.0.1:6379> ping
PONG
```
### basic commands for node-redis

set key value in redis 
```
client.set('key','value')
```

set key value in redis 
```
client.set('key','value')
```

delete all data in redis server
```
client.flushall()
```

