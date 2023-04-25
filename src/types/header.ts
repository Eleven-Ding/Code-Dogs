export enum LoginType {
  GitHub = "github",
  QQ = "qq",
  LogOut = 'logout'
}
export type LoginTypeItem = {
  type: LoginType;
  text: string;
  link: string;
  icon: string;
  color:string;
};
