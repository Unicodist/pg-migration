export class RulePostModel {
    public name: string;
    constructor(name:string) {
        this.name = name
    }
}

export type RuleColumnDetail = {
    sourceColumn?:string,
    destinationColumn:string,
    sourceValue?:RuleSourceValue
}

export type RuleSourceValue = {
    type:'string' | 'number',
    value:string
}