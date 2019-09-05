<template>
  <div class="main">
    <el-scrollbar class="main-scrollbar" :native="false">
      <el-table class="table-dps" :data="filterd" :border="false" style="width: 100%" v-loading="loading">
        <el-table-column class-name="row-name"  prop="name" label="Adventurer" width="180">
          <template slot-scope="scope">
            <el-tooltip placement="top" transition="none">
              <div slot="content">{{scope.row.name}}</div>
              <img class="d-f avater" :src='"https://b1ueb1ues.github.io/dl-sim/pic/character/" + scope.row.name + ".png"'>
            </el-tooltip>
            <el-tooltip placement="top" transition="none">
              <div slot="content">{{scope.row.dragon}}</div>
              <img class="d-f wyrmprint" :src='"https://b1ueb1ues.github.io/dl-sim/pic/dragon/" + scope.row.dragon + ".png"'>
            </el-tooltip>
            <el-tooltip placement="top" transition="none">
              <div slot="content">{{scope.row.wyrmprint0}}</div>
              <img class="d-f wyrmprint" :src='"https://b1ueb1ues.github.io/dl-sim/pic/amulet/" + scope.row.wyrmprint0 + ".png"'>
            </el-tooltip>
            <el-tooltip placement="top" transition="none">
              <div slot="content">{{scope.row.wyrmprint1}}</div>
              <img class="d-f wyrmprint" :src='"https://b1ueb1ues.github.io/dl-sim/pic/amulet/" + scope.row.wyrmprint1 + ".png"'>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="rarity" label="DPS Distribution">
          <template slot-scope="scope">
              <div>
                <div class="factors mb-5">
                  <el-tooltip placement="top" transition="none" v-for="f of scope.row.dps1.factors" :key="f.factor" class="factor" :class="f.factor" :style="{width: f.width + '%'}">
                    <div slot="content"><span class="f-title">{{f.factor}}: </span>{{f.dps}}</div>
                    <div></div> 
                  </el-tooltip>
                  <div class="full"><b>{{scope.row.dps1.full}}</b></div>
                </div>
                <div class="factors">
                  <el-tooltip placement="top" transition="none" v-for="f of scope.row.dps2.factors" :key="f.factor" class="factor" :class="f.factor" :style="{width: f.width + '%'}">
                    <div slot="content"><span class="f-title">{{f.factor}}: </span>{{f.dps}}</div>
                    <div class="op-3"></div> 
                  </el-tooltip>
                  <div class="full">{{scope.row.dps2.full}}</div>
                </div>
              </div>
          </template>
        </el-table-column>
        <el-table-column class-name="row-condition" prop="condition" label="Condition" width="200">
        </el-table-column>
        <el-table-column class-name="row-description"  prop="comment" label="Description" width="200">
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <div class="aside">
      <el-row class="container">
        <el-col :span="24" class="header">
          <div class="the-brand"><a href="https://github.com/b1ueb1ues/b1ueb1ues.github.io" target="_blank">DPS Sim @b1ueb1ues.github.io</a></div>
          <ul class="head-bar">
            <li>
              <el-radio-group v-model="category" size="mini" @change="reload()">
                <el-radio-button label="sp" value="sp">Special</el-radio-button>
                <el-radio-button label="60">60s</el-radio-button>
                <el-radio-button label="120">120s</el-radio-button>
                <el-radio-button label="180">180s</el-radio-button>
              </el-radio-group>
            </li>
            <li class="label">
              <span>Rarity:</span>
            </li>
            <li>
              <el-select v-model="rarity" size="mini" style="width: 100px;" @change="reload()">
                <el-option value="all" label="All"></el-option>
                <el-option value="5" label="5 Stars"></el-option>
                <el-option value="4" label="4 Stars"></el-option>
                <el-option value="3" label="3 Stars"></el-option>
              </el-select>
            </li>
            <li class="label">
              <span>Element:</span>
            </li>
            <li>
              <el-select v-model="element" size="mini" style="width: 100px;" @change="reload()">
                <el-option value="all" label="All"></el-option>
                <el-option value="flame" label="Flame"></el-option>
                <el-option value="water" label="Water"></el-option>
                <el-option value="wind" label="Wind"></el-option>
                <el-option value="light" label="Light"></el-option>
                <el-option value="shadow" label="Shadow"></el-option>
              </el-select>
            </li>
            <li class="label">
              <span>Class:</span>
            </li>
            <li>
              <el-select v-model="weapon" size="mini" style="width: 100px;" @change="reload()">
                <el-option value="all" label="All"></el-option>
                <el-option value="sword" label="Sword"></el-option>
                <el-option value="blade" label="Blade"></el-option>
                <el-option value="dagger" label="Dagger"></el-option>
                <el-option value="axe" label="axe"></el-option>
                <el-option value="lance" label="Lance"></el-option>
                <el-option value="bow" label="Bow"></el-option>
                <el-option value="wand" label="Wand"></el-option>
              </el-select>
            </li>
            <li>
              <dir class="sep"></dir>
            </li>
            <li>
              <span>Co-abilities:</span>
            </li>
            <li>
              <el-checkbox-group v-model="exs" size="mini" @change="reload()">
                <el-checkbox label="k">
                  <img class="icon-weapon" src="https://b1ueb1ues.github.io/dl-sim/pic/weapon/blade.png" alt="K"/>
                </el-checkbox>
                <el-checkbox label="r">
                  <img class="icon-weapon" src="https://b1ueb1ues.github.io/dl-sim/pic/weapon/wand.png" alt="K"/>
                </el-checkbox>
                <el-checkbox label="d">
                  <img class="icon-weapon" src="https://b1ueb1ues.github.io/dl-sim/pic/weapon/dagger.png" alt="K"/>
                </el-checkbox>
                <el-checkbox label="b">
                  <img class="icon-weapon" src="https://b1ueb1ues.github.io/dl-sim/pic/weapon/bow.png" alt="K"/>
                </el-checkbox>
              </el-checkbox-group>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Http } from '@/service/http';
