# Crowdengine Log Viewer

Crowdengine log viewer is a frontend app which allows developers inspect the logs of a crowdengine local test node.

We have decided to automate the initialization and deployment of nodes to a local test network, in order to save time during development. This approach allows us to develop and deploy the new code without the need to rebuild and reconfigure the `gocc` client.

![Screenshot](/src/assets/low_viewer.png?raw=true)

## Run Crowdengine

In order to see the dev nodes, clone the crowdengine repository to your desired destination and execute the following commands:

```
$ git clone https://github.com/crowdcompute/crowdengine
$ cd crowdengine
$ make build
```

Make sure there were no errors during the build phase. Now we need to build the docker image with the elasticsearch stack and run a container:

```
$ make build-logserver
$ make run-logserver
```
At this stage, the logging stack is initializing, it might take a few seconds to minutes depending on your machine. Open `http://localhost:5601` and check if kibana is loaded properly. If you get `Kibana server is not ready yet` just wait and reload until the page is normaly loaded.

You can inspect the test node logs in the kibana control panel or use this frontend to quickly inspect and see the logs of each test node.


## Run Crowdengine Log Viewer

An alternative approach to inspect the logs of local test nodes using this UI. First make sure you follow the previous steps to get a local test network with a few nodes(currently two nodes). Follow these instructions:

```
$ git clone https://github.com/crowdcompute/crowdengine-log-viewer
$ cd crowdengine-log-viewer
$ npm install
$ npm run serve
```

Finally open `http://localhost:8080/` in a browser.