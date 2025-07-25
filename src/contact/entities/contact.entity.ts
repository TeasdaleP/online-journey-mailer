import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    contactId: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    contactCreated: Date;

    @Column({ type: 'text' })
    firstname: string;

    @Column({ type: 'text' })
    lastname: string;

    @Column({ type: 'text' })
    telephone: string;

    @Column({ type: 'text' })
    email: string;

    @Column({ type: 'text' })
    message: string;

    @Column({ type: 'text', nullable: true })
    notification: string;

    // @OneToOne(() => Email, { cascade: true })
    // @JoinColumn()
    // notification: Email;
}
