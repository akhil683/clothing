import { useState } from "react";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const [ error, setError ] = useState(false);

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response  = await signInAuthUserWithEmailAndPassword(email, password);
      setFormFields(defaultFormFields)
      console.log(response);
      setError(false);
    } catch (e) {
      if(e.code === 'auth/invalid-login-credentials') {
        setError(true);
      }
      console.log(e);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        {error && (
          <p className="error-message">Incorrect email or password</p>
        )}
        <FormInput
          label="Email"
          type="text"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button 
            onClick={signInWithGoogle} 
            buttonType="google"
            type="button"
          >
             GOOGLE SIGN IN
          </Button>
        </div>
        
      </form>
    </div>
  );
};
export default SignInForm;
