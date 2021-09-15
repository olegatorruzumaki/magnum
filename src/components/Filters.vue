<template>
  <div class="filters row">
    <div class="col-12 d-none d-md-block">
      <div class="filters__hat pb-3 pb-md-1"> Фильтры:</div>
      <div class="filters__types">
        <div class="filters__type" :key="filterKey + filter.id" v-for="(filter, index) in filters">
          <div class="filters__name mb-2 mt-4">{{ filter.name }}</div>
          <div v-if="filter.isShowMore">
            <div class="filters__check" :key="type.id" v-for="type in filter.types.slice(0,5)">
              <input class="filters__check-input" type="checkbox" :value="type" :id="type.id" v-model="selectedFilters"
                     @change="filterSelect">
              <label class="filters__check-label" :for="type.id">{{ type.name }}</label>
            </div>
            <div class="filters__showMore" v-if="!filter.showMore" @click="showMore(index)">Показать всё
              ({{ filter.types.length }})
            </div>
          </div>
          <div v-else>
            <div class="filters__check" :key="type.id" v-for="type in filter.types">
              <input class="filters__check-input" type="checkbox" :value="type" :id="type.id" v-model="selectedFilters"
                     @change="filterSelect">
              <label class="filters__check-label" :for="type.id">{{ type.name }}</label>
            </div>
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
          <img :src="require(`@/assets/svg/icon-close.svg`)" @click="$bvModal.hide('modal-filter')"
               class="close-button"
               alt="close">
        </div>
      </div>

      <div class="filters__types">
        <div v-if="Object.keys(mobileSelectedFilter).length === 0">
          <div class="filters__type" @click="selectFilterCategory(filter)" :key="filter.id" v-for="filter in filters">
            <div class="filters__name">{{ filter.name }}</div>
          </div>
        </div>
        <div v-else>
          <div class="filters__check" :key="filter.id" v-for="filter in mobileSelectedFilter.types">
            <input class="filters__check-input" type="checkbox" :value="filter" :id="'mobile-' + filter.id"
                   v-model="selectedFilters" @change="filterSelect">
            <label class="filters__check-label ml-3" :for="'mobile-' + filter.id">{{ filter.name }}</label>
          </div>
        </div>
        <div class="filters__buttons">
          <div v-if="Object.keys(selectedFilters).length !== 0" class="text-center filters__remove-filters"
               @click="clearFilters">Сбросить фильтры
          </div>
          <div @click="$bvModal.hide('modal-filter')" class="text-center filters__accept-filters" type="button">
            Применить фильтры
          </div>
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
      filterKey: 0,
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
            },
            {
              name: "Овощи и фрукты1", id: 211, value: "vegetables", type: "product",
            },
            {
              name: "Для животных1", id: 221, value: "animals", type: "product",
            },
            {
              name: "Молочные продукты1", id: 231, value: "milk", type: "product",
            },
            {
              name: "Овощи и фрукты2", id: 212, value: "vegetables", type: "product",
            },
            {
              name: "Для животных2", id: 222, value: "animals", type: "product",
            },
            {
              name: "Молочные продукты2", id: 232, value: "milk", type: "product",
            },
          ]
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
            },
          ]
        },
      ],
      mobileSelectedFilter: {},
    }
  },
  mounted() {
    this.filters.forEach((filter, index) => {
      this.filters[index].isShowMore = filter.types.length > 4;
      this.filters[index].showMore = false;
      this.filters[index].key = filter.id++;
    })
  }
  ,
  methods: {
    showMore(index) {
      this.filters[index].isShowMore = false;
      this.filterKey++;
    },
    clearFilters() {
      this.selectedFilters = [];
      eventBus.$emit('filterSelect', this.selectedFilters);
    }
    ,
    filterSelect() {
      eventBus.$emit('filterSelect', this.selectedFilters);
    }
    ,
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

.filters__types {
  @media(max-width: 768px) {
    padding-bottom: 150px;
  }
}

.filters__accept-filters, .filters__remove-filters {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
}

.filters__buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 32px 16px 24px;
  background: linear-gradient(0deg, white 80%, transparent 100%);
}

.filters__accept-filters {
  background: #b70050;
  color: white;
  bottom: 48px;
}

.filters__remove-filters {
  background: #f5f7fa;
  bottom: 112px;
  margin-bottom: 16px;
}

.filters__check {
  label {
    display: flex;
    align-items: center;
  }

  @media(max-width: 768px) {
    border-bottom: 1px solid #dcdde0;
  }
}

.filters__check-input, .filters__check-label {
  cursor: pointer;
}

.filters__check-label {
  padding: 14px 16px 14px 0;
}

.filters__check-input {
  position: absolute;
  z-index: -1;
  opacity: 0;

  & + label:before {
    width: 24px;
    height: 24px;
    margin-right: 16px;
    content: '';
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #adb5bd;
    border-radius: 0.25em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }

  &:checked + label::before {
    border-color: #b70050;
    background-color: #b70050;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }
}

.filters__showMore {
  cursor: pointer;
  color: #b70050;
  padding: 14px 16px 14px 0;
}
</style>
