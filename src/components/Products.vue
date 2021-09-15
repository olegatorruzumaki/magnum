<template>
  <div class="products">
    <div class="products__hat col-12">
      <div class="space-between px-0 mb-3 mb-md-1">
        <div class="d-none d-md-block">Найдено {{ filteredLength }} акций</div>
        <label class="products__select">
          <select class="border-0" name="sort" v-model="sort" @change="sortBy(sort)">
            <option value="dateToHigh">Новизна: по возрастанию</option>
            <option value="dateToLow">Новизна: по убыванию</option>
            <option value="priceToHigh">Цена: по возрастанию</option>
            <option value="priceToLow">Цена: по убыванию</option>
            <option value="discountToHigh">Скидка: по возрастанию</option>
            <option value="discountToLow">Скидка: по убыванию</option>
          </select>
        </label>
        <div class="d-md-none products__filter-button" v-b-modal.modal-filter>Фильтр</div>
        <b-modal static id="modal-filter" hide-footer hide-header>
          <Filters class="row"></Filters>
        </b-modal>
      </div>
    </div>
    <div class="col-12">
      <div class="row products__items">
        <div class="products__item col-12 col-sm-6 col-md-4 col-lg-3" :key="product.id"
             v-for="product in filteredProducts[page-1]">
          <div class="row">
            <div class="products__type col-12 d-none d-md-block">{{ product.discountName }}</div>
            <div class="products__img col-4 col-md-12 mb-md-4">
              <img class="mh-100 mw-100" :src="product.img" alt="#">
              <div class="products__discount">-{{ product.discount }}%</div>
              <div class="products__old">{{ product.old }}</div>
              <div class="products__new">{{ product.new }}</div>
            </div>
            <div class="col-8 col-md-12">
              <div class="products__type d-md-none">{{ product.discountName }}</div>
              <div class="products__name">{{ product.name }}</div>
              <div class="products__footer mt-4">
                <div class="products__date">
                  <div>{{ product.dateFrom }}</div>
                  <div>{{ product.dateTo }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <pagination class="mt-3" v-model="page" :per-page="16" :options="{texts: {count: ''}}"
                  :records="[].concat.apply([], this.filteredProducts).length"/>
    </div>
  </div>
</template>

<script>
import {eventBus} from "@/main";
import Filters from '@/components/Filters'

export default {
  name: 'Products',
  components: {Filters},
  props: {},
  data() {
    return {
      page: 1,
      sort: "priceToHigh",
      products: [ // все данные под бек*
        {
          id: 0,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "animals",
          shopType: "express",
          name: "Корм для кошек FELIX, желе с форелью, 85 г",
          dateFrom: "с 01 сентября",
          dateTo: "до 07 сентября",
          old: 250,
          new: 140,
          date: 1631042524, //epoch date
          discount: 42,
          img: "https://magnit.ru/upload/iblock/eb4/eb4ac1b0384154c8a91aef0aa630b14b.jpg",
        },
        {
          id: 1,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "animals",
          shopType: "super",
          name: "Корм для кошек WHISKAS, влажный паштет, индейка/кролик, 75 г",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 200,
          new: 150,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/784/784c4c486e037af8cbd523bdd0691b31.jpg",
        },
        {
          id: 2,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "milk",
          shopType: "cash",
          name: "Напиток кисломолочный ACTIMEL, детский, клубника/банан, 2,5 %, 100 г",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 600,
          new: 50,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/3d5/3d53f490e7a4a342812289cc9cf96410.jpg",
        },
        {
          id: 3,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "animals",
          shopType: "cash",
          name: "Корм для кошек FELIX 2, желе с форелью, 85 г",
          dateFrom: "с 01 сентября",
          dateTo: "до 07 сентября",
          old: 250,
          new: 150,
          discount: 42,
          img: "https://magnit.ru/upload/iblock/eb4/eb4ac1b0384154c8a91aef0aa630b14b.jpg",
        },
        {
          id: 4,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "animals",
          shopType: "cash",
          name: "Корм для кошек WHISKAS 2, влажный паштет, индейка/кролик, 75 г",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 200,
          new: 160,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/784/784c4c486e037af8cbd523bdd0691b31.jpg",
        },
        {
          id: 5,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "milk",
          shopType: "super",
          name: "Напиток кисломолочный ACTIMEL 2, детский, клубника/банан, 2,5 %, 100 г",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 600,
          new: 55,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/3d5/3d53f490e7a4a342812289cc9cf96410.jpg",
        },
        {
          id: 6,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "animals",
          shopType: "express",
          name: "Корм для кошек FELIX3, желе с форелью, 85 г",
          dateFrom: "с 01 сентября",
          dateTo: "до 07 сентября",
          old: 250,
          new: 120,
          discount: 42,
          img: "https://magnit.ru/upload/iblock/eb4/eb4ac1b0384154c8a91aef0aa630b14b.jpg",
        },
        {
          id: 7,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "animals",
          shopType: "super",
          name: "Корм для кошек WHISKAS3, влажный паштет, индейка/кролик, 75 г",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 200,
          new: 190,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/784/784c4c486e037af8cbd523bdd0691b31.jpg",
        },
        {
          id: 8,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "milk",
          shopType: "super",
          name: "Напиток кисломолочный ACTIMEL3, детский, клубника/банан, 2,5 %, 100 г",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 600,
          new: 555,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/3d5/3d53f490e7a4a342812289cc9cf96410.jpg",
        },
        {
          id: 9,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "animals",
          shopType: "express",
          name: "Корм для кошек FELIX4, желе с форелью, 85 г",
          dateFrom: "с 01 сентября",
          dateTo: "до 07 сентября",
          old: 250,
          new: 444,
          discount: 42,
          img: "https://magnit.ru/upload/iblock/eb4/eb4ac1b0384154c8a91aef0aa630b14b.jpg",
        },
        {
          id: 10,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "animals",
          shopType: "super",
          name: "Корм для кошек WHISKAS4, влажный паштет, индейка/кролик, 75 г",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 200,
          new: 1520,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/784/784c4c486e037af8cbd523bdd0691b31.jpg",
        },
        {
          id: 11,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "milk",
          shopType: "super",
          name: "Напиток кисломолочный ACTIMEL4, детский, клубника/банан, 2,5 %, 100 г",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 600,
          new: 510,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/3d5/3d53f490e7a4a342812289cc9cf96410.jpg",
        },
        {
          id: 12,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "animals",
          shopType: "express",
          name: "Корм для кошек FELIX, желе с форелью, 85 г",
          dateFrom: "с 01 сентября",
          dateTo: "до 07 сентября",
          old: 250,
          new: 140,
          date: 1631042524, //epoch date
          discount: 42,
          img: "https://magnit.ru/upload/iblock/eb4/eb4ac1b0384154c8a91aef0aa630b14b.jpg",
        },
        {
          id: 13,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "animals",
          shopType: "super",
          name: "Корм для кошек WHISKAS, влажный паштет, индейка/кролик, 75 г",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 200,
          new: 150,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/784/784c4c486e037af8cbd523bdd0691b31.jpg",
        },
        {
          id: 14,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "milk",
          shopType: "cash",
          name: "Напиток кисломолочный ACTIMEL, детский, клубника/банан, 2,5 %, 100 г",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 600,
          new: 50,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/3d5/3d53f490e7a4a342812289cc9cf96410.jpg",
        },
        {
          id: 15,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "animals",
          shopType: "cash",
          name: "Корм для кошек FELIX 2, желе с форелью, 85 г",
          dateFrom: "с 01 сентября",
          dateTo: "до 07 сентября",
          old: 250,
          new: 150,
          discount: 42,
          img: "https://magnit.ru/upload/iblock/eb4/eb4ac1b0384154c8a91aef0aa630b14b.jpg",
        },
        {
          id: 16,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "animals",
          shopType: "cash",
          name: "Корм для кошек WHISKAS 2, влажный паштет, индейка/кролик, 75 г",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 200,
          new: 160,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/784/784c4c486e037af8cbd523bdd0691b31.jpg",
        },
        {
          id: 17,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "milk",
          shopType: "super",
          name: "Напиток кисломолочный ACTIMEL 2, детский, клубника/банан, 2,5 %, 100 г",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 600,
          new: 55,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/3d5/3d53f490e7a4a342812289cc9cf96410.jpg",
        },
        {
          id: 18,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "animals",
          shopType: "express",
          name: "Корм для кошек FELIX3, желе с форелью, 85 г",
          dateFrom: "с 01 сентября",
          dateTo: "до 07 сентября",
          old: 250,
          new: 120,
          discount: 42,
          img: "https://magnit.ru/upload/iblock/eb4/eb4ac1b0384154c8a91aef0aa630b14b.jpg",
        },
        {
          id: 19,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "animals",
          shopType: "super",
          name: "Корм для кошек WHISKAS3, влажный паштет, индейка/кролик, 75 г",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 200,
          new: 190,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/784/784c4c486e037af8cbd523bdd0691b31.jpg",
        },
        {
          id: 20,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "milk",
          shopType: "super",
          name: "Напиток кисломолочный ACTIMEL3, детский, клубника/банан, 2,5 %, 100 г",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 600,
          new: 555,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/3d5/3d53f490e7a4a342812289cc9cf96410.jpg",
        },
        {
          id: 21,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "animals",
          shopType: "express",
          name: "Корм для кошек FELIX4, желе с форелью, 85 г",
          dateFrom: "с 01 сентября",
          dateTo: "до 07 сентября",
          old: 250,
          new: 444,
          discount: 42,
          img: "https://magnit.ru/upload/iblock/eb4/eb4ac1b0384154c8a91aef0aa630b14b.jpg",
        },
        {
          id: 22,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "animals",
          shopType: "super",
          name: "Корм для кошек WHISKAS4, влажный паштет, индейка/кролик, 75 г",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 200,
          new: 1520,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/784/784c4c486e037af8cbd523bdd0691b31.jpg",
        },
        {
          id: 23,
          discountName: "Скидки на каждой полке",
          discountType: "every",
          productType: "milk",
          shopType: "super",
          name: "Напиток кисломолочный ACTIMEL4, детский, клубника/банан, 2,5 %, 100 г",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 600,
          new: 510,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/3d5/3d53f490e7a4a342812289cc9cf96410.jpg",
        },
      ],
      filteredProducts: [],
      filteredLength: '',
      selectedFilters: [],
    }
  },
  methods: {
    sortBy(type) {
      switch (type) {
        case "priceToHigh":
          this.products.sort(function (a, b) {
            if (a.new > b.new) {
              return 1;
            }
            if (a.new < b.new) {
              return -1;
            }
            return 0;
          });
          break;
        case "priceToLow":
          this.products.sort(function (a, b) {
            if (a.new < b.new) {
              return 1;
            }
            if (a.new > b.new) {
              return -1;
            }
            return 0;
          });
          break;
        case "discountToHigh":
          this.products.sort(function (a, b) {
            if (a.discount > b.discount) {
              return 1;
            }
            if (a.discount < b.discount) {
              return -1;
            }
            return 0;
          });
          break;
        case "discountToLow":
          this.products.sort(function (a, b) {
            if (a.discount < b.discount) {
              return 1;
            }
            if (a.discount > b.discount) {
              return -1;
            }
            return 0;
          });
          break;
        case "dateToHigh":
          this.products.sort(function (a, b) {
            if (a.date > b.date) {
              return 1;
            }
            if (a.date < b.date) {
              return -1;
            }
            return 0;
          });
          break;
        case "dateToLow":
          this.products.sort(function (a, b) {
            if (a.date < b.date) {
              return 1;
            }
            if (a.date > b.date) {
              return -1;
            }
            return 0;
          });
          break;
      }
      this.breakForPages(this.products);
      this.filterBy(this.selectedFilters);
    },
    breakForPages(array) {
      let size = 16;
      let filtered = [];

      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        filtered[i] = array.slice((i * size), (i * size) + size);
      }
      this.filteredProducts = filtered;
      this.filteredLength = this.filteredProducts.flat().length;
    },
    filterBy(filters) {
      if (filters.length) {
        const shopFilters = filters.filter(item => item.type === 'shop').map(item => item.value);
        const productFilters = filters.filter(item => item.type === 'product').map(item => item.value);
        const discountFilters = filters.filter(item => item.type === 'discount').map(item => item.value);

        if (shopFilters.length) {
          this.filteredProducts = this.products.filter(product => shopFilters.includes(product.shopType))
          if (productFilters.length) {
            this.filteredProducts = this.filteredProducts.filter(product => productFilters.includes(product.productType))
          }
          if (discountFilters.length) {
            this.filteredProducts = this.filteredProducts.filter(product => discountFilters.includes(product.discountType))
          }

        } else if (productFilters.length) {
          this.filteredProducts = this.products.filter(product => productFilters.includes(product.productType))
          if (discountFilters.length) {
            this.filteredProducts = this.filteredProducts.filter(product => discountFilters.includes(product.discountType))
          }

        } else if (discountFilters.length) {
          this.filteredProducts = this.products.filter(product => discountFilters.includes(product.discountType))
        }
        this.breakForPages(this.filteredProducts);
      } else {
        this.breakForPages(this.products);
      }
      this.page = 1;
    }
  },
  mounted() {
    this.sortBy(this.sort);
    this.filterBy([]);

    eventBus.$on('filterSelect', (val) => {
      this.selectedFilters = val;
      this.filterBy(this.selectedFilters);
    });
  },
}
</script>