import { Adventurer } from '../model/adventurer';
import { Dps } from '../model/dps';
import { ElPopover } from 'element-ui/types/popover';

@Component({
  components: {},
})
export default class DpsComponent extends Vue {

  public category: 'sp' | '60' | '120' | '180' = '180';
  public rarity: string = 'all';
  public element: string = 'all';
  public weapon: string = 'all';
  public exs: string[] = [];

  // public thatAdventurer: Adventurer = new Adventurer();
  // public thatDps: Dps = new Dps();

  private cachedCsvUrl: string = '';
  private adventurers: Adventurer[] = [];
  private filterd: Adventurer[] = [];
  private loading: boolean = true;
  private rendered: Adventurer[] = [];

  public get csvUrl(): string {
    return `/${this.category.toLowerCase()}/data_${this.exs.length === 0 ? '_' : this.exs.join('')}.csv`;
  }

  public async reload() {
    this.loading = true;

    if (this.csvUrl !== this.cachedCsvUrl) {
      const csv = await this.loadCsv();
      if (!csv) {
        this.loading = false;
        return ;
      }
      this.adventurers = Adventurer.ParseCSV(csv);
      this.cachedCsvUrl = this.adventurers.length > 0 ? this.csvUrl : '';
      if (this.adventurers.length > 0) {
        const maxx = this.adventurers[0].dps1.full;
        this.adventurers.forEach((a) => {
          a.condition = a.condition.replace(/[<>]/g, '');
          a.dps1.factors.forEach((f) => f.width = 100 * f.dps / maxx);
          a.dps2.factors.forEach((f) => f.width = 100 * f.dps / maxx);
        });
      }
    }
    this.filterd = this.adventurers.filter((a) => this.matched(a));
    this.loading = false;
  }

  public mounted() {
    // @ts-ignore
    window.$dps = this;
    this.reload();
  }

  private async loadCsv(): Promise<string> {
    try {
      const csv: string = await Http.Get(this.csvUrl, 'text');
      return csv;
    } catch (e) {
      return '';
    }
  }

