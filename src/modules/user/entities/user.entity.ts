import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RolesEntity } from './index.entity';
import { BaseEntity } from 'src/modules/base/base.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  constructor(partial?: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryColumn({ name: 'id_user' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ name: 'id_role' })
  idRole: number;

  @ManyToOne(() => RolesEntity, (role) => role.id)
  @JoinColumn({ name: 'id_role' })
  role: RolesEntity;
}
