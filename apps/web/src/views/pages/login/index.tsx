import LoginHero from './components/loginHero';
import LoginHeader from './components/loginHeader';
import LoginForm from './components/login-form';

export default function LoginView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] lg:grid-cols-2 py-[1%]">
      <LoginHero />
      <div className="py-5 sm:py-10 lg:py-24">
        <div className="hidden md:block">
          <LoginHeader />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
