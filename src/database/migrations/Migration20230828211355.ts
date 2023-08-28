import { Migration } from '@mikro-orm/migrations';

export class Migration20230828211355 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `maintainence` add `deleted_date` datetime null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `maintainence` drop `deleted_date`;');
  }

}
