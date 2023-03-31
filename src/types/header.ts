export enum LoginType {
  GitHub = "github",
}
export type LoginTypeItem = {
  type: LoginType;
  text: string;
  link: string;
  icon: React.ReactNode;
};
