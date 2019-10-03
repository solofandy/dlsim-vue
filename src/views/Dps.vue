<template>
  <div class="main">
    <div class="head" v-if="mobileView">
      <div class="logo">
        <img class="brand" src="/dl-sim/logo-new.png" />
        <div class="fr menu">
          <i class="el-icon-s-operation" @click="asideHidden = false"></i>
        </div>
      </div>
    </div>
    <div
      class="main-scrollbar"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="loading..."
    >
      <ul class="mobile-holder" v-if="mobileView">
        <li v-for="(ad, idx) in filterd" :key="ad.name + idx" class="mb-10">
          <div class="dib">
            <img class="avater" :src="'/dl-sim/pic/character/' + ad.name + '.png'" />
          </div>
          <div class="dib content">
            <div class="mt-2">
              <div class="dib drogon">
                <img class="wyrmprint" :src="'/dl-sim/pic/dragon/' + ad.dragon + '.png'" />
              </div>
              <div class="dib drogon">
                <img class="wyrmprint" :src="'/dl-sim/pic/amulet/' + ad.wyrmprint0 + '.png'" />
              </div>
              <div class="dib drogon">
                <img class="wyrmprint" :src="'/dl-sim/pic/amulet/' + ad.wyrmprint1 + '.png'" />
              </div>
              <div class="dib dps ml-6">
                <div class="factors dps1 mb-1">
                  <div
                    v-for="f of ad.dps1.filterd"
                    :key="f.factor"
                    class="dps1 factor"
                    :class="'c-' + f.category.toLowerCase()"
                    :style="{width: f.width + '%'}"
                  ></div>
                  <div class="full">
                    <b>{{ad.dps1.all}}</b>
                  </div>
                </div>
                <div class="factors dps2 mb-2 op-3">
                  <div
                    v-for="f of ad.dps2.filterd"
                    :key="f.factor"
                    class="dps2 factor"
                    :class="'c-' + f.category.toLowerCase()"
                    :style="{width: f.width + '%'}"
                  ></div>
                </div>
              </div>
            </div>
            <div class="mobile-comment ml-6">{{ ad.condition }}. {{ad.comment}}</div>
          </div>
        </li>
      </ul>
      <ul class="holder" v-if="!mobileView">
        <li class="title">
          <div class="dib name">
            <div class="dfac h-40 color-aaa" style="padding-left: 33px;">Adventurer</div>
          </div>
          <div class="dib dps">
            <div class="dfac h-40 color-aaa">DPS Distribution</div>
          </div>
          <div class="dib comment fr">
            <div class="dfac h-40 color-aaa">Description</div>
          </div>
          <div class="dib condition fr">
            <div class="dfac h-40 color-aaa">Condition</div>
          </div>
        </li>
        <li v-for="(ad, idx) in filterd" :key="ad.name + idx">
          <div class="dib name h-60">
            <div class="dfac">
              <popper trigger="hover" :options="{placement: 'top'}">
                <div class="popper">{{ad.name.replace(/_/g, '!')}}</div>
                <img
                  slot="reference"
                  class="d-f avater"
                  :src=""/dl-sim/pic/character/" + ad.name + ".png""
                />
              </popper>
              <popper trigger="hover" :options="{placement: 'top'}">
                <div class="popper">{{ad.dragon}}</div>
                <img
                  slot="reference"
                  class="d-f wyrmprint"
                  :src=""/dl-sim/pic/dragon/" + ad.dragon + ".png""
                />
              </popper>
              <popper trigger="hover" :options="{placement: 'top'}">
                <div class="popper">{{ad.wyrmprint0.replace(/_/g, ' ')}}</div>
                <img
                  slot="reference"
                  class="d-f wyrmprint"
                  :src=""/dl-sim/pic/amulet/" + ad.wyrmprint0 + ".png""
                />
              </popper>
              <popper trigger="hover" :options="{placement: 'top'}">
                <div class="popper">{{ad.wyrmprint1.replace(/_/g, ' ')}}</div>
                <img
                  slot="reference"
                  class="d-f wyrmprint"
                  :src=""/dl-sim/pic/amulet/" + ad.wyrmprint1 + ".png""
                />
              </popper>
            </div>
          </div>
          <div class="dib dps">
            <div class="dps-holder">
              <div class="factors mb-6">
                <popper
                  trigger="hover"
                  :options="{placement: 'top'}"
                  v-for="f of ad.dps1.filterd"
                  :key="f.factor"
                >
                  <div class="popper">
                    <span class="f-title">{{f.category !== 'Others' ? f.category : f.factor}}:</span>
                    {{f.scaledDps}}
                  </div>
                  <div
                    slot="reference"
                    class="factor"
                    :class="'c-' + f.category.toLowerCase()"
                    :style="{width: f.width + '%'}"
                  ></div>
                </popper>
                <div class="full">
                  <b>{{ad.dps1.all}}</b>
                </div>
              </div>
              <div class="factors">
                <popper
                  trigger="hover"
                  :options="{placement: 'top'}"
                  v-for="f of ad.dps2.filterd"
                  :key="f.factor"
                >
                  <div class="popper">
                    <span class="f-title">{{f.category !== 'Others' ? f.category : f.factor}}:</span>
                    {{f.scaledDps}}
                  </div>
                  <div
                    slot="reference"
                    class="factor op-3"
                    :class="'c-' + f.category.toLowerCase()"
                    :style="{width: f.width + '%'}"
                  ></div>
                </popper>
                <div class="full color-aaa">{{ad.dps2.all || ''}}</div>
              </div>
            </div>
          </div>
          <div class="dib comment fr">
            <div class="dfac h-60">
              <div>{{ad.comment}}</div>
            </div>
          </div>
          <div class="dib condition fr">
            <div class="dfac h-60">
              <div>{{ad.condition}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="aside the-filter" :class="{show: mobileView && !asideHidden}">
      <div class="aside-container">
        <div class="the-brand">
          <img class="brand" src="/dl-sim/logo-new.png" />
        </div>
        <div class="title">
          Legend
          <div class="closer fr" @click="asideHidden = true" v-if="mobileView">&times;</div>
        </div>
        <div class="legend" style="line-height: 25px;">
          <div
            class="dib"
            v-for="(c) in allDpsCategories"
            :key="c"
            @click="toggleFactor(c)"
            :class="{'c-gray': !dpsCategories.includes(c)}"
          >
            <span class="dib">
              <div class="indic" :class="'c-' + c.toLowerCase()"></div>
            </span>
            <span class="dib">
              <div class="label">{{ c }}</div>
            </span>
          </div>
        </div>
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
        <!-- <div class="splitter"></div> -->
        <div class="title">Co-abilities</div>
        <div class="filter">
          <el-checkbox-group class="cb-filter" v-model="exs" size="small" @change="reload()">
            <el-checkbox label="k">
              <img class="icon-weapon" src="/dl-sim/pic/weapon/blade.png" alt="K" />
            </el-checkbox>
            <el-checkbox label="r">
              <img class="icon-weapon" src="/dl-sim/pic/weapon/wand.png" alt="K" />
            </el-checkbox>
            <el-checkbox label="d">
              <img class="icon-weapon" src="/dl-sim/pic/weapon/dagger.png" alt="K" />
            </el-checkbox>
            <el-checkbox label="b">
              <img class="icon-weapon" src="/dl-sim/pic/weapon/bow.png" alt="K" />
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="title">Team DPS</div>
        <div class="filter">
          <el-input-number
            :disabled="category == 'sp'"
            v-model="teamDPS"
            controls-position="right"
            :min="0"
            :step="500"
            @change="reload()"
          ></el-input-number>
        </div>
        <div class="splitter"></div>
        <div class="title">
          Rarity
          <span v-if="rarities.length > 0">
            <a class="toggle" @click="toggleRarity()">Reset</a>
          </span>
        </div>
        <div class="filter">
          <el-checkbox-group class="cb-filter" v-model="rarities" size="mini" @change="reload()">
            <el-checkbox label="5">
              <img class="icon-rarity" src="/dl-sim/pic/rarity/5.png" alt="K" />
            </el-checkbox>
            <el-checkbox label="4">
              <img class="icon-rarity" src="/dl-sim/pic/rarity/4.png" alt="K" />
            </el-checkbox>
            <el-checkbox label="3">
              <img class="icon-rarity" src="/dl-sim/pic/rarity/3.png" alt="K" />
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="title">
          Element
          <span v-if="elements.length > 0">
            <a class="toggle" @click="toggleElement()">Reset</a>
          </span>
        </div>
        <div class="filter">
          <el-checkbox-group class="cb-filter" v-model="elements" size="mini" @change="reload()">
            <el-checkbox label="flame">
              <img class="icon-element" src="/dl-sim/pic/element/flame.png" alt="K" />
            </el-checkbox>
            <el-checkbox label="water">
              <img class="icon-element" src="/dl-sim/pic/element/water.png" alt="K" />
            </el-checkbox>
            <el-checkbox label="wind">
              <img class="icon-element" src="/dl-sim/pic/element/wind.png" alt="K" />
            </el-checkbox>
            <br />
            <el-checkbox label="light">
              <img class="icon-element" src="/dl-sim/pic/element/light.png" alt="K" />
            </el-checkbox>
            <el-checkbox label="shadow">
              <img class="icon-element" src="/dl-sim/pic/element/shadow.png" alt="K" />
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="title">
          Class
          <span v-if="weapons.length > 0">
            <a class="toggle" @click="toggleWeapon()">Reset</a>
          </span>
        </div>
        <div class="filter">
          <el-checkbox-group class="cb-filter" v-model="weapons" size="mini" @change="reload()">
            <el-checkbox label="sword">
              <img class="icon-weapon" src="/dl-sim/pic/weapon/sword.png" />
            </el-checkbox>
            <el-checkbox label="blade">
              <img class="icon-weapon" src="/dl-sim/pic/weapon/blade.png" />
            </el-checkbox>
            <el-checkbox label="dagger">
              <img class="icon-weapon" src="/dl-sim/pic/weapon/dagger.png" />
            </el-checkbox>
            <el-checkbox label="lance">
              <img class="icon-weapon" src="/dl-sim/pic/weapon/lance.png" />
            </el-checkbox>
            <el-checkbox label="axe">
              <img class="icon-weapon" src="/dl-sim/pic/weapon/axe.png" />
            </el-checkbox>
            <el-checkbox label="bow">
              <img class="icon-weapon" src="/dl-sim/pic/weapon/bow.png" />
            </el-checkbox>
            <el-checkbox label="wand">
              <img class="icon-weapon" src="/dl-sim/pic/weapon/wand.png" />
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="footer">
          <div class="links">
            <a
              href="https://github.com/b1ueb1ues/b1ueb1ues.github.io/blob/master/dl-sim/README.md"
            >About</a>
            <a
              class="pl-15"
              href="https://github.com/b1ueb1ues/b1ueb1ues.github.io/issues/new"
            >Feedback</a>
            <a
              class="pl-15"
              href="https://github.com/b1ueb1ues/b1ueb1ues.github.io/blob/master/dl-sim/amulet.csv"
            >Wrymprints</a>
          </div>
          <div class="powerby mb-5">
            powered by
            <a href="https://cn.vuejs.org/">Vue</a> and
            <a href="https://element.eleme.cn/">Element</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Http } from '@/service/http';
