<template>
  <div>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
export default {
  components: { HelloWorld },
  name: 'App',
}
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0px;
  font-size: 14px;
}
</style>
