import VerificationContainer from '@/views/components/verificationContainer';
import VeritificationButton from './components/vertificationButton';
import ResendEmailForm from './components/resendEmailForm';

export default function VerificationView() {
  return (
    <VerificationContainer>
      <h1 className="text-xl font-bold">
        Woowee! Please resend your verify email
      </h1>
      <p className="my-5">
        Please input your email address that associate with Klambie account to
        verify. Once it's done you will be able to start shopping!
      </p>
      <ResendEmailForm />
    </VerificationContainer>
  );
}