import { Adventurer } from '../model/adventurer';
import { Dps } from '../model/dps';
import { NAME_MAP } from '../model/dps-factor';
import { ElPopover } from 'element-ui/types/popover';
// @ts-ignore
import Popper from 'vue-popperjs';

@Component({
  components: {
    Popper,
  },
})
export default class DpsComponent extends Vue {
  public get csvUrl(): string {
    const condition = 'krdb'
      .split('')
      .filter((c) => this.exs.includes(c))
      .join('');
    return `/dl-sim/${this.category.toLowerCase()}/data_${
      condition ? condition : '_'
    }.csv`;
  }
  public category: 'sp' | '60' | '120' | '180' = '180';
  public exs: string[] = ['k', 'r'];
  public teamDPS: number = this.defaultTeamDPS;
  public rarities: string[] = []; // ['5', '4', '3'];
  public elements: string[] = []; // ['flame', 'water', 'wind', 'light', 'shadow'];
  public weapons: string[] = []; // ['sword', 'blade', 'dagger', 'axe', 'lance', 'bow', 'wand'];

  public allDpsCategories: string[] = [
    'Atk',
    'S1',
    'S2',
    'S3',
    'Fs',
    'Buff',
    'Bleed',
    'Others',
  ];
  public dpsCategories: string[] = [
    'Atk',
    'S1',
    'S2',
    'S3',
    'Fs',
    'Buff',
    'Bleed',
    'Others',
  ];
  private defaultTeamDPS: number = 6000;

