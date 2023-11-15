import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss';

const Authentication = () => {

  return (
    <>
      <h1>Sign In Page</h1>
      <div className='auth-form-container'>
        <SignInForm />
        <SignUpForm />
      </div>
    </>
    )
}

export default Authentication;
