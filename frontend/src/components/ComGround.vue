<template>
  <div class="ground">
    <ComHeader/>
    <ComMemo/>
    <ComFooter/>
  </div>
</template>

<script>
import ComHeader from './ComHeader.vue'
import ComFooter from './ComFooter.vue'
import ComMemo from './ComMemo.vue'
export default {
  components: {
    ComHeader,
    ComFooter,
    ComMemo
  }
}
</script>
<style scoped>
</style>
