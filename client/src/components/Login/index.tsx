import React, { ChangeEvent, useRef, useState } from "react";
import { existingUser } from "../../Interface/user";
import AuthService from "../../utils/auth";
import { Api } from "../../API";
import { Input, Form, Submit, Validation } from "../Form";
import { validate } from "../../utils/validate";

export const Login = () => {
  const [formData, setFormData] = useState<existingUser>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  })
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const submitForm = async (ev: ChangeEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      const login = await Api.login(formData).then((res: Response) => {
        return res.json();
      });

      if (login) {
        AuthService.login(login.id);
        window.location.assign("/home");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    const error = {
      ...errors
    }
    switch (name) {
      case 'email':
        error.email = validEmail.test(value) ? '' : 'Email is not valid'
        break
      case 'password':
        error.password = value.length < 6 ? 'Must be longer than 6 characters' : ''
        break;
      default:
        break;
    }

    setErrors({ ...error })
  };
  console.log(formData)
  return (
    <>
      <Form onSubmit={submitForm}>
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Email*"
            onChange={handleInputChange}
            ref={emailRef}
            onMouseEnter={() => {
              if (emailRef.current) emailRef.current.focus()
            }}
          />
          <Validation vis={validate(errors.email) ? "none" : "block"}>{errors.email}</Validation>
        </div>
        <div>
          <Input
            type="password"
            name="password"
            placeholder="Password*"
            onChange={handleInputChange}
            ref={passwordRef}
            onMouseEnter={() => {
              if (passwordRef.current) passwordRef.current.focus()
            }}
          />
          <Validation vis={validate(errors.password) ? "none" : "block"}>{errors.password}</Validation>
        </div>
        <Submit type="submit">Login</Submit>
      </Form>
    </>
  );
};
