<template>
    <div class="rank">
        <div class="rank-center"></div>
        <el-row :gutter="30" align='middle' style='height:100%'>
            <el-col :span="rankRolling && rankRolling.className?12:24"  style='height:100%;display:table-cell;vertical-align:middle;'>
                <div class='rank-top-10 clearfix' v-for='(value,key) in rankingData' :class='"rank-"+key'>
                    <div class='rank-title clearfix'>
                        <div v-show='key=="dev"'>
                            <img src="./img/red_top.png" alt="">
                            <strong>10</strong>                    
                            <span>开发周处理问题</span>
                        </div>
                        <div v-show='key=="test"'>
                            <img src="./img/blue_top.png" alt="">
                            <strong>10</strong>                    
                            <span>测试周处理问题</span>
                        </div>
                        <div v-show='key=="need"'>
                            <img src="./img/green_top.png" alt="">
                            <strong>10</strong>                    
                            <span>需求周处理问题</span>
                        </div>
                        <p>
                            <s></s>
                        </p>
                    </div>
                    <el-row :gutter="70" style='height:100%;' >
                        <el-col :span="12" style='height:100%;'>
                            <ul class="rank_first">
                                <li v-for='(item,index) in value' v-if='index<5'>
                                    <p><em :class='"percentage-"+(10-index)'></em></p>
                                    <i>{{index+1}}</i>
                                    <span>{{item.name}}</span>
                                    <strong>{{item.week_handle}}</strong>
                                </li>
                            </ul>
                        </el-col>
                        <el-col :span="12" style='height:100%;'>
                            <ul>
                                <li v-for='(item,index) in value' v-if='index>=5 && index<10'>
                                    <p><em :class='"percentage-"+(10-index)'></em></p>
                                    <i>{{index+1}}</i>
                                    <span>{{item.name}}</span>
                                    <strong>{{item.week_handle}}</strong>
                                </li>
                            </ul>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="12" v-if="rankRolling && rankRolling.className">
                <div class="detial" :class="'detial-'+rankRolling.className">
                    <div class='rank-title clearfix'>
                        <img src="./img/red_top.png" v-show='rankRolling.className=="dev"'>
                        <img src="./img/blue_top.png" v-show='rankRolling.className=="test"'>
                        <img src="./img/green_top.png" v-show='rankRolling.className=="need"'>
                        <strong>{{rankRolling.num}}</strong>                    
                        <span>{{rankRolling.title}}</span>
                    </div>
                    <el-table
                    :data="rankRolling.data"
                    stripe
                    style="width: 100%;height:100%;">
                        <el-table-column
                        prop="ranking"
                        label="排名"
                        align='center'
                        style='width:8%'>
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="处理人"
                        align='center'
                        style='width:10%'>
                        </el-table-column>
                        <el-table-column
                        prop="department"
                        label="部门"
                        align='center'
                        style='width:14%'>
                        </el-table-column>
                        <el-table-column
                        prop="last_week"
                        label="上周待处理"
                        align='center'
                        style='width:12%'>
                        </el-table-column>
                        <el-table-column
                        prop="week_added"
                        label="周新增"
                        align='center'
                        style='width:10%'>
                        </el-table-column>
                        <el-table-column
                        prop="week_handle"
                        label="周处理"
                        align='center'
                        style='width:10%'>
                            <template slot-scope="scope">
                                <strong class="week_handle">
                                    {{scope.row.week_handle}}
                                </strong>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="week_pending_handle"
                        label="周待处理"
                        align='center'
                        style='width:10%'>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {getrank} from '../service/getdata'
