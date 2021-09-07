<template>
  <div class="products col-12">
    <div class="row products__hat">
      <div class="space-between px-0">
        <div>Найдено {{ products.length }} акций</div>
        <div>
          <label>
            <select class="border-0" name="sort" v-model="sort" @change="sortBy(sort)">
              <option value="dateToHigh">Новизна: по возрастанию</option>
              <option value="dateToLow">Новизна: по убыванию</option>
              <option value="priceToHigh">Цена: по возрастанию</option>
              <option value="priceToLow">Цена: по убыванию</option>
              <option value="discountToHigh">Скидка: по возрастанию</option>
              <option value="discountToLow">Скидка: по убыванию</option>
            </select>
          </label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="products__item col-3" :key="product.id" v-for="product in filteredProducts[page-1]">
        <div class="products__type">{{ product.discountName }}</div>
        <div class="products__img mb-4">
          <div class="products__discount">-{{ product.discount }}%</div>
          <img class="mh-100" :src="product.img" alt="#">
          <div class="products__old">{{ product.old }}</div>
          <div class="products__new">{{ product.new }}</div>
        </div>
        <div class="products__name">{{ product.name }}</div>
        <div class="products__footer">
          <div class="products__date">
            <div>{{ product.dateFrom }}</div>
            <div>{{ product.dateTo }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <pagination v-model="page" :per-page="16" :options="{texts: {count: ''}}"
                  :records="[].concat.apply([], this.filteredProducts).length"/>
    </div>
  </div>
</template>

<script>
import {eventBus} from "@/main";

export default {
  name: 'Products',
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
          img: "https://magnit.ru/upload/iblock/928/928643fcbbfc275a22d3484654780a2f.jpg",
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
          img: "https://magnit.ru/upload/iblock/928/928643fcbbfc275a22d3484654780a2f.jpg",
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
          img: "https://magnit.ru/upload/iblock/928/928643fcbbfc275a22d3484654780a2f.jpg",
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
          img: "https://magnit.ru/upload/iblock/928/928643fcbbfc275a22d3484654780a2f.jpg",
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
          img: "https://magnit.ru/upload/iblock/928/928643fcbbfc275a22d3484654780a2f.jpg",
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
          img: "https://magnit.ru/upload/iblock/928/928643fcbbfc275a22d3484654780a2f.jpg",
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
          img: "https://magnit.ru/upload/iblock/928/928643fcbbfc275a22d3484654780a2f.jpg",
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
          img: "https://magnit.ru/upload/iblock/928/928643fcbbfc275a22d3484654780a2f.jpg",
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
    },
    filterBy(filters) {
      let size = 16;
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
        let filtered = [];

        for (let i = 0; i < Math.ceil(this.filteredProducts.length / size); i++) {
          filtered[i] = this.filteredProducts.slice((i * size), (i * size) + size);
        }
        this.filteredProducts = filtered;
      } else {
        let filtered = [];

        for (let i = 0; i < Math.ceil(this.products.length / size); i++) {
          filtered[i] = this.products.slice((i * size), (i * size) + size);
        }
        this.filteredProducts = filtered;
      }
      this.page = 1;
    }
  },
  mounted() {
    this.sortBy(this.sort);
    this.filterBy([]);

    eventBus.$on('filterSelect', (val) => {
      this.filterBy(val);
    });
  },
}
</script>

<style lang="scss" scoped>
.products__hat {
  line-height: 50px;
}

.products__item {
  position: relative;
  padding: 16px 24px 66px;
  border-top: 1px solid #dcdde0;
}

.products__type {
  margin-bottom: 8px;
  height: 40px;
  font-size: 14px;
  font-family: Montserrat-semibold, Arial, sans-serif;
  font-weight: 400;
  color: #000;
}

.products__name {
  line-height: 18px;
}

.products__img {
  position: relative;
  height: 200px;
}

.products__discount {
  position: absolute;
  top: 0;
  left: 0;
  background: #e6000e;
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
  min-height: 20px;
  border-radius: 12px;
  background: #fff;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    border-bottom: 1px solid #e6000e;
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
}

.products__footer {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 16px;
}

.products__date {
  line-height: 15px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, .5);
}
</style>
