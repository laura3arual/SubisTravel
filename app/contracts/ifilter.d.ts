interface IFilter {
    page: number;
    minValue: number;
    maxValue: number;
    providers: Array<number>;
    name: string;
    clasifications: Array<number>;
    types: Array<number>;
}