  private mobileView: boolean = false;
  private asideHidden: boolean = true;

  private cachedCsvUrl: string = '';
  private adventurers: Adventurer[] = [];
  private filterd: Adventurer[] = [];
  private loading: boolean = true;
  private rendered: Adventurer[] = [];

  public async reload() {
    this.loading = true;
    await this.sleeep(200);
    await this.$nextTick();
    if (this.csvUrl !== this.cachedCsvUrl) {
      const csv = await this.loadCsv();
      if (!csv) {
        this.loading = false;
        return;
      }

      this.adventurers = Adventurer.ParseCSV(csv);
      this.cachedCsvUrl = this.adventurers.length > 0 ? this.csvUrl : '';
    }

    if (this.adventurers.length > 0) {
      if (this.category !== 'sp') {
        const scaledTeamDPSRatio: number = this.teamDPS / this.defaultTeamDPS;
        this.adventurers.forEach((a) => {
          a.dps1.factors
            .filter((f) => f.category === NAME_MAP.team_buff)
            .forEach((f) => f.scaleOriginalDPS(scaledTeamDPSRatio));
          a.dps2.factors
            .filter((f) => f.category === NAME_MAP.team_buff)
            .forEach((f) => f.scaleOriginalDPS(scaledTeamDPSRatio));
        });
      }

      this.adventurers = Adventurer.sort(this.adventurers);
      const maxx = this.adventurers[0].dps1.all;

      this.adventurers.forEach((a) => {
        a.condition = a.condition.replace(/[<>]/g, '');
        a.dps1.factors.forEach((f) => (f.width = (100 * f.scaledDps) / maxx));
        a.dps2.factors.forEach((f) => (f.width = (100 * f.scaledDps) / maxx));
      });
    }

    this.filterd = this.adventurers.filter((a) => this.matched(a));
    await this.$nextTick();
    await this.sleeep(200);
    this.loading = false;
  }

