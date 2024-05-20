import ClientOnly from '../components/ClientOnly';
import { ResetPasswordForm } from '../components/ResetPasswordForm';

export default async function RecoverPassword() {
  return (
    <ClientOnly>
      <div className='h-[98vh] flex items-center justify-center'>
        <ResetPasswordForm />
      </div>
    </ClientOnly>
  );
}
