import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryColumn()
    userId: string;

    @Column()
    username: string;

    @Column()
    password: string;
}