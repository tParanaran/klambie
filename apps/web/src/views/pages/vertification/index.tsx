import VerificationContainer from '@/views/components/verificationContainer';
import VeritificationButton from './components/vertificationButton';

export default function VerificationView(prop: { token: string }) {
  return (
    <VerificationContainer>
      <p className="my-10">
        Please confirm that you want to use this as your Klambie account email
        address. Once it's done you will be able to start shopping!
      </p>
      <VeritificationButton token={prop.token} />
    </VerificationContainer>
  );
}
