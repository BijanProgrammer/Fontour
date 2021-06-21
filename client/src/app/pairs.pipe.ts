import {Pipe, PipeTransform} from '@angular/core';
import Pair from '../models/Pair';

@Pipe({
    name: 'pairs'
})
export class PairsPipe implements PipeTransform {
    public transform(input: Object, ...args: unknown[]): Pair[] {
        const pairs = [];
        for (const key in input)
            pairs.push({key, value: input[key]});

        return pairs;
    }
}
