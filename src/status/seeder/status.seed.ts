import { Seeder, Factory } from 'typeorm-seed-data';
import { Connection, DataSource } from 'typeorm';
import { Status } from '../database/status.entity';

export class StatusSeed implements Seeder {
  public async run(factory: Factory, dataSource: DataSource) {
    const data = [
      {
        name: 'Active',
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
      },
      {
        name: 'Inactive',
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
      },
    ];

    for (var i = 0; i < data.length; i++) {
      const statusExist = await Status.findOne({
        where: { name: data[i].name },
      });
      if (!statusExist) {
        await dataSource
          .createQueryBuilder()
          .insert()
          .into(Status)
          .values(data[i])
          .execute();
      } else {
        statusExist.name = data[i].name;
        statusExist.updated_at = new Date(Date.now());
        await dataSource
          .createQueryBuilder()
          .update(Status)
          .set(statusExist)
          .where('id = :id', { id: statusExist.id })
          .execute();
      }
    }
  }
}
