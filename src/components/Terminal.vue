<template>
<div style="padding:20px;">
    <div style="width: 60%;" class="terminal_window">
        <header style="">
            <div class="red_btn button"></div>
            <div class="green_btn button"></div>
            <div class="yellow_btn button"></div>
            <div style="margin-left: 21px; font-size: 14px; display: inline-block; color: #ffffff;">{{title}}</div>
        </header>
        <div ref="termbody" id="termbody1" style="overflow-y: scroll;" class="terminal_window term-body">
            <div id="typed-strings" class="terminal_text">
                <p v-for="log in logs" :key="log.message" class="terminal-item"><span style="text-transform:uppercase; color:#00ff18;"> {{log["_source"]["@timestamp"] | humandate}}</span> <span style="text-transform:uppercase; color:#13b5de;"> [{{log["_source"].level}}]</span> {{log["_source"].message}}</p>
                <p v-show="logs.length==0" class="terminal-item">
                    <span style="color:#0eff5a; font-size:20px; ">➜</span> <span style="color:#20bae0; font-size:20px;"> ~</span> No data available
                </p>
            </div>
            <span id="typed"></span>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
          logs: []
        }
    },
    props: ['title', 'data'],
    methods: {
        scrollBottom() {
            this.$refs.termbody.scrollTop = this.$refs.termbody.scrollHeight;
        },
        async getLogs() {
          var elasticsearch = require('elasticsearch');
          var client = new elasticsearch.Client({
            host: process.env.ELASTICSEARCH_ENDPOINT,
            // log: 'trace'
          })

          const response = await client.search({
            type: 'doc',
            body: {
              "size": 2000,
              "sort": [
                {
                  "@timestamp": {
                    "order": "asc"
                  }
                }
              ], 
              "query" : {
                "constant_score": {
                  "filter": {
                    "term": {
                      "@node": this.title.replace("p2p-", "")
                    }
                  }
                }
              }
            }
          })
          this.$set(this, "logs", response.hits.hits )
          // this.scrollBottom()
        }
    },
    mounted() {
        setInterval(this.getLogs, 2000)
    }
}
</script>

<style>
body {
  font-family: monospace;
  background-color: #f2f2f2;
}

.term-body::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	/* border-radius: 10px; */
	background-color: #26324c;
}

.term-body::-webkit-scrollbar
{
	width: 12px;
	background-color: #F5F5F5;
}

.term-body::-webkit-scrollbar-thumb
{
	/* border-radius: 10px; */
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #bcbcbc;
}


.terminal_window {
  margin: 0 auto;
  height: 400px;
  text-align: left;
  /* margin-top: 15px; */
  position: relative;
  border-radius: 10px;
}

.terminal_window header {
  background-color: #26324c;
  height: 30px;
  border-radius: 8px 8px 0 0;
  padding-left: 10px;
}

.terminal_window .button {
  width: 12px;
  height: 12px;
  margin: 10px 4px 0 0;
  display: inline-block;
  border-radius: 8px;
}

.red_btn {
  background-color: #E75448;
}

.green_btn {
  background-color: #3BB662;
}

.yellow_btn {
  background-color: #E5C30F;
}

.terminal_window {
  background-color: #26324c;
  color: #F4FAFF;
  font-size: 11pt;
}

.terminal_text {
  margin-left: 20px;
  /* font-family: Menlo, Monaco, "Consolas", "Courier New", "Courier"; */
}

#typed-strings {
  display: inline-block;
  position: relative;
}

#typed {
  /* font-family: Menlo, Monaco, "Consolas", "Courier New", "Courier"; */
  margin-left: 15px;
}

.terminal-item {
  padding:0;
  margin:0;
}
</style>
