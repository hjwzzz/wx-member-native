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
