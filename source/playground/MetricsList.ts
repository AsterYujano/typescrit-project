import Metric, { IMetric } from './Metric';

class MetricsList {
    metrics: Array<IMetric> = [];

    constructor(metrics: Array<IMetric>) {
        this.metrics = metrics;
    }

    add(metric: IMetric): Array<IMetric> {
        if (this.isTheMetricAlreadyPresent(metric)) {
            const myMetricToUpdate = this.metrics.find(({ name }) => name === metric.name);
            if (myMetricToUpdate) myMetricToUpdate.update(metric.value);

            return this.metrics;
        } else {
            this.metrics.push(metric);
            return this.metrics;
        }
    }

    private isTheMetricAlreadyPresent(metricToCheck: IMetric): Boolean {
        for (let i = 0; i < this.metrics.length; i++) {
            if (this.metrics[i].name === metricToCheck.name) {
                return true;
            }
        }

        return false;
    }
}
const myMetric = new Metric('new metric 1', 1, 'counter');
const myMetric2 = new Metric('new metric 2', 2, 'gauge');
const myMetric3 = new Metric('new metric 3', 3, 'gauge');
console.log(myMetric);

const mylist = new MetricsList([]);
console.log(mylist);

mylist.add(myMetric);
mylist.add(myMetric2);
console.log(mylist);

const myMetric4 = new Metric('new metrics 4', 4, 'gauge');
mylist.add(myMetric4);
console.log(mylist);
