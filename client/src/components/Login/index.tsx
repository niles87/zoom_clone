import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { existingUser } from "../../Interface/user";
import AuthService from "../../utils/auth";
import { Api } from "../../API";

export const Login = () => {
  const [formData, setFormData] = useState<existingUser>({
    email: "",
    password: "",
  });

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
