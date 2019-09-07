<template>
  <div class="main">
    <div class="holder">
      <div class="mb-5">
        <div class="dib attack" style="width: 200px;">1</div>
        <div class="dib skill_1" style="min-width: 400px; width: calc(100% - 601px);">2</div>
        <div class="dib fr skill_3" style="width: 200px;" >4</div>
        <div class="dib fr skill_2" style="width: 200px;" >3</div>
      </div>
      
      <div class="mb-5">
        <div class="dib attack" style="width: 200px;">1</div>
        <div class="dib skill_1" style="min-width: 400px; width: calc(100% - 601px);">2</div>
        <div class="dib fr skill_3" style="width: 200px;" >4</div>
        <div class="dib fr skill_2" style="width: 200px;" >3</div>
      </div>
      
      <div class="mb-5">
        <div class="dib attack" style="width: 200px;">1</div>
        <div class="dib skill_1" style="min-width: 400px; width: calc(100% - 601px);">2</div>
        <div class="dib fr skill_3" style="width: 200px;" >4</div>
        <div class="dib fr skill_2" style="width: 200px;" >3</div>
      </div>
      
      <div class="mb-5">
        <div class="dib attack" style="width: 200px;">1</div>
        <div class="dib skill_1" style="min-width: 400px; width: calc(100% - 601px);">2</div>
        <div class="dib fr skill_3" style="width: 200px;" >4</div>
        <div class="dib fr skill_2" style="width: 200px;" >3</div>
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
  .main { 
    height: 100vh;
    margin-right: 300px;
    overflow: auto;
  }
  .holder {
    min-width: 1002px;
  }
  .fr {
    float: right;
  }
  .dib {
    display: inline-block;
  }
  .mb-5 {
    margin-bottom:  5px;
  }
  
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
  .attack {
    background-color: #4cb4e7;
  }
  .force_strike {
    background-color: #ffc09f;
  }
  .skill_1 {
    background-color: #495A80;
  }
  .skill_2 {
    background-color: #008573;
  }
  .skill_3 {
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
