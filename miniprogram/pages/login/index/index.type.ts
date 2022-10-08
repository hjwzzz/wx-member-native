import { GetMemberEulaRequestRes } from '../../../typings/api/member';

export type LoginIndexPageData = {
  logo: string;
  protocol: GetMemberEulaRequestRes | Record<string, never>;
};

export type LoginIndexPageCustom = {
  getLogo: () => void;
  getMemberEula: () => void;
};
