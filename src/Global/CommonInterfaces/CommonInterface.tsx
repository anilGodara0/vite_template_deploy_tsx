/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:34:06
 * @modify date 2024-10-25 11:34:06
 * @desc This file is created where we can define the Common Interface for ts
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}