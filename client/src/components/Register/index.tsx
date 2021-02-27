import React, { ChangeEvent, useState } from "react";
import { user } from "../../Interface/user";
import { Api } from "../../API";
import { Link } from "react-router-dom";

export const Register = (props: any) => {
  const [formData, setFormData] = useState<user>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

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
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Display Name"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already a member? <Link to="/">login</Link> here.
      </p>
    </>
  );
};
