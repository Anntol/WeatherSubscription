import { FrequencyEnum } from 'src/enums/frequency';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Subscription {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  city: string;

  @Column({ type: 'enum', enum: FrequencyEnum, default: FrequencyEnum.DAILY })
  frequency: FrequencyEnum;

  @Column({ type: 'boolean', width: 1, nullable: false, default: false })
  confirmed: boolean;
}

export default Subscription;
