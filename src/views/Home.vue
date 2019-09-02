<template>
  <div>
    <el-row class="container">
      <el-col :span="24" class="header">HEADER</el-col>
    </el-row>
    <el-row class="container">
      <el-col :span="24" class="main">
        <div class="adt-holder">
          <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
            <li v-for="(adt) of rendered" :key="adt.name" class="infinite-list-item adt">{{ adt.name }}</li>
          </ul>
        </div>
        <!-- <el-table
          :data="adventurers"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="name"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="rarity"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="element"
            label="省份">
          </el-table-column>
          <el-table-column
            prop="weapon"
            label="市区">
          </el-table-column>
          <el-table-column
            prop="dragon"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="condition"
            label="邮编">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table> -->
      </el-col>
    </el-row>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Http } from '@/service/http';
import { Adventurer } from '../model/adventurer';

@Component({
  components: {},
})
export default class Home extends Vue {
  private index: number = 0;
  private adverturerReady: boolean = false;
  private adventurers: Adventurer[] = [];
  private rendered: Adventurer[] = [];
  private tableData = [{
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333,
    }, {
      date: '2016-05-04',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1517 弄',
      zip: 200333,
    }, {
      date: '2016-05-01',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1519 弄',
      zip: 200333,
    }, {
      date: '2016-05-03',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1516 弄',
      zip: 200333,
    }];

    constructor() {
      super();
      // @ts-ignore
      window.$home = this;
    }

    public async load() {
      if (!this.adverturerReady) {
        const csv = await Http.Get('/180/data__.csv', 'text');
        this.adventurers = Adventurer.ParseCSV(csv);
        this.adverturerReady = true;
      }
      let count = 10;
      while (this.index < this.adventurers.length && count > 0) {
        this.rendered.push(this.adventurers[this.index]);
        this.index++;
        count--;
      }
    }

    public async test() {
      const csv = await Http.Get('/180/data__.csv', 'text');
      const adventurers = Adventurer.ParseCSV(csv);
      this.adventurers = adventurers;
      return adventurers;
    }
}
</script>

<style scoped lang="css">
  .header {
    margin: 0px;
    height: 60px;
    line-height: 60px;
    background: #fefefe;
    color:#333;
    box-shadow: 0 2px 4px rgba(0,0,0,.1);
  }
  .adt-holder {
    width: 600px;
    margin: auto;
  }
  .adt-holder ul {
    height: 600px;
    overflow: auto;
    list-style: none;
  }
  .adt-holder ul li.adt {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: #e8f3fe;
    margin: 10px;
    color: #333;
  }
</style>
