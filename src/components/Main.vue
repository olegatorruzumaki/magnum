<template>
  <div class="promo col-12">
    Main Page
    <Hat></Hat>
    <Filters></Filters>
    <Products class="row"></Products>
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
