import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Email {
    @PrimaryGeneratedColumn('uuid')
    emailId: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    sentDate: Date;

    @Column({ type: 'text' })
    recipent: string;

    @Column({ type: 'text' })
    subject: string;

    @Column({ type: 'text' })
    template: string;

    @Column({ type: 'text' })
    context: string;

    @Column({ type: 'text' })
    response: string;
}
