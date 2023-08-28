import { Migration } from '@mikro-orm/migrations';

export class Migration20230828204027 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `maintainence` add `previous_id` int null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `maintainence` drop `previous_id`;');
  }

}
