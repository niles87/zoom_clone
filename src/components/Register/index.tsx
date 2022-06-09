import React, { ChangeEvent, useRef, useState, useEffect } from "react";
import { newUser } from "../../Interface/user";
import Api from "../../API";
import { Input, Form, Submit, Validation } from "../Form";
import { validate } from "../../utils/validate";
import { Toast } from "../Layout";

export const Register = () => {
  const [formData, setFormData] = useState<newUser>({
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
    password: "",
  });
  const [toast, setToast] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const firstRef = useRef<HTMLInputElement>(null);
  const lastRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setToast(false);
    }, 2000);
  }, [toast]);

  const submitForm = async (ev: ChangeEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      // eslint-disable-next-line
      const user = await Api.signup(formData);
    } catch (error) {
      setMessage("Failed to Register");
      setToast(true);
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
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    const error = {
      ...errors,
    };
    switch (name) {
      case "firstName":
        error.firstName =
          value.length < 2 ? "Must be longer than 2 characters!" : "";
        break;
      case "lastName":
        error.lastName =
          value.length < 2 ? "Must be longer than 2 characters!" : "";
        break;
      case "username":
        error.username =
          value.length < 4 ? "Must be longer than 4 characters!" : "";
        break;
      case "email":
        error.email = validEmail.test(value) ? "" : "Email is not valid";
        break;
      case "password":
        error.password =
          value.length < 6 ? "Must be longer than 6 characters" : "";
        break;
      default:
        break;
    }

    setErrors({ ...error });
  };

  return (
    <>
      <Form onSubmit={submitForm}>
        <Toast dis={toast}>{message}</Toast>
        <div>
          <Input
            type="text"
            name="firstName"
            placeholder="First Name*"
            onChange={handleInputChange}
            ref={firstRef}
            onMouseEnter={() => {
              if (firstRef.current) firstRef.current.focus();
            }}
          />
          <Validation vis={validate(errors.firstName) ? "none" : "block"}>
            {errors.firstName}
          </Validation>
        </div>
        <div>
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name*"
            onChange={handleInputChange}
            ref={lastRef}
            onMouseEnter={() => {
              if (lastRef.current) lastRef.current.focus();
            }}
          />
          <Validation vis={validate(errors.lastName) ? "none" : "block"}>
            {errors.lastName}
          </Validation>
        </div>
        <div>
          <Input
            type="text"
            name="username"
            placeholder="Display Name*"
            onChange={handleInputChange}
            ref={usernameRef}
            onMouseEnter={() => {
              if (usernameRef.current) usernameRef.current.focus();
            }}
          />
          <Validation vis={validate(errors.username) ? "none" : "block"}>
            {errors.username}
          </Validation>
        </div>
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Email*"
            onChange={handleInputChange}
            ref={emailRef}
            onMouseEnter={() => {
              if (emailRef.current) emailRef.current.focus();
            }}
          />
          <Validation vis={validate(errors.email) ? "none" : "block"}>
            {errors.email}
          </Validation>
        </div>
        <div>
          <Input
            type="password"
            name="password"
            placeholder="Password*"
            onChange={handleInputChange}
            ref={passwordRef}
            onMouseEnter={() => {
              if (passwordRef.current) passwordRef.current.focus();
            }}
          />
          <Validation vis={validate(errors.password) ? "none" : "block"}>
            {errors.password}
          </Validation>
        </div>
        <Submit type="submit">Register</Submit>
      </Form>
    </>
  );
};
