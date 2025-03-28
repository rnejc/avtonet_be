import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('brands') // Table name
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}