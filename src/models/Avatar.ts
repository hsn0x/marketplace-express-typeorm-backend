import { Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Avatar {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    version: string

    @Column()
    signature: string

    @Column()
    width: string

    @Column()
    height: string

    @Column()
    format: string

    @Column()
    resource_type: string

    @Column()
    created_at: string

    @Column()
    bytes: string

    @Column()
    type: string

    @Column()
    url: string

    @Column()
    secure_url: string

    @Column()
    avatarable: string
}