  public mounted() {
    // @ts-ignore
    window.$dps = this;
    this.mobileView = window.innerWidth <= 800;
    window.onresize = () => {
      this.mobileView = window.innerWidth <= 800;
    };
    this.reload();
  }

  private toggleRarity() {
    if (this.rarities.length === 0) {
      this.rarities = ['5', '4', '3'];
    } else {
      this.rarities = [];
    }
    this.reload();
  }

  private toggleElement() {
    if (this.elements.length === 0) {
      this.elements = ['flame', 'water', 'wind', 'light', 'shadow'];
    } else {
      this.elements = [];
    }
    this.reload();
  }

  private toggleWeapon() {
    if (this.weapons.length === 0) {
      this.weapons = [
        'sword',
        'blade',
        'dagger',
        'axe',
        'lance',
        'bow',
        'wand',
      ];
    } else {
      this.weapons = [];
    }
    this.reload();
  }

  private async toggleFactor(category: string) {
    this.loading = true;
    await this.sleeep(200);
    await this.$nextTick();

    const k = this.dpsCategories.indexOf(category);
    if (k < 0) {
      this.dpsCategories.push(category);
    } else {
      this.dpsCategories.splice(k, 1);
    }
    this.filterd.forEach((a) => {
      a.filterDpsFactors(this.dpsCategories);
    });
    Adventurer.sort(this.filterd);
    await this.$nextTick();
    await this.sleeep(200);
    this.loading = false;
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
    if (
      this.rarities.length > 0 &&
      !this.rarities.includes(adventurer.rarity)
    ) {
      return false;
    }
    if (
      this.elements.length > 0 &&
      !this.elements.includes(adventurer.element)
    ) {
      return false;
    }
    if (this.weapons.length > 0 && !this.weapons.includes(adventurer.weapon)) {
      return false;
    }
    return true;
  }
}
</script>

