import React, { ChangeEvent, useRef, useState } from "react";
import { user } from "../../Interface/user";
import { Api } from "../../API";
import { Input, Form, Submit, Validation } from "../Form";

export const Register = (props: any) => {
  const [formData, setFormData] = useState<user>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  })
  const firstRef = useRef<HTMLInputElement>(null)
  const lastRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const submitForm = async (ev: ChangeEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log(formData);
    try {
      const user = await Api.signup(formData);
      console.log(user);
    } catch (error) {
      console.error(error);
    }
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    });
  };

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    switch (name) {
      case 'firstName':
        errors.firstName = value.length < 2 ? 'Must be longer than 2 characters!' : ''
        break;
      case 'lastName':
        errors.lastName = value.length < 2 ? 'Must be longer than 2 characters!' : ''
        break
      case 'username':
        errors.username = value.length < 4 ? 'Must be longer than 4 characters!' : ''
        break
      case 'email':
        errors.email = validEmail.test(value) ? '' : 'Email is not valid'
        break
      case 'password':
        errors.password = value.length < 6 ? 'Must be longer than 6 characters' : ''
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Form onSubmit={submitForm}>
        <div>
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleInputChange}
            ref={firstRef}
            onMouseEnter={() => {
              if (firstRef.current) firstRef.current.focus()
            }}
          />
        </div>
        <div>
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleInputChange}
            ref={lastRef}
            onMouseEnter={() => {
              if (lastRef.current) lastRef.current.focus()
            }}
          />
        </div>
        <div>
          <Input
            type="text"
            name="username"
            placeholder="Display Name"
            onChange={handleInputChange}
            ref={usernameRef}
            onMouseEnter={() => {
              if (usernameRef.current) usernameRef.current.focus()
            }}
          />
        </div>
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            ref={emailRef}
            onMouseEnter={() => {
              if (emailRef.current) emailRef.current.focus()
            }}
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
            ref={passwordRef}
            onMouseEnter={() => {
              if (passwordRef.current) passwordRef.current.focus()
            }}
          />
        </div>
        <Submit type="submit">Register</Submit>
      </Form>
    </>
  );
};
