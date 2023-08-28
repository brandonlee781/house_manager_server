import { Migration } from '@mikro-orm/migrations'

export class Migration20230828204917 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table `maintainence` add `previous_id_id` int unsigned null;',
    )
    this.addSql(
      'alter table `maintainence` add constraint `maintainence_previous_id_id_foreign` foreign key (`previous_id_id`) references `maintainence` (`id`) on update cascade on delete set null;',
    )
    this.addSql('alter table `maintainence` drop `previous_id`;')
    this.addSql(
      'alter table `maintainence` add unique `maintainence_previous_id_id_unique`(`previous_id_id`);',
    )
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table `maintainence` drop foreign key `maintainence_previous_id_id_foreign`;',
    )

    this.addSql('alter table `maintainence` add `previous_id` int null;')
    this.addSql(
      'alter table `maintainence` drop index `maintainence_previous_id_id_unique`;',
    )
    this.addSql('alter table `maintainence` drop `previous_id_id`;')
  }
}
