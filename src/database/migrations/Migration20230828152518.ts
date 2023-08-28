import { Migration } from '@mikro-orm/migrations'

export class Migration20230828152518 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `maintainence` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `previous_date` datetime null, `next_date` datetime not null, `completed` tinyint(1) null, `created_date` datetime not null default now(), `updated_date` datetime not null default now()) default character set utf8mb4 engine = InnoDB;',
    )
  }
}
