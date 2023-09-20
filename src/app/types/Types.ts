export type ApiResponse = {
  message: string;
};
export interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
