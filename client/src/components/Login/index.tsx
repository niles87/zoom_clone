import React, { ChangeEvent, useState } from "react";
import { existingUser } from "../../Interface/user";
import Api from "../../API/API";
import { Link } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState<existingUser>({
    email: "",
    password: "",
  });

  const submitForm = (ev: ChangeEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log(formData);
    try {
      const login = Api.login(formData);
      console.log(login);
    } catch (error) {
      console.error(error);
    }
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
        <button type="submit">Login</button>
      </form>
      <p>
        New to the site? Register <Link to="/register">here</Link>.
      </p>
    </>
  );
};
