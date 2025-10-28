export class Logger {
    private readonly name: string;
    constructor(name: string) {
        this.name = name;
    }

    write(tag: string, ...messages: any[]): void {
        if (tag === 'ERROR') {
            console.error(`${tag}\t${this.name}\t`, ...messages);
        } else {
            console.log(`${tag}\t${this.name}\t`, ...messages);
        }
    }

    info(...messages: any[]): void {
        this.write('INFO', ...messages);
    }

    debug(...messages: any[]): void {
        this.write('DEBUG', ...messages);
    }

    warn(...messages: any[]): void {
        this.write('WARN', ...messages);
    }

    error(...messages: any[]): void {
        this.write('ERROR', ...messages);
    }
}