<style>
.mt-5 {
  margin-top: 5px !important;
}
.mr-20 {
  margin-right: 20px !important;
}
.pl-15 {
  padding-left: 15px;
}
.op-3 {
  opacity: 0.3 !important;
}
.op-9 {
  opacity: 0.9 !important;
}
.main {
  padding: 0px;
  margin-top: 0;
  height: 100%;
  min-height: auto;
  box-sizing: border-box;
}

.holder .popper {
  color: #eeeeee !important;
  background: rgba(0, 0, 0, 0.8) !important;
  border-color: rgba(0, 0, 0, 0.8) !important;
  padding: 4px 8px !important;
  font-size: 12px !important;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}

.holder .popper .popper__arrow {
  border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent !important;
}
</style>

<style scoped lang="css">
.dfac {
  display: flex !important;
  align-items: center;
}
.dib {
  display: inline-block;
}
.fr {
  float: right !important;
}
.mt-2 {
  margin-top: 2px;
}
.ml-4 {
  margin-left: 4px;
}
.ml-6 {
  margin-left: 6px;
}
.mb-1 {
  margin-bottom: 1px;
}
.mb-2 {
  margin-bottom: 2px;
}
.mb-3 {
  margin-bottom: 3px;
}
.mb-5 {
  margin-bottom: 5px;
}
.mb-6 {
  margin-bottom: 6px;
}
.mb-10 {
  margin-bottom: 10px;
}
.h-60 {
  height: 60px;
}
.h-50 {
  height: 50px;
}
.h-40 {
  height: 40px;
}
.h-10 {
  height: 10px !important;
}
.h-5 {
  height: 5px !important;
}

.color-aaa {
  color: #aaa !important;
}

.main-scrollbar {
  height: 100vh;
  margin-right: 321px;
  overflow: auto;
}

.holder {
  min-width: 1032px;
  padding: 0px;
  margin: 0px;
  padding-bottom: 20px;
}

.holder li {
  list-style: none;
}

.holder .title {
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}
.holder .title .name,
.holder .title .dps,
.holder .title .comment,
.holder .title .condition {
  font-size: 14px !important;
  font-weight: 500;
}

.holder .name {
  padding: 0px;
  width: 210px;
}

.holder .name img.avater {
  width: 60px;
  height: 60px;
  padding-right: 5px;
  padding-left: 30px;
}

.holder .name img.wyrmprint {
  width: 30px;
  height: 30px;
  padding-left: 5px;
}

.holder .dps {
  padding: 0px 10px;
  min-width: 400px;
  width: calc(100% - 632px);
}

.holder .dps .dps-holder {
  padding: 15px 60px 15px 0px;
}

.holder .comment {
  font-size: 14px;
  color: #555;
  width: 170px;
  padding: 0px 30px 0px 10px;
}

.holder .condition {
  color: #555;
  font-size: 14px;
  width: 170px;
  padding: 0px 10px;
}

div.adt-body {
  margin-left: 6px;
  text-align: left;
}

div.comment {
  margin-bottom: 2px;
}

.factors {
  height: 12px;
  position: relative;
  box-sizing: border-box;
  background-color: #f0f0f0;
}

