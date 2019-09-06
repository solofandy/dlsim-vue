import { TimeSelect } from 'element-ui';

const NAME_MAP: any = {
    attack: 'atk',
    skill_1: 's1',
    skill_2: 's2',
    skill_3: 's3',
    bleed: 'bleed',
    team_buff: 'buff',
    force_strike: 'fs',
};

export class DpsFactor {

    public category: string = '';

    public factor: string = '';

    public dps: number = 0;

    public width: number = 0;

    constructor(f: string, dps: number) {
        this.category = f in NAME_MAP ? NAME_MAP[f] : 'others';
        this.factor = f;
        this.dps = dps;
    }

}

