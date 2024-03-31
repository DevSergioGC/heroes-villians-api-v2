import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from './index.entity';
import { BaseEntity } from 'src/modules/base/base.entity';

@Entity({ name: 'roles' })
export class RolesEntity extends BaseEntity {
  @PrimaryColumn({ name: 'id_role' })
  id: number;

  @Column()
  description: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
