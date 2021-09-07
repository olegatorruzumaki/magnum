<template>
  <div class="products col-12">
    <div>
      <div class="space-between">
        <div>Найдено {{ products.length }} акций</div>
        <div>
          <label>
            <select name="sort" v-model="sort" @change="sortBy(sort)">
              <option value="1">Цена: по возрастанию</option>
              <option value="2">Цена: по убыванию</option>
              <option value="3">Скидка: по возрастанию</option>
              <option value="4">Скидка: по убыванию</option>
            </select>
          </label>
        </div>
      </div>
      <hr class="hr">
    </div>
    <div class="row">
      <div class="products__item col-3" :key="product.id" v-for="product in products">
        <div class="products__type">{{ product.type }}</div>
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
  </div>
</template>

<script>
export default {
  name: 'Products',
  props: {},
  data() {
    return {
      sort: "1",
      products: [
        {
          id: 0,
          type: "Скидки на каждой полке",
          name: "Корм для кошек FELIX, желе с форелью, 85 г",
          dateFrom: "с 01 сентября",
          dateTo: "до 07 сентября",
          old: 250,
          new: 140,
          discount: 42,
          img: "https://magnit.ru/upload/iblock/928/928643fcbbfc275a22d3484654780a2f.jpg",
        },
        {
          id: 1,
          type: "Скидки на каждой полке",
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
          type: "Скидки на каждой полке",
          name: "Напиток",
          dateFrom: "с 26 сентября",
          dateTo: "до 02 ноября",
          old: 600,
          new: 50,
          discount: 20,
          img: "https://magnit.ru/upload/iblock/3d5/3d53f490e7a4a342812289cc9cf96410.jpg",
        }
      ]
    }
  },
  mounted() {
    this.sortBy(this.sort);
  },
  methods: {
    sortBy(type) {
      switch (type) {
        case "1":
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
        case "2":
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
        case "3":
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
        case "4":
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
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.products__item {
  position: relative;
  padding: 16px 24px 66px;
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
