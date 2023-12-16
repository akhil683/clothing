import { useState } from "react";
import {
  // signInWithGooglePopup,
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
  // const { setCurrentUser } = useContext(UserContext);

  // const signInWithGoogle = async () => {
  //   await signInWithGooglePopup();
  // }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user }  = await signInAuthUserWithEmailAndPassword(email, password);
      setFormFields(defaultFormFields)
      setError(false);
    } catch (e) {
      if(e.code === 'auth/invalid-login-credentials') {
        setError(true);
    }
      alert("error occured");  
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
          autoComplete="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          autoComplete="current-password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          {/* <Button 
            onClick={signInWithGoogle} 
            buttonType="google"
            type="button"
          >
             GOOGLE SIGN IN
          </Button> */}
        </div>
        
      </form>
    </div>
  );
};
export default SignInForm;
