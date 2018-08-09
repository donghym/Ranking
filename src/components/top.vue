<template>
    <div class="m-rank">
        <swiper :options="swiperOption">
            <swiper-slide v-for='(value,key) in rankingData' :key='key'>
                <div :class="'rank-title clearfix '+'rank-title-'+key">
                    <div v-show='key=="dev"' class="clearfix">
                        <img src="./img/red_top.png" alt="">
                        <strong>{{rankingData[key].length}}</strong>                    
                        <span>开发周处理问题</span>
                    </div>
                    <div v-show='key=="test"' class="clearfix">
                        <img src="./img/blue_top.png" alt="">
                        <strong>{{rankingData[key].length}}</strong>                    
                        <span>测试/需求周处理问题</span>
                    </div>
                    <p>
                        <s></s>
                    </p>
                </div>
                <div class="detial" :class="'detial-'+key">
                    <el-row class='ranking-title'>
                        <el-col :span='2'><span>排名</span></el-col>
                        <el-col :span='3'><span>处理人</span></el-col>
                        <el-col :span='7'><span>部门</span></el-col>
                        <el-col :span='3'><span>上周待<br/>处理</span></el-col>
                        <el-col :span='3'><span>周新增</span></el-col>
                        <el-col :span='3'><span>周处理</span></el-col>
                        <el-col :span='3'><span>周待<br/>处理</span></el-col>
                    </el-row>
                    <div class="ranking-list-con">
                        <el-row class='ranking-list' v-for='(val,index) in value' :key='index'>
                            <el-col :span='2' class='text-center'><span>{{index+1}}</span></el-col>
                            <el-col :span='3'><span>{{val.name}}</span></el-col>
                            <el-col :span='7'><span>{{val.department}}</span></el-col>
                            <el-col :span='3' class='text-center'><span>{{val.last_week}}</span></el-col>
                            <el-col :span='3' class='text-center'><span>{{val.week_added}}</span></el-col>
                            <el-col :span='3' class='text-center'><strong class="week_handle">{{val.week_handle}}</strong></el-col>
                            <el-col :span='3' class='text-center'><span>{{val.week_pending_handle}}</span></el-col>
                        </el-row>
                    </div>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination" v-show='isWeixin'></div>
        </swiper>
    </div>
</template>
<script>
import {getTopData} from '../service/getdata'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
    data() {
        return {
            isWeixin:false,
            rankingData:{ dev:[],test:[]},
            swiperOption: {
                spaceBetween:10,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            }
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    methods:{
        async init(){
            let {data} = await getTopData();
            this.rankingData=data;
            setInterval(() => {
                window.location.reload()
            }, 1000*60*60*12)
        }
    },
    created() {
        let ua = navigator.userAgent.toLowerCase();
        let isWeixin = ua.indexOf('micromessenger') != -1;
        this.isWeixin = isWeixin
        this.init();
    }
}
</script>
<style scoped>
    .m-rank{position:relative;height: 100%;width: 100%;overflow-x: hidden;box-sizing: border-box;} 
    .rank-title{padding: 23px 5px;position: absolute; top: 0; left: 0; width: 100%;}
    .rank-title div{float: left;}
    .rank-title div img{width: 64px;}
    .rank-title div strong{font-size: 28px;padding-right: 10px;font-weight: bolder;margin-top:11px;}
    .rank-title div span{font-size: 16px;font-weight: bolder;margin-top:20px;padding-right: 20px;}
    .rank-title p{height:1px;width: 50px;margin-top: -12px; float: right;position: relative;margin-right: 20px;margin-top: 30px;}
    .rank-title p s{padding: 3px;position: absolute;right:-7px;top:-2px;transform:rotate(45deg);}

    .rank-title-dev {border-top: solid 10px #AE1213;}
    .rank-title-dev p,
    .rank-title-dev p s{background-color: #AE1213;}
    .rank-title-dev strong,
    .rank-title-dev span{color:#AE1213}

    .rank-title-test {border-top: solid 10px #589AD7;}
    .rank-title-test p,
    .rank-title-test p s{background-color: #589AD7;}
    .rank-title-test strong,
    .rank-title-test span{color:#589AD7}

    .detial{height: 100%;width: 100%;position: relative;}
    .detial-dev .ranking-title{background-color: #AE1213;}
    .detial-test .ranking-title{background-color: #589AD7;}
    .ranking-title{font-size: 13px;text-align: center;height: 46px;vertical-align: middle;font-weight:bolder;position:absolute;top:-46px;width:100%;}
    .ranking-title>div{height: 100%;color: #fff;display: table;}
    .ranking-title>div>span{display: table-cell;vertical-align: middle;line-height: 15px;}
    .ranking-title>div:not(:last-child){border-right:1px #fff solid;}
    .week_handle{font-weight: bolder;}
    .ranking-list-con{height: 100%;overflow-x: hidden;}
    .ranking-list{height: 46px;font-size: 14px;font-weight: 500;}
    .ranking-list>div{display: table;height: 46px;}
    .ranking-list>div>span{line-height: 16px;}
    .ranking-list>div>span,
    .ranking-list>div>strong{display: table-cell;vertical-align: middle;padding-top: 6px;}
    .detial-dev .ranking-list:nth-child(even){background-color: #AE1213;opacity: .5;color: #fff;}
    .detial-dev .ranking-list:nth-child(even) .week_handle{color: #fff;}
    .detial-test .ranking-list:nth-child(even){background-color: #589AD7;opacity: .5;color: #fff;}
    .detial-test .ranking-list:nth-child(even) .week_handle{color: #fff;}
    .detial-dev .week_handle{color: #AE1213;}
    .detial-test .week_handle{color: #589AD7;}
    .swiper-container{height: 100%;}
    .swiper-wrapper{position: relative;}
    .swiper-slide{box-sizing: border-box;padding:144px 5px 10px;}
</style>
<style>
</style>