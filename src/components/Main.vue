<template>
  <div class="promo">
    <div class="col-12">
      <Hat class="row"></Hat>
    </div>
    <div class="col-12 col-md-3 d-none d-md-block">
      <Filters class="row"></Filters>
    </div>
    <div class="col-12 col-md-9">
      <Products class="row"></Products>
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
