import Label from './Label';

export interface IMetric {
    name: string;
    value: number;
    info?: string;
    type?: 'counter' | 'gauge';
}

// https://www.typescriptlang.org/docs/handbook/2/classes.html
class Metric {
    // The strictPropertyInitialization setting controls whether class fields need to be initialized in the constructor.
    name: string;
    value: number;
    info?: string;
    type: 'counter' | 'gauge';

    constructor(name: string, value: number, type?: 'counter' | 'gauge', info?: string) {
        this.name = name;
        this.value = value;
        this.type = type ? type : 'gauge';
    }

    update(value: number): IMetric {
        this.value = value;
        return this;
    }
}

// const myLabel = new Label();
// console.log(myLabel);

export default Metric;
