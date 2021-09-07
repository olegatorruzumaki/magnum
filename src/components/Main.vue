<template>
  <div class="promo col-12">
    <Hat></Hat>
    <div class="row">
      <div class="col-3">
        <Filters></Filters>
      </div>
      <div class="col-9">
        <Products class="row"></Products>
      </div>
    </div>
  </div>
</template>

<script>
import Hat from '@/components/Hat'
import Filters from '@/components/Filters'
import Products from '@/components/Products'

export default {
  name: 'Main',
  components: {Hat, Filters, Products},
  props: {},
  data() {
    return {}
  },
  mounted() {
  },
  methods: {}
}

</script>

<style lang="scss" scoped>
</style>
