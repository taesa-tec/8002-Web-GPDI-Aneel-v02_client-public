export abstract class LogFactory<T> {

    statusAnterior: string;
    statusNovo: string;

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

    protected constructor(
        protected data: T,
        protected prevData?: T) {
        this.statusNovo = this.getStatusNovo();
        this.statusAnterior = this.prevData ? this.getStatusAnterior() : '';
    }

    abstract getStatus(data: T): string;

    getStatusAnterior(): string {
        return this.getStatus(this.prevData);
    }

    getStatusNovo(): string {
        return this.getStatus(this.data);
    }

}
