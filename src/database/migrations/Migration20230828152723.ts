import { Migration } from '@mikro-orm/migrations'

export class Migration20230828152723 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table `maintainence` modify `completed` tinyint(1) not null default false;',
    )
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table `maintainence` modify `completed` tinyint(1) null;',
    )
  }
}
