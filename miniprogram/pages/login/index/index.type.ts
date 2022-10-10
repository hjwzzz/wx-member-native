import { GetMemberEulaRequestRes } from '../../../typings/api/member';

export type LoginIndexPageData = {
  logo: string;
  protocol: GetMemberEulaRequestRes | Record<string, never>;

  wxMiniAuthInfo: {
    modalConfig: {
      show: boolean;
    };
  };
};
