import LoginRegisterTitle from '@/views/components/loginRegisterTitle';
import RegisterForm from './components/registerForm';
import RegisterHero from './components/registerHero';

export default function RegisterView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 pb-[5%]">
      <div className="hidden md:block">
        <RegisterHero />
      </div>
      <div className="nav-bg rounded-2xl px-5 py-16">
        <LoginRegisterTitle title={'Create an account'} />
        <RegisterForm />
      </div>
    </div>
  );
}
