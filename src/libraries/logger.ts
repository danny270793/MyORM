export class Logger {
    private readonly name: string;
    constructor(name: string) {
        this.name = name;
    }

    write(tag: string, message: string): void {
        console.log(`${tag}\t${this.name}\t${message}`);
    }

    info(message: string): void {
        this.write("INFO", message);
    }

    debug(message: string): void {
        this.write("DEBUG", message);
    }

    warn(message: string): void {
        this.write("WARN", message);
    }

    error(message: string): void {
        this.write("ERROR", message);
    }
}