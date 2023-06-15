import { RoleNumber } from './consts';

export const CURRENT_USER = 'currentUser';
export const SECRET_KEY = 'Student_Management_CAT@2023$';
export const listMenu = [
  {
    roleNumber: RoleNumber.student,
    permission: [
      {
        screenName: 'Hồ sơ',
        routerLink: 'profile',
        icon: 'profile',
      },
      {
        screenName: 'Sự kiện',
        routerLink: 'listEvent',
        icon: 'schedule',
      },
      {
        screenName: 'Liên hệ tư vấn',
        routerLink: 'chat-students',
        icon: 'phone',
      },
      // {
      //   screenName: '',  card status
      //   routerLink: ''
      // },
    ],
    defaultScreen: '/pages/profile',
  },
  {
    roleNumber: RoleNumber.accountant,
    permission: [
      {
        screenName: 'Xác minh phí',
        routerLink: 'feeVerification',
        icon: 'dollar-circle',
      },
      {
        screenName: 'Quản lý các loại phí',
        routerLink: 'managementFee',
        icon: 'file-text',
      },
      {
        screenName: 'Yêu cầu xác minh phí',
        routerLink: 'requestFeeVerify',
        icon: 'check-circle',
      },
      {
        //aplication
        screenName: 'Hồ sơ',
        routerLink: 'profile-account',
        icon: 'profile',
      },
    ],
    defaultScreen: '/pages/feeVerification',
  },
  {
    roleNumber: RoleNumber.admissions,
    permission: [
      {
        screenName: 'Dashboard',
        routerLink: 'dashboard',
        icon: 'dashboard',
      },
      {
        screenName: 'Danh sách sinh viên',
        routerLink: 'listStudent',
        icon: 'unordered-list',
      },
      {
        screenName: 'Sự kiện',
        routerLink: 'manage-event-list',
        icon: 'schedule',
      },
      {
        //aplication
        screenName: 'Hồ sơ',
        routerLink: 'profile-account',
        icon: 'profile',
      },
      {
        screenName: 'Email',
        routerLink: 'email/box-email/inbox',
        icon: 'mail',
      },
      {
        screenName: 'Tin nhắn',
        routerLink: 'chat-admissions',
        icon: 'wechat',
      },
      {
        type: 'menu',
        screenName: 'Tạo tài khoản',
        routerLink: 'createAccount',
        icon: 'user-add',
      },
    ],
    defaultScreen: '/pages/dashboard',
  },
  {
    roleNumber: RoleNumber.admissionsManager,
    permission: [
      {
        screenName: 'Dashboard',
        routerLink: 'dashboard',
        icon: 'dashboard',
      },
      {
        screenName: 'Danh sách sinh viên',
        routerLink: 'listStudent',
        icon: 'unordered-list',
      },
      {
        screenName: 'Danh sách admission',
        routerLink: 'manage-admission',
        icon: 'unordered-list',
      },
      {
        screenName: 'Tạo Sự kiện',
        routerLink: 'create-event',
        icon: 'appstore',
      },
      {
        screenName: 'Sự kiện',
        routerLink: 'manage-event-list',
        icon: 'schedule',
      },
      {
        screenName: 'Hồ sơ',
        routerLink: 'profile-account',
        icon: 'profile',
      },
      {
        screenName: 'Email',
        routerLink: 'email/box-email/inbox',
        icon: 'mail',
      },
      // {
      //   screenName: 'Tin nhắn',
      //   routerLink: 'chat-admissions',
      //   icon: 'wechat',
      // },
      // {
      //   screenName: 'Tạo tài khoản',
      //   routerLink: 'createAccount',
      //   icon: 'user-add',
      // },
    ],
    defaultScreen: '/pages/dashboard',
  },
  {
    roleNumber: RoleNumber.headOfAdmissions,
    permission: [
      {
        screenName: 'Dashboard',
        routerLink: 'dashboard',
        icon: 'dashboard',
      },
      {
        screenName: 'Danh sách sinh viên',
        routerLink: 'listStudent',
        icon: 'unordered-list',
      },
      {
        screenName: 'Danh sách admission',
        routerLink: 'manage-admission',
        icon: 'unordered-list',
      },
      {
        screenName: 'Tạo Sự kiện',
        routerLink: 'create-event',
        icon: 'appstore',
      },
      {
        screenName: 'Sự kiện',
        routerLink: 'manage-event-list',
        icon: 'schedule',
      },
      {
        screenName: 'Hồ sơ',
        routerLink: 'profile-account',
        icon: 'profile',
      },
      {
        screenName: 'Email',
        routerLink: 'email/box-email/inbox',
        icon: 'mail',
      },
      // {
      //   screenName: 'Tin nhắn',
      //   routerLink: 'chat-admissions',
      //   icon: 'wechat',
      // },
      // {
      //   screenName: 'Tạo tài khoản',
      //   routerLink: 'createAccount',
      //   icon: 'user-add',
      // },
    ],
    defaultScreen: '/pages/dashboard',
  },
];
