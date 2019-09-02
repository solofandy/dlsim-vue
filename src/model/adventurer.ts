import { Dps } from './dps';
import { DpsFactor } from './dps-factor';

export class Adventurer {

    public static ParseCSVLine(line: string): Adventurer | undefined {
        if (!line) {
            return undefined;
        }
        const n = line.split(',') || [];
        if (!n || !Array.isArray(n) || n.length < 10) {
            return undefined;
        }
        try {
            const adt = new Adventurer();
            adt.dps1.full = parseInt(n[0], 10) || 0;
            if (adt.dps1.full === 0) {
                return undefined;
            }
            adt.name = n[1] || '';
            adt.rarity = parseInt(n[2].replace('*', ''), 10) || 0;
            adt.element = n[3] || '';
            adt.weapon = n[4] || '';
            adt.fifth = n[5];
            const wym = n[6].split('][')[0].replace('[', '').split('+');
            adt.wyrmprint0 = wym[0] || '';
            adt.wyrmprint1 = wym[1] || '';
            adt.dragon = n[6].split('][')[1].replace(']', '');
            adt.condition = n[7];
            adt.comment = n[8] || '';
            for (let i = 9; i < n.length; i++) {
                const df = n[i].split(':');
                adt.dps1.factors.push(new DpsFactor(df[0], parseInt(df[1], 10) || 0));
            }
            return adt;
        } catch (e) {
            return undefined;
        }
    }

    public static ParseCSV(csv: string): Adventurer[] {
        const lines = csv.split(/\n/);
        const result = [];
        for (const line of lines) {
            const a = Adventurer.ParseCSVLine(line);
            if (!!a) {
                result.push(a);
            }
        }
        return result;
    }

    // public dps_full: number = 0;
    public name: string = '';
    public rarity: number = 0;
    public element: string = '';
    public weapon: string = '';
    public fifth: string = '';
    public wyrmprint0: string = '';
    public wyrmprint1: string = '';
    public dragon: string = '';
    public condition: string = '';
    public comment: string = '';
    public dps1: Dps = new Dps();
    public dps2: Dps = new Dps();

    public findDps2(rawAdventurers: Adventurer[]) {
        const adt = rawAdventurers.find((a) => a.name === `_c_${this.name}`);
        if (adt) {
            this.dps2 = {...adt.dps1};
        }
    }
}


/*
line = "8469,G_Cleo,5*,shadow,wand,2255,[Resounding_Rendition+Jewels_of_the_Sun][Shinobi],<hp70 & always in a1>,
	(the true cleo is here),attack:1240,force_strike:0,skill_1:3903,skill_2:600,
	skill_3:0,team_buff:2725,fs_alt:0"
n = line.split(',')
for (let i in n) { console.log(`// ${i}, ${n[i]}`) }

0 8469
1 G_Cleo
2 5*
3 shadow
4 wand
5 2255
6 [Resounding_Rendition+Jewels_of_the_Sun][Shinobi]
7 <hp70 & always in a1>
8 (the true cleo is here)
9 attack:1240
10 force_strike:0
11 skill_1:3903
12 skill_2:600
13 skill_3:0
14 team_buff:2725
15 fs_alt:0
*/
