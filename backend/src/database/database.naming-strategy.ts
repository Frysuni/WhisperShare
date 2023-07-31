import type { NamingStrategyInterface } from 'typeorm';
import { DefaultNamingStrategy } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class NamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  public override tableName(className: string, customName: string): string {
    return customName || `${snakeCase(className).replace('-entity', '')}s`;
  }

  public override columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase([...embeddedPrefixes, ''].join('_')) + (customName || snakeCase(propertyName));
  }

  public override relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  public override joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(`${relationName}_${referencedColumnName}`);
  }

  public override joinTableName(firstTableName: string, secondTableName: string, firstPropertyName: string): string {
    return snakeCase(`${firstTableName}_${firstPropertyName.replace(/\./gi, '_')}`);
  }

  public override joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
    return snakeCase(`${tableName.split('_').pop()?.split('_').shift()}_${columnName || propertyName}`);
  }

  public override eagerJoinRelationAlias(alias: string, propertyPath: string): string {
    return `${alias}__${propertyPath.replace('.', '_')}`;
  }
}
