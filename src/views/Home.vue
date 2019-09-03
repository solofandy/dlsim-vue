<template>
  <div>
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
    <el-row class="container">
      <el-col :span="24" class="main">
        <div class="adt-holder">
          <ul class="infinite-list" v-infinite-scroll="load" :style="{height: ulHeight}">
            <li v-for="(adt) of rendered" :key="adt.name" class="infinite-list-item adt">
              <div><img class="avater" :alt="adt.name" :src='"https://b1ueb1ues.github.io/dl-sim/pic/character/" + adt.name + ".png"'></div>
              <div>
                <div><img class="wyrmprint" :src='"https://b1ueb1ues.github.io/dl-sim/pic/amulet/" + adt.wyrmprint0 + ".png"'></div>
                <div><img class="wyrmprint" :src='"https://b1ueb1ues.github.io/dl-sim/pic/amulet/" + adt.wyrmprint1 + ".png"'></div>
              </div>
              <div class="adt-body">
                <div class="comment">[{{adt.dragon}}]{{ adt.comment ? '  - ' + adt.comment : ''}}</div>
                <div class="factors">
                  <div @mouseenter="viewFactors(adt, adt.dps1, $event)" v-for="f of adt.dps1.factors" :key="f.factor" class="factor bb" :class="f.factor" :style="{width: f.width + 'px'}"></div>
                  <div class="full" >{{adt.dps1.full}}</div>
                </div>
                <div class="factors">
                  <div @mouseenter="viewFactors(adt, adt.dps2, $event)" v-for="f of adt.dps2.factors" :key="f.factor" class="factor" :class="f.factor" :style="{width: f.width + 'px'}"></div>
                  <div class="full" >{{adt.dps2.full}}</div>
                </div>
              </div>
            </li>
          </ul>
          <p v-if="adventurerLoading">loading...</p>
        </div>
      </el-col>
    </el-row>
     <el-popover popper-class="factors-detail" ref="factors" trigger="manual" visible-arrow="false">  <!-- @click.native="closeDetail()"> -->
      <div class="">
        <span style="float: right; font-size: 18px; color: #999; cursor: pointer;" @click="closeDetail()">&times;</span>
        <div style="display: inline-block;">
          <img class="avater" :alt="thatAdventurer.name" :src='"https://b1ueb1ues.github.io/dl-sim/pic/character/" + thatAdventurer.name + ".png"'>
        </div>
        <div style="display: inline-block;">
          <div><img class="wyrmprint" :src='"https://b1ueb1ues.github.io/dl-sim/pic/amulet/" + thatAdventurer.wyrmprint0 + ".png"'></div>
          <div><img class="wyrmprint" :src='"https://b1ueb1ues.github.io/dl-sim/pic/amulet/" + thatAdventurer.wyrmprint1 + ".png"'></div>
        </div>
        <p><b>{{thatAdventurer.name}}</b></p>
        <p v-if="thatAdventurer.comment ">{{thatAdventurer.comment}}</p>
        <p v-if="thatAdventurer.dps1.full === thatDps.full">{{thatAdventurer.condition}}</p>
        <p v-for="(f) of thatDps.factors" :key="f.factor">
          <span class="f-title">{{f.factor}}: </span>{{f.dps}}
        </p>
      </div>
      <!-- <el-button slot="reference" @click="detailPopover = !detailPopover">手动激活</el-button> -->
    </el-popover>
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
export default class Home extends Vue {

  public get csvUrl(): string {
    return `/${this.category.toLowerCase()}/data_${this.exs.length === 0 ? '_' : this.exs.join('')}.csv`;
  }

  public get noMore() {
    return this.adventurerProcessed >= this.adventurers.length;
  }
  public category: 'sp' | '60' | '120' | '180' = '180';
  public rarity: string = 'all';
  public element: string = 'all';
  public weapon: string = 'all';
  public exs: string[] = [];

  public ulHeight: string = '400px';
  public detailPopover: boolean = false;
  public adverturerReady: boolean = false;

  public thatAdventurer: Adventurer = new Adventurer();
  public thatDps: Dps = new Dps();

  private cachedCsvUrl: string = '';
  private adventurers: Adventurer[] = [];
  private adventurerProcessed: number = 0;
  private adventurerLoading: boolean = true;
  private rendered: Adventurer[] = [];

  public async reload() {
    this.closeDetail();
    this.rendered = [];
    this.adventurerProcessed = 0;
    await this.load();
  }