<style lang="scss" scoped>
.products__item {
  position: relative;
  padding: 16px 24px 66px;
  border-top: 1px solid #dcdde0;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  cursor: pointer;

  img {
    -moz-transition: all 0.5s ease-out;
    -o-transition: all 0.5s ease-out;
    -webkit-transition: all 0.5s ease-out;
  }

  @media (max-width: 768px) {
    padding: 16px;

    &:first-child {
      border-top: none;
    }
  }

  &:hover {
    border-left: 1px solid #dcdde0;
    border-right: 1px solid #dcdde0;

    img {
      -webkit-transform: scale(1.1);
      -moz-transform: scale(1.1);
      -o-transform: scale(1.1);
    }
  }

  &:nth-last-child(-n+4) {
    border-bottom: 1px solid transparent;

    &:hover {
      border-bottom: 1px solid #dcdde0;
    }
  }
}

.products__type {
  margin-bottom: 8px;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  color: #000;
  @media (max-width: 768px) {
    color: rgba(0, 0, 0, 0.5);
  }
}

.products__name {
  line-height: 18px;
}

.products__img {
  position: relative;
  overflow: hidden;
  max-height: 200px;
  @media (max-width: 768px) {
    padding: 20px 0 28px;
  }
}

.products__discount {
  position: absolute;
  top: 0;
  left: 0;
  background: #b70050;
  padding: 0 8px;
  line-height: 24px;
  border-radius: 12px 0 12px 0;
  color: white;
}

.products__old {
  position: absolute;
  bottom: 48px;
  right: 0;
  padding: 0 4px;
  font-size: 20px;
  border-radius: 12px;
  background: #fff;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    border-bottom: 1px solid #b70050;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    bottom: 30px;
  }
}

.products__new {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 32px;
  font-weight: 600;
  background: #ffd500;
  padding: 0 16px;
  border-radius: 26px 0 26px 0;
  @media (max-width: 768px) {
    font-size: 20px;
  }
}

.products__footer {
  @media (min-width: 768px) {
    position: absolute;
    left: 24px;
    right: 24px;
    bottom: 16px;
  }
}

.products__date {
  line-height: 15px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, .5);
}

.products__select {
  @media (max-width: 768px) {
    padding: 0 12px;
    background: #f5f7fa;
    border-radius: 12px;
  }

  select {
    @media (max-width: 768px) {
      background: inherit;
      height: 40px;
    }

    &:focus-visible {
      outline: none;
    }
  }
}

.products__hat {
  line-height: 50px;

  @media (max-width: 768px) {
    line-height: 40px;
  }
}

.products__filter-button {
  padding: 0 12px;
  background: #f5f7fa;
  border-radius: 12px;
  cursor: pointer;
}
</style>
