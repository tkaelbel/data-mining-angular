export interface IDatabaseModel {
    collections?: Array<string>;
    databaseName?: string;
}

export interface ICollectionData extends IGeneralCollectionData {
    columns?: Array<string>;
    data?: Array<Array<IKeyValue>>;
}

export interface IGeneralCollectionData {
    databaseName?: string;
    collectionName?: string;
    columnName?: string;
}

export interface IAlgorithmNames {
    algorithmNames: Set<string>;
}

export interface IAlgorithm extends IGeneralCollectionData {
    name: Algorithms,
    properties: any
}

export enum Algorithms {
    Apriori = "apriori",
    Knearest = "knearest",
    Kmeans = "kmeans"
}

export interface IKeyValue {
    key?: string;
    value?: any;
}