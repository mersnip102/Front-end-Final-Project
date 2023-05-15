export interface IListMenu {
  name: string;
  roleActivated: IRoleActivated[];
}

export interface IRoleActivated {
  roleNumber: number | number[];
  routerLink: string;
}
