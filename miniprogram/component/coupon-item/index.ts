import type { CouponItemProperties } from './index.type';

Component({
  properties: <CouponItemProperties>{
    item: {
      type: Object,
      value: {},
    },
  },
  options: {},
  methods: {
    getStockText() {
      console.log(this.data.item);
      return (this.data.item as CouponItemProperties['item']['value']).stock;
    },
  },
});
