import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryColumn()
    userId: string;

    @Column() //possibilité de rajouter des params (unique etc)
    username: string;

    @Column()
    password: string;
}