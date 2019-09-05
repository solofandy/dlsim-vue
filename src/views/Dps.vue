<template>
  <div class="main">
    <el-scrollbar class="main-scrollbar" :native="false">
      <el-table class="table-dps" empty-text="empty" :data="filterd" :border="false" style="width: 100%" v-loading="loading">
        <el-table-column class-name="row-name"  prop="name" label="Adventurer" width="172">
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
        <el-table-column prop="rarity" label="DPS Distribution" min-width="400">
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
    <div class="aside the-filter">
      <div class="the-brand"><a href="https://github.com/b1ueb1ues/b1ueb1ues.github.io" target="_blank">DPS Sim @b1ueb1ues.github.io</a></div>
      <div class="splitter"></div>
      <div class="title">Mode</div>
      <div class="filter">
         <el-radio-group class="rg-filter" v-model="category" size="mini" @change="reload()">
            <el-radio-button label="180">180s</el-radio-button>
            <el-radio-button label="120">120s</el-radio-button>
            <el-radio-button label="60">60s</el-radio-button>
            <el-radio-button label="sp" value="sp">Special</el-radio-button>
          </el-radio-group>
      </div>
      <div class="splitter"></div>
      <div class="title">Co-abilities</div>
      <div class="filter">
        <el-checkbox-group class="cb-filter" v-model="exs" size="small" @change="reload()">
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
      </div>
      <div class="splitter"></div>
      <div class="title">Rarity</div>
      <div class="filter">
        <el-checkbox-group class="cb-filter" v-model="rarities" size="mini" @change="reload()">
          <el-checkbox label="5">
            <img class="icon-rarity" src="https://b1ueb1ues.github.io/dl-sim/pic/rarity/5.png" alt="K"/>
          </el-checkbox>
          <el-checkbox label="4">
            <img class="icon-rarity" src="https://b1ueb1ues.github.io/dl-sim/pic/rarity/4.png" alt="K"/>
          </el-checkbox>
          <el-checkbox label="3">
            <img class="icon-rarity" src="https://b1ueb1ues.github.io/dl-sim/pic/rarity/3.png" alt="K"/>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="title">Element</div>
      <div class="filter">
        <el-checkbox-group class="cb-filter" v-model="elements" size="mini" @change="reload()">
          <el-checkbox label="flame">
            <img class="icon-element" src="https://b1ueb1ues.github.io/dl-sim/pic/element/flame.png" alt="K"/>
          </el-checkbox>
          <el-checkbox label="water">
            <img class="icon-element" src="https://b1ueb1ues.github.io/dl-sim/pic/element/water.png" alt="K"/>
          </el-checkbox>
          <el-checkbox label="wind">
            <img class="icon-element" src="https://b1ueb1ues.github.io/dl-sim/pic/element/wind.png" alt="K"/>
          </el-checkbox>
          <el-checkbox label="light">
            <img class="icon-element" src="https://b1ueb1ues.github.io/dl-sim/pic/element/light.png" alt="K"/>
          </el-checkbox>
          <el-checkbox label="shadow">
            <img class="icon-element" src="https://b1ueb1ues.github.io/dl-sim/pic/element/shadow.png" alt="K"/>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="title">Class</div>
      <div class="filter">
        <el-checkbox-group class="cb-filter" v-model="weapons" size="mini" @change="reload()">
          <el-checkbox label="sword">
            <img class="icon-weapon" src="https://b1ueb1ues.github.io/dl-sim/pic/weapon/sword.png"/>
          </el-checkbox>
          <el-checkbox label="blade">
            <img class="icon-weapon" src="https://b1ueb1ues.github.io/dl-sim/pic/weapon/blade.png"/>
          </el-checkbox>
          <el-checkbox label="dagger">
            <img class="icon-weapon" src="https://b1ueb1ues.github.io/dl-sim/pic/weapon/dagger.png"/>
          </el-checkbox>
          <el-checkbox label="lance">
            <img class="icon-weapon" src="https://b1ueb1ues.github.io/dl-sim/pic/weapon/lance.png"/>
          </el-checkbox>
          <el-checkbox label="axe">
            <img class="icon-weapon" src="https://b1ueb1ues.github.io/dl-sim/pic/weapon/axe.png"/>
          </el-checkbox>
          <el-checkbox label="bow">
            <img class="icon-weapon" src="https://b1ueb1ues.github.io/dl-sim/pic/weapon/bow.png"/>
          </el-checkbox>
          <el-checkbox label="wand">
            <img class="icon-weapon" src="https://b1ueb1ues.github.io/dl-sim/pic/weapon/wand.png"/>
          </el-checkbox>
        </el-checkbox-group>
      </div>
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

  public get csvUrl(): string {
    return `/${this.category.toLowerCase()}/data_${this.exs.length === 0 ? '_' : this.exs.join('')}.csv`;
  }

  // public rarity: string = 'all';
  // public element: string = 'all';
  // public weapon: string = 'all';

  public category: 'sp' | '60' | '120' | '180' = '180';
  public exs: string[] = [];
  public rarities: string[] = ['5', '4', '3'];
  public elements: string[] = ['flame', 'water', 'wind', 'light', 'shadow'];
  public weapons: string[] = ['sword', 'blade', 'dagger', 'axe', 'lance', 'bow', 'wand'];

  // public thatAdventurer: Adventurer = new Adventurer();
  // public thatDps: Dps = new Dps();

  private cachedCsvUrl: string = '';
  private adventurers: Adventurer[] = [];
  private filterd: Adventurer[] = [];
  private loading: boolean = true;
  private rendered: Adventurer[] = [];

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
    await this.sleeep(600);
    this.loading = false;
  }

  public mounted() {
    // @ts-ignore
    window.$dps = this;
    this.reload();
  }

  private sleeep(ms: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
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
    if (!this.rarities.includes(adventurer.rarity)) {
      return false;
    }
    if (!this.elements.includes(adventurer.element)) {
      return false;
    }
    if (!this.weapons.includes(adventurer.weapon)) {
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
    margin-right: 330px;
  }
  
  .main-scrollbar .el-scrollbar__thumb {
        background-color: rgba(144,147,153,.6);
  }
  .main-scrollbar .el-scrollbar__thumb:hover {
        background-color: rgba(144,147,153,.8);
  }
  
  .main-scrollbar >.el-scrollbar__wrap {
    overflow-x: auto;
  }
  .table-dps {
    margin-bottom: 10px;
  }
  .main .el-table td {
    border-bottom: 0px!important;
    padding: 4px 0px;
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
  
  .aside {
    width: 320px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    /* background: #f0f0f0; */
    border-left: 1px solid #eee;
  }
  
  .aside .the-brand {
    font-size: 16px;
    margin: 6px 0px;
  }
  
  .aside .the-brand a {
    text-decoration: none;
  }
  
  .cb-filter {
    line-height: 25px;
  }
  
  .rg-filter .el-radio-button--mini .el-radio-button__inner {
    font-size: 13px;
  }
  
  .cb-filter .el-checkbox {
    margin-right: 20px!important;
  }
  
  .cb-filter .el-checkbox:last-child {
    margin-right: 0px!important;
  }
  .cb-filter .el-checkbox__input {
    line-height: 16px!important;
  }
  .cb-filter .el-checkbox__label {
    padding-left: 5px!important;
  }
  
  .the-filter {
    padding-left: 10px;
    font-size: 14px!important;
  }
  .the-filter .splitter {
    height: 1px;
    background: #eee;
    padding: 0px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: -10px!important;
  }
  
  .the-filter .title {
    font-weight: 500;
    margin-top: 25px;
    margin-bottom: 10px;
  }
  
  .icon-weapon,
  .icon-element,
  .icon-weapon {
    width: 16px;
    height: 16px;
    line-height: 16px;
    margin-bottom: -3px;
  }
  .icon-rarity {
    width: 70px;
    line-height: 16px;
  }
  
</style>

<style scoped lang="css">

  img.avater {
    width: 60px;
    height: 60px;
  }

  img.wyrmprint {
    width: 30px;
    height: 30px;
    margin-bottom: 27px;
  }

  img.wyrmprint:after { 
    content: "__";
    display: block;
    margin-top: 21px;
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
