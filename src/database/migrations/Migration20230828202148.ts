import { Migration } from '@mikro-orm/migrations';

export class Migration20230828202148 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `maintainence` add `interval` int not null default 0;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `maintainence` drop `interval`;');
  }

}
