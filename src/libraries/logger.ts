export class Logger {
    private readonly name: string;
    constructor(name: string) {
        this.name = name;
    }

    write(tag: string, ...messages: string[]): void {
        if(tag === 'ERROR') {
            console.error(`${tag}\t${this.name}\t`, messages);
        } else {
            console.log(`${tag}\t${this.name}\t`, messages);
        }
    }

    info(...messages: string[]): void {
        this.write("INFO", ...messages);
    }

    debug(...messages: string[]): void {
        this.write("DEBUG", ...messages);
    }

    warn(...messages: string[]): void {
        this.write("WARN", ...messages);
    }

    error(...messages: string[]): void {
        this.write("ERROR", ...messages);
    }
}
