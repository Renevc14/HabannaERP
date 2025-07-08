declare module 'csv-parser' {
    import { Stream } from 'stream';
    interface Options {
        separator?: string;
        newline?: string;
        quote?: string;
        escape?: string;
        headers?: string[] | boolean;
        strict?: boolean;
    }

    function csvParser(options?: Options): Stream;

    export = csvParser;
}
