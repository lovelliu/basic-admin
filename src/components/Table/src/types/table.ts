import type { ColumnProps } from 'ant-design-vue/lib/table/interface';

export declare type SortOrder = 'ascend' | 'descend';

export interface SorterResult {
  column: ColumnProps;
  order: SortOrder;
  field: string;
  columnKey: string;
}
