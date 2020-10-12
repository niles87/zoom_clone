import React, { useState } from "react";
import { Create } from "../Create";
import { user } from "../../Interface/user";

export const Home = () => {
  const [user, setUser] = useState<user | {}>({});
  return (
    <div>
      <div>
        <ul>
          <p>Friends online</p>
          <li>friends</li>
        </ul>
      </div>
      <Create />
    </div>
  );
};
