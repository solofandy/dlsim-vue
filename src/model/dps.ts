import { DpsFactor } from './dps-factor';

export class Dps {

    public full: number = 0;

    public factors: DpsFactor[] = [];

    public filterd: DpsFactor[] = [];

    public get all() {
        return this.filterd.reduce((sum, f) => sum += f.scaledDps, 0);
    }
}
