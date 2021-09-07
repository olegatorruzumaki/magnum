<template>
  <div class="hat">
    <div class="hat__title">Акции и спецпредложения</div>
    <div class="hat__descrption">Магазины Магнит работают для вас в обычном режиме. С 14:00 до 14:30 проводится
      санитарная обработка торговых залов
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hat',
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
.hat__title {
  font-size: 40px;
  font-weight: bold;
}

.hat__descrption {
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 40px;
}
</style>