  private matched(adventurer: Adventurer): boolean {
    if (this.rarity !== 'all' && adventurer.rarity !== this.rarity) {
      return false;
    }
    if (this.element !== 'all' && adventurer.element !== this.element) {
      return false;
    }
    if (this.weapon !== 'all' && adventurer.weapon !== this.weapon) {
      return false;
    }
    return true;
  }
}
</script>

<style>
  #app {
    overflow-y: hidden;
  }
  .d-f {
    display: inline-block!important;
  }
  .mb-5 {
    margin-bottom: 5px!important;
  }
  .mt-5 {
    margin-top: 5px!important;
  }
  .op-3 {
    opacity: 0.3!important;
  }
  .op-9 {
    opacity: 0.9!important;
  }
  .main {
    padding: 0px!important;
    margin-top: 0;
    height: 100%;
    min-height: auto;
    box-sizing: border-box;
  }
  .main-scrollbar {
    /* height: calc(100% - 80px); */
    height: 100vh;
    margin-right: 250px;
  }
  .main-scrollbar >.el-scrollbar__wrap {
    overflow-x: auto;
  }
  .aside {
    width: 240px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .table-dps {
    margin-bottom: 10px;
  }
  .main .el-table td {
    border-bottom: 0px!important;
    padding: 2px 0px;
  }
  .main .el-table .cell {
    font-size: 12px;
  }
  .main .el-table td.row-name .cell {
    line-height: 0px;
  }
  .main .el-table td.row-condition .cell {
    margin-top: -15px;
  } 
  .main .el-table td.row-description .cell {
    margin-top: -15px;
  } 
</style>

<style scoped lang="css">

  /* .header {
    font-size: 11px;
    margin: 0px;
    height: 60px;
    line-height: 60px;
    background: #fefefe;
    color:#333;
    box-shadow: 0 2px 4px rgba(0,0,0,.1);
  } */
  ul.head-bar {
    float: right;
    height: 100%;
    line-height: 60px;
    background: transparent;
    padding: 0;
    margin: 0;
    margin-right: 100px;
  }

  ul.head-bar li {
    margin: 0;
    float: left;
    list-style: none;
    position: relative;
    cursor: pointer;
    padding-left: 5px;
  }

  ul.head-bar li.label {
    margin-left: 10px;
  }

  ul.head-bar li .sep {
    width: 1px;
    height: 36px;
    background: #ccc;
    padding: 0px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .icon-weapon {
    width: 16px;
    height: 16px;
    line-height: 16px;
    margin-bottom: -3px;
  }

  img.avater {
    width: 60px;
    height: 60px;
  }

  img.wyrmprint {
    width: 30px;
    height: 30px;
    margin-bottom: 27px;
  }

  div.adt-body {
    margin-left: 6px;
    text-align: left;
  }

  div.comment {
    font-size: 11px;
    margin-bottom: 2px;
  }

  .factors {
    height: 12px;
    margin-right: 60px;
    position: relative;
    box-sizing: border-box;
    background-color: #f0f0f0; 
  }

  .factors .factor {
    background-color: #228fbd;
    float: left;
    box-sizing: border-box;
    height: 12px;
    border-left: 1px solid #f0f0f0;
  }
  
  .factors .factor:hover {
    cursor: pointer;
  }

  div.full {
    margin-right: -40px;
    float: right;
    height: 12px;
    font-size: 12px;
    line-height: 12px;
  }
  .factor.attack {
    background-color: #228be6;
  }
  .factor.force_strike {
    background-color: #40c057;
  }
  .factor.skill_1 {
    background-color: #fab005;
  }
  .factor.skill_2 {
    background-color: #f76707;
  }
  .factor.skill_3 {
    background-color: #e64980;
  }
  .factor.team_buff {
    background-color: #15aabf;
  }

  .factors-detail p {
    color: #333;
    padding: 1px;
    margin: 0px;
    font-size: 12px;
  }

  span.f-title {
    color: #cccccc;
  }

</style>
