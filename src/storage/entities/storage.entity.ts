import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('media')
export class StorageEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  originalName!: string;

  @Column()
  filename!: string;

  @Column()
  mimetype!: string;

  @Column()
  size!: number;

  @Column()
  projectName!: string;

  @Column()
  type!: 'image' | 'video';

  @Column()
  url!: string;

  @Column()
  path!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
