const cluster = require("cluster");
cluster.schedulingPolicy = cluster.SCHED_RR
if (cluster.isMaster) {
  cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
} else {
  const express = require("express");
  const app = express();
  app.get("/", (req, res) => {
    stuckFor(5000);
    res.send("hi there");
  });
  app.get("/fast", (req, res) => {
    res.send("that was fast!");
  });

  function stuckFor(time) {
    let start = Date.now();
    while (Date.now() - start < time) {}
  }

  app.listen(3000);
}
