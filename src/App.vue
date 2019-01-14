<template>
  <div id="app">
    <terminal title="p2p-node1" />
    <terminal title="p2p-node2" />
  </div>
</template>
<script>
import Terminal from './components/Terminal.vue'
export default {
  name: 'app',
  components: {
    Terminal
  }
}
</script>
<style>
</style>
