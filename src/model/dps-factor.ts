import { TimeSelect } from 'element-ui';

const NAME_MAP: any = {
    attack: 'atk',
    force_strike: 'fs',
    skill_1: 's1',
    skill_2: 's2',
    skill_3: 's3',
    team_buff: 'buff',
};

export class DpsFactor {

    public category: string = '';

    public factor: string = '';

    public dps: number = 0;

    public width: number = 0;

    constructor(f: string, dps: number) {
        this.category = f in NAME_MAP ? NAME_MAP[f] : '';
        this.factor = f;
        this.dps = dps;
    }

}

