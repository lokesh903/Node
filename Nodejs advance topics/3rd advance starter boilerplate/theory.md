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

basic commands to use 

wsl --distribution <Distribution Name> --user <User Name>



