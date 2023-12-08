// Generated by https://quicktype.io

/**
 *  Se utiliza una interfaces y no una clase porque no vamos a 
 *  manipular la data solo queremos typarla  
 */

export interface PokeResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  Result[];
}

export interface Result {
    name: string;
    url:  string;
}
