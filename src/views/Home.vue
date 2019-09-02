<template>
  <div>
    <el-row class="container">
      <el-col :span="24" class="header">HEADER</el-col>
    </el-row>
    <el-row class="container">
      <el-col :span="24" class="main">
        <div class="adt-holder">
          <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
            <li v-for="(adt) of rendered" :key="adt.name" class="infinite-list-item adt">
              <div><img class="avater" :src='"https://b1ueb1ues.github.io/dl-sim/pic/character/" + adt.name + ".png"'></div>
              <div>
                <div><img class="wyrmprint" :src='"https://b1ueb1ues.github.io/dl-sim/pic/amulet/" + adt.wyrmprint0 + ".png"'></div>
                <div><img class="wyrmprint" :src='"https://b1ueb1ues.github.io/dl-sim/pic/amulet/" + adt.wyrmprint1 + ".png"'></div>
              </div>
              <div class="adt-body">
                <div class="comment">[{{adt.dragon}}]{{ adt.comment ? ' - ' + adt.comment : ''}}</div>
                <div class="factors">
                  <div v-for="f of adt.dps1.factors" :key="f.factor" class="factor" :class="f.factor" :style="{width: f.width + 'px'}"></div>
                  <div class="full" >{{adt.dps1.full}}</div>
                </div>
                <div class="factors">
                  <div v-for="f of adt.dps2.factors" :key="f.factor" class="factor" :class="f.factor" :style="{width: f.width + 'px'}"></div>
                  <div class="full" >{{adt.dps2.full}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
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
  constructor() {
    super();
    // @ts-ignore
    window.$home = this;
  }

  public async load() {
    if (!this.adverturerReady) {
      const csv = await Http.Get('/180/data__.csv', 'text');
      const rawAdventurers = Adventurer.ParseCSV(csv);
      this.adventurers = rawAdventurers.filter((a) => /^_c_/.test(a.name) === false);
      this.adventurers.forEach((a) => a.findDps2(rawAdventurers));
      this.adventurers.sort((p, q) => p.dps1.full > q.dps1.full ? -1 : p.dps1.full === q.dps1.full ? 0 : 1);

      if (this.adventurers.length > 0) {
        const maxx = this.adventurers[0].dps1.full;
        this.adventurers.forEach((a) => {
          a.dps1.factors.forEach((f) => f.width = 650 * f.dps / maxx);
          a.dps2.factors.forEach((f) => f.width = 650 * f.dps / maxx);
        });
      }

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
    width: 900px;
    margin: auto;
  }
  .adt-holder ul {
    max-height: 800px;
    overflow: auto;
    list-style: none;
  }
  .adt-holder ul li.adt {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    background: #e8f3fe;
    margin: 10px;
    color: #333;
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
     -moz-box-shadow:2px 2px 3px #666;
     -webkit-box-shadow:2px 2px 3px #666;
     box-shadow:2px 2px 3px #666;
 }
</style>
