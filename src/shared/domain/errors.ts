export class ValidationError extends Error {
    fields: string[];
    
    constructor(message: string, fields?: string[]) {
        super(message);
        this.fields = fields ?? [];
    }
}