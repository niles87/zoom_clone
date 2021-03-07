import React, { Fragment, useEffect, useState } from "react";
import { Create } from "../components/Create";
import { user } from "../Interface/user";
import { Api } from "../API";
import Auth from "../utils/auth";
import { Logout } from "../components/Logout";
import { Navbar, NavItem, Logo } from "../components/Layout";
import { FlexChild, FlexContainer, UserInfoContainer } from "../components/HomeLayout";

export const Home = () => {
  const [user, setUser] = useState<user>();
  const [friends, setFriends] = useState<any[]>([]);

  useEffect(() => {
    getUser(Auth.getId())
  }, []);

  useEffect(() => {
    if (user) {
      fetchFriends(user._id)
    }
  }, [user]);

  const getUser = async (id: string) => {
    let userInfo
    try {
      const userData = await Api.getUserInfo(id).then(async (res: Response) => {
        const data = await res.json()
        return data
      })
      if (userData) userInfo = userData
    } catch (error) {
      console.log(error)
    } finally {
      setUser(userInfo)
    }
  }

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
            <Logo>MOOZ CL</Logo>
          </NavItem>
          <NavItem>
            <Logout userId={user._id} />
          </NavItem>
        </Navbar>
        <FlexContainer>
          <FlexChild>
            <Create />
          </FlexChild>
          <FlexChild>
            <p>Friends online</p>
            <ul>
              {friends.length > 0 ? (
                friends.map((friend) => <li key={friend}>{friend}</li>)
              ) : (
                <li>No friends online</li>
              )}
            </ul>
          </FlexChild>
          <FlexChild>
            <UserInfoContainer>
              <p>{user.username}</p>
              <p>{user.email}</p>

            </UserInfoContainer>
          </FlexChild>
        </FlexContainer>
      </Fragment>
    );
  } else {
    return <div>You need to be logged in for this</div>;
  }
};
