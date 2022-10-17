import { GetMemberEulaRequestRes } from '@/typings/api/member';

export type Protocol = GetMemberEulaRequestRes | Record<string, never>;

export interface WxMiniAuthInfo {
  modalConfig: {
    show: boolean;
  };
}
