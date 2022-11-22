export interface IMemberEula {
  regAgreementShowed: boolean;
  privacyAgreementShowed: boolean;
  logo: string;
  eulas: IEula[];
}

export interface IEula {
  id: string;
  scmId: string;
  kind: 'PRIV' | 'REG';
  title: string;
  content: string;
}

export interface IPrivateFieldItem {
  code: string;
  codeName: string;
  show: string;
  update: string;
}

export interface IProfessionCatgoryItem {
  id: string;
  seq: number;
  name: string;
  professionList?: IProfessionItem[];
}

export interface IProfessionItem {
  id: string;
  seq: number;
  name: string;
}

export enum IInfoField {
  nickName = 'PRIVATE_FIELD_NICKNAME',
  avatar = 'PRIVATE_FIELD_AVATAR',
  Phone = 'PRIVATE_FIELD_PHONE',
  Name = 'PRIVATE_FIELD_NAME',
  Sex = 'PRIVATE_FIELD_SEX',
  BirthDay = 'PRIVATE_FIELD_BIRTH',
  Mday = 'PRIVATE_FIELD_MDAY',
  Store = 'PRIVATE_FIELD_BELONG_STORE',
  Seller = 'PRIVATE_FIELD_BELONG_SELLER',
  Profession = 'PRIVATE_FIELD_PROFESSION',
  Email = 'PRIVATE_FIELD_EMAIL',
  Location = 'PRIVATE_FIELD_LOCATION',
  CredNo = 'PRIVATE_FIELD_CRED_NO',
  Education = 'PRIVATE_FIELD_EDUCATION',
}
export enum IRegistField {
  nickName = 'REGIST_REQUIRED_NICKNAME',
  avatar = 'REGIST_REQUIRED_AVATAR',
  Phone = 'REGIST_REQUIRED_PHONE',
  Name = 'REGIST_REQUIRED_NAME',
  Sex = 'REGIST_REQUIRED_SEX',
  BirthDay = 'REGIST_REQUIRED_BIRTH',
  Mday = 'REGIST_REQUIRED_MDAY',
  Store = 'REGIST_REQUIRED_BELONG_STORE',
  Seller = 'REGIST_REQUIRED_BELONG_SELLER',
  Profession = 'REGIST_REQUIRED_PROFESSION',
  Email = 'REGIST_REQUIRED_EMAIL',
  Location = 'REGIST_REQUIRED_LOCATION',
  CredNo = 'REGIST_REQUIRED_CRED_NO',
  Education = 'REGIST_REQUIRED_EDUCATION',
}
