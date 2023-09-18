'use client';

import { LoginModal } from '../components/LoginModal/LoginModal';
import { RegisterModal } from '../components/RegisterModal/RegisterModal';

const ModalsProvider = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
    </>
  );
};

export default ModalsProvider;
