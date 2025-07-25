export interface Mailer {
    recipent: string;
    subject: string;
    template: string;
    context: any;
}