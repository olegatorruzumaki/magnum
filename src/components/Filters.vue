<template>
  <div class="filters">
    <div> Фильтры:
      <hr class="hr">
    </div>
    <div class="filters__types">
      <div class="filters__type mb-4" :key="filter.id" v-for="filter in filters">
        <div class="filters__name">{{ filter.name }}</div>
        <div class="form-check" :key="type.id" v-for="type in filter.types">
          <input class="form-check-input" type="checkbox" :value="type" :id="type.id" v-model="selectedFilters"
                 @change="filterSelect">
          <label class="form-check-label" :for="type.id">{{ type.name }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {eventBus} from "@/main";

export default {
  name: 'Filters',
  props: {},
  data() {
    return {
      selectedFilters: [],
      filters: [
        {
          name: "Формат магазина",
          id: 1,
          types: [
            {
              name: "Magnum Cash & Carry", id: 11, value: "cash", type: "shop",
            },
            {
              name: "Magnum Express", id: 12, value: "express", type: "shop",
            },
            {
              name: "Magnum Super", id: 13, value: "super", type: "shop",
            }]
        },
        {
          name: "Категория товара",
          id: 2,
          types: [
            {
              name: "Овощи и фрукты", id: 21, value: "vegetables", type: "product",
            },
            {
              name: "Для животных", id: 22, value: "animals", type: "product",
            },
            {
              name: "Молочные продукты", id: 23, value: "milk", type: "product",
            }]
        },
        {
          name: "Тип скидки",
          id: 3,
          types: [
            {
              name: "Скидки на каждой полке", id: 31, value: "every", type: "discount",
            },
            {
              name: "1+1", id: 32, value: "1+1", type: "discount",
            },
            {
              name: "Пенсионерам", id: 33, value: "pensioner", type: "discount",
            }]
        },
      ]
    }
  },
  mounted() {
  }
  ,
  methods: {
    filterSelect() {
      eventBus.$emit('filterSelect', this.selectedFilters);
    }
  }
}

</script>

<style lang="scss" scoped>
.filters__name {
  padding: 12px 48px 12px 0;
  font-weight: bold;
  font-size: 14px;
}
</style>
