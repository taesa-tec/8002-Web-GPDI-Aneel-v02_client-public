export abstract class LogFactory<T> {

    protected _data: T;
    protected prevData: T;


    protected get data(): T {
        return this._data;
    }

    protected set data(value: T) {
        if (this._data) {
            this.prevData = this._data;
        }
        this._data = value;
    }


    static dataToHtml(label: string, value: any, headerTag = 'strong', bodyTag = 'p'): string {
        return `<${headerTag}>${label}</${headerTag}>
                <${bodyTag}>${String(value)}</${bodyTag}>`;
    }

    static objectToHtml(data): string {
        return Object.keys(data).map(k => {
            if (data[k]) {
                return LogFactory.dataToHtml(k, data[k]);
            }
        }).join('\n');
    }


    constructor(data?: T, prevData?: T) {
        this.data = data;
        this.prevData = prevData;
    }

    update(data: T) {
        console.log('update');
        this.data = data;
    }

    abstract getStatus(data: T): string;

    get statusAnterior(): string {
        if (this.prevData) {
            return this.getStatus(this.prevData);
        }
        return null;
    }

    get statusNovo(): string {
        if (this.data) {
            return this.getStatus(this.data);
        }
        return '';
    }

}
