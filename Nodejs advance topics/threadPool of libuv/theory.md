## theory

all above fns will initiate more or less at the same time, it will not wait to wait for others to complete and that's why logs will not be sereailized 

hence node is not completely sigle threaded system, but event loops run in a single thread

libuv has a thread pool by default it has a pool of 4 threads which are used to off load expesive calculations, many function inside node use these 

hence in addition of one thread for event loop we have 4 threads also in the libuv's threadpool

the concept of 4 extra threads can be noticed to the 5th call excecution, and 9th call exceution as it process 4 fns almost concurrently but after that it holds , this number of threads concurrent running can be changed by process.env.UV_THREADPOOL_SIZE   

all of operations related to fs uses threadpool

once all the tasks in the threadpool is done then only the main event loop thread can exit 

## Crazy behaviour of node

In multi tasking file 

first log was from the http request fn because it dose'nt wait for threadpool 

second log was from hashing function, even though filesystem was started first because when it started it takes a pause while taking file info from hdd at that time thread was allocated to hash fn

thrid log was from fs because after completing the first hash , thread was allocated to fs

fourth fifth sixth log was from hash 







