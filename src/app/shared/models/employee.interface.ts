import { Item } from './item.interface';

export interface Employee {
  empId: string;
  todo: Item[];
  done: Item[];
}
