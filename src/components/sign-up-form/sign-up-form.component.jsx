import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import './sign-up-form.styles.scss';

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
// import { UserContext } from "../../context/user.context";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password != confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      // setCurrentUser(user);
      await createUserDocumentFromAuth(user, { displayName });
      setFormFields(defaultFormFields);

    } catch (e) {
      if (email.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log(e);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          onChange={handleChange}
          name="displayName"
          autoComplete="username"
          value={displayName}
        />   
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
          autoComplete="new-password"
          value={password}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
