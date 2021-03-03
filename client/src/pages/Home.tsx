import React, { Fragment, useEffect, useState } from "react";
import { Create } from "../components/Create";
// import { loggedIn } from "../../Interface/user";
import { Api } from "../API";
import Auth from "../utils/auth";
import { Logout } from "../components/Logout";
import { Navbar, NavItem, Container } from "../components/Layout";

export const Home = () => {
  const [user, setUser] = useState<any>();
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    setUser(Auth.getId());
  }, []);

  useEffect(() => {
    if (user) {
      fetchFriends(user)
    }
  }, [user]);

  const fetchFriends = async (id: string) => {
    let arr = []
    try {
      const friendsList = await Api.getFriends(id).then(async (res: Response) => {
        const data = await res.json();
        return data as any[];
      });
      if (friendsList.length > 0) {
        arr = friendsList;
      }
    } catch (err) {
      throw err;
    } finally {
      setFriends(arr)
    }

  };

  if (user) {
    return (
      <Fragment>
        <Navbar>
          <NavItem>
            <h2>MOOZ CL</h2>
          </NavItem>
          <NavItem>
            <Create />
          </NavItem>
          <NavItem>
            <Logout userId={user} />
          </NavItem>
        </Navbar>
        <Container>
          <p>Friends online</p>
          <ul>
            {friends.length > 0 ? (
              friends.map((friend) => <li key={friend}>{friend}</li>)
            ) : (
                <li>No friends online</li>
              )}
          </ul>
        </Container>
      </Fragment>
    );
  } else {
    return <div>You need to be logged in for this</div>;
  }
};
