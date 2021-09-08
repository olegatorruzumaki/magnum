<template>
  <div class="filters row">
    <div class="col-12 d-none d-md-block">
      <div class="filters__hat"> Фильтры:</div>
      <div class="filters__types">
        <div class="filters__type" :key="filter.id" v-for="filter in filters">
          <div class="filters__name">{{ filter.name }}</div>
          <div class="form-check" :key="type.id" v-for="type in filter.types">
            <input class="form-check-input" type="checkbox" :value="type" :id="type.id" v-model="selectedFilters"
                   @change="filterSelect">
            <label class="form-check-label" :for="type.id">{{ type.name }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 d-md-none">
      <div class="filters__hat-mobile row">
        <div class="col-12 flex-vertical-center space-between">
          <img :class="{'opacity-0': (Object.keys(mobileSelectedFilter).length === 0)}"
               :src="require(`@/assets/svg/icon-arrow.svg`)" @click="mobileSelectedFilter = {}" class="back-button"
               alt="back">
          <div class="text-center fw-bold">{{ mobileSelectedFilter.name || 'Фильтр' }}</div>
          <img :src="require(`@/assets/svg/icon-close.svg`)" @click="$bvModal.hide('modal-filter')" class="close-button"
               alt="close">
        </div>
      </div>

      <div class="filters__types">
        <div v-if="Object.keys(mobileSelectedFilter).length === 0">
          <div class="filters__type" :key="filter.id" v-for="filter in filters">
            <div class="filters__name" @click="selectFilterCategory(filter)">{{ filter.name }}</div>
          </div>
        </div>
        <div v-else>
          <div class="filters__type" :key="filter.id" v-for="filter in mobileSelectedFilter.types">
            <input class="form-check-input" type="checkbox" :value="filter" :id="'mobile-' + filter.id"
                   v-model="selectedFilters" @change="filterSelect">
            <label class="form-check-label ml-3" :for="'mobile-' + filter.id">{{ filter.name }}</label>
          </div>
        </div>
        <div v-if="Object.keys(selectedFilters).length !== 0" class="text-center filters__remove-filters"
             @click="clearFilters">Сбросить фильтры
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
      filters: [  // все данные под бек*
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
      ],
      mobileSelectedFilter: {},
    }
  },
  mounted() {
  },
  methods: {
    clearFilters() {
      this.selectedFilters = [];
      eventBus.$emit('filterSelect', this.selectedFilters);
    },
    filterSelect() {
      eventBus.$emit('filterSelect', this.selectedFilters);
    },
    selectFilterCategory(filter) {
      this.mobileSelectedFilter = filter;
    }
  }
}

</script>

<style lang="scss" scoped>
.filters__hat {
  line-height: 50px;
  border-bottom: 1px solid #dcdde0;
}

.filters__hat-mobile {
  position: relative;
  padding: 0 0 20px;
  border-bottom: 1px solid #dcdde0;
}

.back-button {
  transform: rotate(180deg);
}

.filters__name {
  font-size: 14px;
  @media(min-width: 768px) {
    font-weight: bold;
  }
}

.filters__type {
  @media(max-width: 768px) {
    display: flex;
    align-items: center;
    padding: 20px 48px 20px 0;
    border-bottom: 1px solid #dcdde0;
  }
}

.filters__remove-filters {
  position: absolute;
  bottom: 48px;
  width: calc(100% - 33px);
  background: #f5f7fa;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
}
</style>
