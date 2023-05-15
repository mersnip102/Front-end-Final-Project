import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CURRENT_USER, SECRET_KEY } from '../consts/guard.const';
import { IUserInfor } from '../models/auth.model';
@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  constructor() { }
  encryptJSONItem(value: any) {
    return value ? CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString() : '';
  }

  decryptItem(token: any) {
    try {
      const bytes = CryptoJS.AES.decrypt(token, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (err) {
      return '';
    }
  }

  setLocalStorageItem(key: string, value: any) {
    if (value) {
      localStorage.setItem(key, this.encryptJSONItem(value));
    }
  }

  getLocalStorageItemAsJSON = (key: string) => {
    const localStorageItem = localStorage.getItem(key);
    if (localStorageItem && localStorageItem.length > 0) {
      const decryptContent = this.decryptItem(localStorageItem);
      const jsonContentItem = JSON.parse(decryptContent);
      if (jsonContentItem && Object.keys(jsonContentItem).length > 0) {
        return jsonContentItem;
      }
    }
    return {};
  };

  getUserLocalStore(): IUserInfor {
    return this.getLocalStorageItemAsJSON(CURRENT_USER);
  }
}
