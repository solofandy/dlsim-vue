import { TimeSelect } from 'element-ui';

export const NAME_MAP: any = {
    attack: 'Atk',
    skill_1: 'S1',
    skill_2: 'S2',
    skill_3: 'S3',
    bleed: 'Bleed',
    team_buff: 'Buff',
    force_strike: 'Fs',
};

export class DpsFactor {

    public category: string = '';

    public factor: string = '';

    public dps: number = 0;

    public scaledDps: number;

    public width: number = 0;

    constructor(f: string, dps: number) {
        this.category = f in NAME_MAP ? NAME_MAP[f] : 'Others';
        this.factor = f;
        this.dps = dps;
        this.scaledDps = this.dps;
    }

    public scaleOriginalDPS(factor: number) {
        this.scaledDps = Math.floor(this.dps * factor);
    }
}

