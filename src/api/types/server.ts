export interface MemberEula {
  regAgreementShowed: boolean;
  privacyAgreementShowed: boolean;
  logo: string;
  eulas: Eula[];
}

export interface Eula {
  id: string;
  scmId: string;
  kind: 'PRIV' | 'REG';
  title: string;
  content: string;
}
