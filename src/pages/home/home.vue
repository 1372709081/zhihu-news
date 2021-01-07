<template>
  <div class="box">
    <div class="header" @scroll="console.log(1)">
      <header class="clearfix">
        <div class="fl date">
          <h3>{{ date.date }}</h3>
          <p>{{ Month[date.month] }}</p>
        </div>
        <h1 class="fl">知乎日报</h1>
      </header>
    </div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img class="banner" :src="item.image" alt="" />
        <div class="title">
          <h3 class="headerTit">{{ item.title }}</h3>
          <p class="headerHint">{{ item.hint }}</p>
        </div>
      </van-swipe-item>
    </van-swipe>
    <ul class="ulList">
      <li v-for="item in list" :key="item.id">
        <!-- <div class="timeline"><p>2021年01月04</p></div> -->
        <div class="clearfix list" v-for="i in item" :key="i.id">
          <div class="fl listTit">
            <h3>{{ i.title }}</h3>
            <p>{{ i.hint }}</p>
          </div>
          <img class="fr listImg" :src="i.images[0]" alt="" />
        </div>
      </li>
    </ul>
    <!-- <button @click="a">1111111111111</button> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      date: {},
      clientHeight: 0,
      time: 0,
      n: 1,
      Month: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
    };
  },
  computed: {
    ...mapGetters({
      list: "home/list",
      banner: "home/banner",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "home/reqList",
      reqOld: "home/reqOld",
    }),
    addDate() {
      let nowDate = new Date();
      this.date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth(),
        date: nowDate.getDate(),
      };
      this.time =
        this.date.year + "-" + this.date.month + 1 + "-" + this.date.date;
    },
    a() {
      this.time = new Date(this.time).getTime();
      var startTime =
        new Date(this.time).getTime() - 24 * 60 * 60 * 1000 * this.n++;
      var startYear = new Date(startTime).getFullYear();
      var startMonth = new Date(startTime).getMonth() + 1;
      var startDay = new Date(startTime).getDate();
      startMonth = startMonth < 9 ? "0" + startMonth : startMonth;
      startDay = startDay <= 9 ? "0" + startDay : startDay;
      let oldTime = startYear + "" + startMonth + startDay;
      this.reqOld(oldTime);
    },
  },
  mounted() {
    this.reqList();
    this.addDate();
    window.onscroll = () => {
      //获取ulList
      let ulH = document.getElementsByClassName("ulList")[0];
      //获取l整屏的高度
      let winH = document.documentElement.clientHeight;
      //获取卷去的高度
      let scrollH = document.documentElement.scrollTop;
      if (ulH.clientHeight + ulH.offsetTop === scrollH + winH) {
        this.a();
      }
    };
  },
};
</script>

<style scoped>
.header {
  height: 1.13rem;
  position: relative;
}
header {
  width: 100vw;
  padding: 0.2rem 0;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 1;
}
.date {
  width: 15%;
  margin-left: 0.1rem;
  text-align: center;
  border-right: 0.01rem solid #ccc;
}
.date h3 {
  font-size: 0.4rem;
  line-height: 0.5rem;
}
header h1 {
  line-height: 0.73rem;
  font-weight: bold;
  margin-left: 0.2rem;
}
ul {
  padding: 0 0.4rem;
  padding-top: 0.5rem;
}
.list {
  /* margin: 0.5rem 0; */
  padding-bottom: 0.5rem;
}
.banner {
  width: 100vw;
  height: auto;
}
.van-swipe__track {
  position: relative;
}
.title {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0.35rem;
}
.headerTit {
  color: #fff;
  font-size: 0.4rem;
  line-height: 0.5rem;
  font-weight: bold;
}
.headerHint {
  color: #ddd;
  line-height: 0.4rem;
  margin-top: 0.1rem;
}
.listTit {
  margin-top: 0.1rem;
  width: 70%;
}
.listTit h3 {
  font-size: 0.28rem;
  font-weight: bold;
  line-height: 0.4rem;
}
.listTit p {
  color: #999;
  line-height: 0.5rem;
}
.listImg {
  width: 1.5rem;
}
</style>