export default {
    data() {
        return {
            count: '',
            timer: null,
            rankingData:{
                dev:[],test:[],need:[]
            },
            rankRolling: {},
            Narr:[]
        }
    },
    methods:{
        async init(){
            let {data} = await getrank();
            this.rankingData = data;
            setInterval(() => {
                window.location.reload()
            }, 1000*60*60*12)
        },
        getListIng() {  
            const TIME_COUNT = this.Narr.length;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.timer = setInterval(() => {
                    this.rankRolling=this.Narr[TIME_COUNT-this.count]
                    this.count--;
                    if(!this.count) this.count = TIME_COUNT;
                }, 8000)
            }
        },
        _isLength(){
          return document.body.clientWidth<=720
        }
    },
    watch:{
        rankingData(curVal,oldVal){　　
            let Narr = [];
            for(var _i in curVal){
                var devLeg = curVal[_i].length;
                var devPer = Math.ceil((devLeg-10)/20);
                for(var i=0;i<devPer;i++){
                    var obj = {};
                    debugger
                    obj.className=_i;
                    switch (_i){
                        case 'dev':
                            obj.title='开发周处理问题';
                        break;
                        case 'test':
                            obj.title='测试周处理问题';
                        break;
                        case 'need':
                            obj.title='需求周处理问题';
                        break;
                    }
                    obj.num=(11+i*20)+'-'+(10+20*(i+1));
                    obj.data=[];
                    curVal[_i].map(function(val,index){
                        if(index-9>0 && Math.floor((index-10)/20)==i){
                            val.ranking=index+1;
                            obj.data.push(val);
                        }
                    })
                    Narr.push(obj);
                }
            }
            this.Narr = Narr;
            this.rankRolling=Narr[0];
            this.getListIng()
        },
    },
    created() {
        this.init();
    }
}
</script>
<style scoped>
    .rank-center{background-color: #ccc;width: 8px;height: 100%;position: absolute;left: 50%;margin-left: -4px;}
    .rank{padding-left:20px; padding-right: 10px;border-top:10px solid #AE1213;position:relative;height: 100%;}
    .rank-title{padding: 20px 0;position: absolute;top: 0;width: 100%;padding-right:70px;}
    .rank-title div{background-color: #fff;float: left;}
    .rank-title img{width: 64px;}
    .rank-title strong{font-size: 28px;padding-right: 10px;font-weight: bolder;margin-top:11px;}
    .rank-title span{font-size: 16px;font-weight: bolder;margin-top:20px;padding-right: 20px;}
    .rank-title p{height:1px;background-color: #AE1213;width: 100%;padding-right: 200px; margin-top: -12px; float: left; z-index: -1; position: relative;}
    .rank-title p s{padding: 3px;background-color:#AE1213;position: absolute;right:-7px;top:-2px;transform:rotate(45deg);}

    ul{height: 100%;}
    li{width:100%;position:relative;font-size: 13px;height: 20%; line-height: 20px;}
    li i{width: 20px;height: 20px;text-align: center;color: #fff;border-radius: 100%;line-height: 23px;display: inline-block;position: absolute;left: 0;top: 0;}
    li span{position: absolute;left:25px;top:3px;}
    li p{height:13px;width: 99%;float: left;padding-left: 80px;padding-right: 30px;margin-top:6px;}
    li p em{display: block;width: 100%;float: left;height: 100%;}
    li strong{font-weight: normal;position: absolute;right:10px;top:4px;}
    .rank-dev .rank-title,.detial-dev .rank-title{color:#AE1213;}
    .rank-dev li i,.rank-dev li p em,.rank-dev .rank-title p,.rank-dev .rank-title p s{background-color: #AE1213;}
    .rank-test .rank-title,.detial-test .rank-title{color:#589AD7;}
    .rank-test li i,.rank-test li p em,.rank-test .rank-title p,.rank-test .rank-title p s{background-color: #589AD7;}
    .rank-need .rank-title,.detial-need .rank-title{color:#13AD95;}
    .rank-need li i,.rank-need li p em,.rank-need .rank-title p,.rank-need .rank-title p s{background-color: #13AD95;}
    .detial{height: 100%;padding-top:75px;width: 100%;position: relative;}
    .rank-top-10{padding-left:35px;height: 32%;padding-top: 75px;position:relative;width: 100%;}
    .rank_first li{position: relative;}
    .rank_first li:before{position: absolute;width: 20px;height: 20px;left:-30px;content: '';display: block;z-index: 2;}
    .rank_first li:nth-child(1):before{background:url(./img/first.png) no-repeat;-webkit-background-size: 100% 100%;background-size: 100% 100%;}
    .rank_first li:nth-child(2):before{background:url(./img/second.png) no-repeat;-webkit-background-size: 100% 100%;background-size: 100% 100%;}
    .rank_first li:nth-child(3):before{background:url(./img/third.png) no-repeat;-webkit-background-size: 100% 100%;background-size: 100% 100%;}

    .week_handle{font-weight: bolder;}
    .detial-dev .week_handle{color: #AE1213;}
    .detial-test .week_handle{color: #589AD7;}
    .detial-need .week_handle{color: #13AD95;}

    .percentage-10{width:95%;opacity: 1;}
    .percentage-9{width: 87%;opacity: .9;}
    .percentage-8{width: 80%;opacity: .85;}
    .percentage-7{width: 73%;opacity: .8;}
    .percentage-6{width: 66%;opacity: .7;}
    .percentage-5{width: 59%;opacity: .6;}
    .percentage-4{width: 52%;opacity: .5;}
    .percentage-3{width: 45%;opacity: .4;}
    .percentage-2{width: 37%;opacity: .3;}
    .percentage-1{width: 30%;opacity: .24;}
</style>
<style>
    .el-table td,.el-table th{padding: 2px 0;}
    .el-table th{color: #fff;font-weight: bolder;border-right:1px #fff solid;}
    .detial-dev .el-table th{background-color: #AE1213;}
    .detial-test .el-table th{background-color: #589AD7;}
    .detial-need .el-table th{background-color: #13AD95;}
    colgroup col:nth-child(1){width: 10%;}
    colgroup col:nth-child(2){width: 14%;}
    colgroup col:nth-child(3){width: 26%;}
    colgroup col:nth-child(4){width: 18%;}
</style>