  public async load() {
    this.adventurerLoading = true;
    if (this.csvUrl !== this.cachedCsvUrl) {
      const csv = await this.loadCsv();
      if (!!csv) {
        this.adventurers = Adventurer.ParseCSV(csv);
        this.adventurerProcessed = 0;
        this.cachedCsvUrl = this.adventurers.length > 0 ? this.csvUrl : '';
        if (this.adventurers.length > 0) {
          const maxx = this.adventurers[0].dps1.full;
          this.adventurers.forEach((a) => {
            a.dps1.factors.forEach((f) => f.width = 650 * f.dps / maxx);
            a.dps2.factors.forEach((f) => f.width = 650 * f.dps / maxx);
          });
        }
      }
    }
    let count = 12;
    while (this.adventurerProcessed < this.adventurers.length && count > 0) {
      if (this.matched(this.adventurers[this.adventurerProcessed])) {
        this.rendered.push(this.adventurers[this.adventurerProcessed]);
        count--;
      }
      this.adventurerProcessed++;
    }
    this.adventurerLoading = false;
  }

  public async test() {
    const csv = await Http.Get('/180/data__.csv', 'text');
    const adventurers = Adventurer.ParseCSV(csv);
    this.adventurers = adventurers;
    return adventurers;
  }

  public mounted() {
    window.onresize = () => {
      this.adjustUlHeight();
    };
    this.adjustUlHeight();
    // @ts-ignore
    window.$home = this;
  }

  public viewFactors(adventurer: Adventurer, dps: Dps, $event: MouseEvent) {
    // @ts-ignore
    this.thatAdventurer = adventurer;
    this.thatDps = dps;

    const $detail: any = this.$refs.factors as ElPopover;
    $detail.$refs.popper.style.left = '1388px';
    $detail.$refs.popper.style.top = `${$event.clientY - $event.clientY  % 20}px`;
    $detail.showPopper = true;
  }

  public closeDetail() {
    const $detail: any = this.$refs.factors as ElPopover;
    $detail.showPopper = false;
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

  private adjustUlHeight() {
    this.ulHeight = `${Math.max(200, window.innerHeight - 90)}px`;
  }
}
</script>

<style scoped lang="css">
  .the-brand {
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
  }
  .the-brand a {
    color: #555;
    text-decoration: none;
  }
  .header {
    font-size: 11px;
    margin: 0px;
    height: 60px;
    line-height: 60px;
    background: #fefefe;
    color:#333;
    box-shadow: 0 2px 4px rgba(0,0,0,.1);
  }
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

  .adt-holder {
    width: 900px;
    margin: auto;
  }
  .adt-holder ul {
    overflow: auto;
    list-style: none;
  }

  .adt-holder ul li.adt {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    background: #e8f3fe;
    margin: 5px;
    margin-top: 0px;
    color: #333;
    border-radius: 2px;

    transition-duration: .4s;
    -moz-transition-duration: .4s; /* Firefox 4 */
    -webkit-transition-duration: .4s; /* Safari 和 Chrome */
    -o-transition-duration: .4s; /* Opera */
  }

  .adt-holder ul li.adt:hover {
    font-weight: bold;
    background-color: #e8f3fc;
    box-shadow: 0 0 2px 2px #ddd;
    -moz-box-shadow:  0 0 2px 2px #ddd;
    -webkit-box-shadow:  0 0 2px 2px #ddd;
  }

  img.avater {
    width: 66px;
    height: 66px;
  }

  img.wyrmprint {
    width: 30px;
    height: 30px;
  }

  div.adt-body {
    margin-left: 6px;
    text-align: left;
  }

  div.comment {
    font-size: 11px;
    margin-bottom: 2px;
  }

  div.factors {
    width: 700px;
  }

  div.factor {
     display: table-cell;
     height: 18px;
     width: 0px;
     background-color: #228fbd;

  }
  div.factor.bb {
    border-bottom: 1px solid rgba(64, 64, 64, 0.1);
  }
  div.full {
     display: table-cell;
     height: 18px;
     width: 20px;
     padding-left: 2px;
     font-size: 12px;
     line-height: 18px;
  }
  .factor.attack {
    background-color: #4cb4e7;
  }
  .factor.force_strike {
    background-color: #ffc09f;
  }
  .factor.skill_1 {
    background-color: #495A80;
  }
  .factor.skill_2 {
    background-color: #008573;
  }
  .factor.skill_3 {
    background-color: #483C32;
  }
  .factor.team_buff {
    background-color: #FFA07B;
  }
  .factor.s1_poison {
    background-color: #7fb80e;
  }

  div.factor:hover,
  div.factor.active {
    box-shadow: 0 0 2px 2px rgba(64, 64, 64, 0.2);
    -moz-box-shadow: 0 0 2px 2px rgba(64, 64, 64, 0.2);
    -webkit-box-shadow: 0 0 2px 2px rgba(64, 64, 64, 0.2);
  }

  .factors-detail p {
    color: #333;
    padding: 1px;
    margin: 0px;
    font-size: 12px;
  }

  span.f-title {
    color: #666;
  }

</style>
