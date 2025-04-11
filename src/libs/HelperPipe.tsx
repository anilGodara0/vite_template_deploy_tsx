/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:21:06
 * @modify date 2024-10-25 11:21:06
 * @desc HelperPipe which help the developer for the COmmon Logic 
 */

import ApiClient from "../Global/Apiclient";
import { ApiResponse } from "../Global/CommonInterfaces/CommonInterface";
import { Environment } from "../Global/Environment/Environment";

const UrlParamGet = (key: string): string | null => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(key);
};


const ImagePathSettter = (path = '') => {
  if (!path) {
    return "/img/login-1.png"
  }
  if (path.includes('blob')) {
    return path
  }
  if (path.includes('http') || path.includes('https')) {
    return path
  }


  return Environment.api + path

}

const AutoLoginHandler = (data: any) => {
  ApiClient.post<any>(`user/auto/login`, data).then((res: ApiResponse) => {
    return res;
  })

}
const NameReturner = (transaction: any): string => {

  if (transaction?.redeemUserFirstName) {
    return `${transaction?.redeemUserFirstName} ${transaction?.redeemUserLastName}`
  } else {
    if (transaction?.userData[0]?.username) {
      return transaction?.userData[0]?.username
    } else {
      return transaction?.userData[0]?.email
    }
  }

}

export const helper = { UrlParamGet, ImagePathSettter, AutoLoginHandler, NameReturner }
