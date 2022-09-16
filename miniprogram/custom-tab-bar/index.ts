import TabMenu from './data';

import { getWmmeberNav,getWmColorTheme } from "../api/server";
// getWmmeberNav

Component({
  data: {
     list:TabMenu,
     bottomNavList:[],
     active :0,
     actionColor:""
  },
  lifetimes:{
    created(){
      getWmColorTheme("").then((res: any) => {
        this.setData({
          actionColor:res.data.mainColor
        })
      });
      getWmmeberNav('').then((res:any)=>{
           console.log('getWmmeberNav',res.data.bottomNavList)
           this.setData({
            bottomNavList:res.data.bottomNavList||[]
          })
      })
      // console.log(JSON.stringify(this.data.list))
    }
  },
  methods: {

    onChange(items:any){
     console.log(items)
     this.setData({
      active:items.detail
    })
    },
    onclick(items:any) {
      
      const {icon,url}=items.target.dataset.item
      console.log(icon)
      console.log(url)
      if(icon==='home'||icon==='logs'){
        wx.switchTab({
          url
        });
      }
      // this.setData({ active: event.detail.value });
      // wx.switchTab({
      //   url: this.data.list[event.detail.value].url.startsWith('/')
      //     ? this.data.list[event.detail.value].url
      //     : `/${this.data.list[event.detail.value].url}`,
      // });
    },

    // init() {
    //   const page = getCurrentPages().pop();
    //   const route = page ? page.route.split('?')[0] : '';
    //   const active = this.data.list.findIndex(
    //     (item) =>
    //       (item.url.startsWith('/') ? item.url.substr(1) : item.url) ===
    //       `${route}`,
    //   );
    //   this.setData({ active });
    // },
  },
});
