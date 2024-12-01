## how to improve performance of nodejs 

1. running nodejs in cluster mode 
2. use worker thread.js


## running nodejs in cluster mode 

in index.js we have used clustering at first when we start the node then it runs it as master and forks other instances as workers , and second time when works uses index.js to strat ther server cluster.isMaster  shows false in this way we can distingusigh inside index.js

now when we request doWork request even when the thread is block it uses other cluster to process other request in other thread 


#### How to Benchmark server's performance 

for this we have to use Apache benchmark for windows download link is https://www.apachelounge.com/download/#google_vignette

after that open bin folder in cmd run this command .\ab.exe -c 50 -n 500 http://localhost:3000/fast  

-c is for concurrency which we set to 50
-n is total number of request to be made which is set to 100
then the url to which ab has to make the request 

#### How many workers/children should we have

we should have the number of children equivalent to our physical or logical cores available

because if we have a dual core cpu and 6 children running which gets 6 requets in conconerncy and 1 request needs 1 sec of cpu to complete 

then each and every request will start at 0th sec and end about 3 sec 

because 2 cpu's will jump over all the 6 threads and that's y 6 req = 6 cpu sec with 2 cpus available will take 3 sec for each to get completed 

on other hand if we have only 2 children then first 2 reqs will be processed in 1 sec 
then other 2 will be completed at the end of 2nd sec , then next 2 in next one sec

