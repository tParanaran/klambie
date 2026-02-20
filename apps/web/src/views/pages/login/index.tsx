import LoginHero from './components/loginHero';
import LoginForm from './components/loginForm';
import LoginRegisterTitle from '@/views/components/loginRegisterTitle';

export default function LoginView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] lg:grid-cols-2 pt-[1%] pb-[5%]">
      <LoginHero />
      <div className="py-5 sm:py-10 lg:py-24">
        <div className="hidden md:block">
          <LoginRegisterTitle title={'Get Login'} />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
