export interface IDatabaseModel {
    collections?: Array<string>;
    databaseName?: string;
}

export interface ICollectionData {
    databaseName?: string;
    collectionName?: string;
    columns?: Array<string>;
    data?: Array<Array<IKeyValue>>;
}

export interface IAlgorithmNames {
    algorithmNames: Set<string>;
}

export interface IKeyValue {
    key?: string;
    value?: any;
}