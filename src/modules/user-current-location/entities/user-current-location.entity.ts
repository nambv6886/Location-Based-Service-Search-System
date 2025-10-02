import { Entity, PrimaryColumn, Column, UpdateDateColumn, OneToOne, JoinColumn, Index, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('user_current_locations')
@Index('idx_location', ['location'], { spatial: true })
export class UserCurrentLocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, (user) => user, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude: number;

  @Column({ type: 'point', spatialFeatureType: 'Point', srid: 4326 })
  location: string;

  @UpdateDateColumn()
  updatedAt: Date;
}