import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Citie extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public descricao: String;

  @column()
  public uf: String;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
