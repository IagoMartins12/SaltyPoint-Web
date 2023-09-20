import { ForgetPasswordStore } from '../hooks/modals/useForgetPassword';
import { LoginModalStore } from '../hooks/modals/useLoginModal';
import { PrivacyTermStore } from '../hooks/modals/usePrivacyTerms';
import { RegisterModalStore } from '../hooks/modals/useRegisterModal';
import { TalkToUsStore } from '../hooks/modals/useTalkToUs';

export type ApiResponse = {
  message: string;
};

export type ModalsStore =
  | LoginModalStore
  | TalkToUsStore
  | PrivacyTermStore
  | ForgetPasswordStore
  | RegisterModalStore;
