export interface INotifyModel{
  title?: string | undefined;
  text?: string;
  icon?: string | undefined;
  showCancelButton?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  allowOutsideClick?: boolean;
  html?: string;
  imageUrl?: string;
}