.factors .factor {
  background-color: #12b886;
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
.c-atk {
  background-color: #228be6 !important;
}
.c-s1 {
  background-color: #40c057 !important;
}
.c-s2 {
  background-color: #fab005 !important;
}
.c-s3 {
  background-color: #f76707 !important;
}
.c-bleed {
  background-color: #e64980 !important;
}
.c-fs {
  background-color: #15aabf !important;
}
.c-buff {
  background-color: #7950f2 !important;
}
.c-others {
  background-color: #12b886 !important;
}
.c-gray {
  opacity: 0.2 !important;
}

.legend {
  cursor: pointer;
}

.legend .indic {
  height: 14px;
  width: 14px;
  border-radius: 2px;
  margin-bottom: -2px;
}
.legend .label {
  width: 40px;
  margin-left: 5px;
  font-size: 12px;
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

.aside {
  width: 290px;
  padding-left: 30px;
  position: fixed;
  overflow-y: auto;
  top: 0;
  right: 0;
  bottom: 0;
  font-size: 14px !important;
  border-left: 1px solid #eee;

  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.cb-filter {
  line-height: 25px;
}

.rg-filter .el-radio-button--mini .el-radio-button__inner {
  font-size: 13px;
}

.cb-filter .el-checkbox {
  margin-right: 20px !important;
}

.cb-filter .el-checkbox:last-child {
  margin-right: 0px !important;
}
.cb-filter .el-checkbox__input {
  line-height: 16px !important;
}
.cb-filter .el-checkbox__label {
  padding-left: 5px !important;
}

.the-filter .splitter {
  height: 1px;
  background: #eee;
  padding: 0px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: -30px !important;
}

.the-filter .title {
  font-weight: 500;
  margin-top: 25px;
  margin-bottom: 10px;
}

.the-filter .title .toggle {
  font-size: 12px;
  color: #409eff;
  cursor: pointer;
  font-weight: 400;
  margin-left: 10px;
  text-decoration: none;
}
.the-filter .title .toggle:hover {
  text-decoration: underline;
  font-weight: 500;
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

.aside .aside-container {
  height: 100%;
  min-height: 800px;
  position: relative;
}

.aside .the-brand {
  width: 200px;
  padding: 20px 0 0 0;
}
.aside .the-brand .brand {
  width: 175px;
  height: 45px;
}

.aside .footer {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 100%;
  margin: 0px;
  padding: 0px;
}

.aside .footer .powerby {
  font-size: 10px;
  color: #aaa;
  padding-bottom: 10px;
}
.aside .footer .powerby a {
  color: #999;
  text-decoration: none;
}

.aside .footer .links {
  padding-bottom: 5px;
}

.aside .footer .links a {
  font-size: 11px;
  color: #555;
  text-decoration: none;
}

.aside .footer .links a:hover,
.aside .footer .powerby a:hover {
  text-decoration: underline;
  color: #333;
}

@media screen and (max-width: 800px) {
  .head {
    display: block;
    -webkit-box-shadow: 0px 2px 5px 0px rgba(221, 221, 221, 1);
    -moz-box-shadow: 0px 2px 5px 0px rgba(221, 221, 221, 1);
    box-shadow: 0px 2px 5px 0px rgba(221, 221, 221, 1);
  }
  .head .logo {
    height: 30px;
    padding: 15px 15px;
  }

  .head .brand {
    width: 117px;
    height: 30px;
  }

  .head .menu {
    color: #888;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 5px 6px 4px 6px;
  }

  .aside {
    z-index: 999;
    background: #fafafa;
    right: -320px;
  }
  .aside.show {
    right: 0px;
  }

  .main-scrollbar {
    margin-right: 0px;
    height: calc(100vh - 60px);
  }

  .aside .aside-container {
    min-height: 680px;
  }

  .aside .the-brand {
    display: none;
  }

  .aside .closer {
    font-size: 24px;
    margin-right: 15px;
    margin-top: -10px;
    color: #999;
    cursor: pointer;
  }

  .mobile-holder {
    list-style: none;
    padding: 15px 0px 5px 0px;
    margin: 0px;
  }

  .mobile-holder .content {
    width: calc(100% - 75px);
    vertical-align: top;
  }

  .mobile-holder .content .drogon {
    height: 30px;
  }

  .mobile-holder .dps {
    width: calc(100% - 150px);
  }

  .mobile-holder .dps .dps1 {
    height: 16px;
  }
  .mobile-holder .dps .dps1 .full {
    margin-right: -42px;
    line-height: 18px;
    text-align: left;
  }

  .mobile-holder .dps .dps2 {
    height: 8px;
  }

  .mobile-holder img.avater {
    width: 60px;
    height: 60px;
    padding-left: 10px;
    padding-right: 1px;
  }
  .mobile-holder img.wyrmprint {
    width: 30px;
    height: 30px;
    padding-left: 2px;
  }

  .mobile-holder .mobile-comment {
    font-size: 12px;
    line-height: 16px;
    color: #aaaaaa;
  }
}
</style>
