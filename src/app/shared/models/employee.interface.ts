/*
 * Author: Alex Haefner
 * Date: 11.10.2021
 * Description: Interface for employee
 * Sources:
 */

import { Item } from './item.interface';

export interface Employee {
  empId: string;
  todo: Item[];
  done: Item[];
  current: Item[];
}
