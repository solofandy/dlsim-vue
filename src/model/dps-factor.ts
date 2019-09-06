import { TimeSelect } from 'element-ui';

const NAME_MAP: any = {
    attack: 'Atk',
    force_strike: 'Fs',
    skill_1: 'S1',
    skill_2: 'S2',
    skill_3: 'S3',
    team_buff: 'Buff',
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

