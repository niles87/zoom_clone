import React, { Fragment, useEffect, useState } from "react";
import { Create } from "../components/Create";
import { user } from "../Interface/user";
import { Api } from "../API";
import Auth from "../utils/auth";
import { Logout } from "../components/Logout";
import { Navbar, NavItem, Logo, Toast } from "../components/Layout";
import {
  FlexChild,
  FlexContainer,
  UserInfoContainer,
  FriendsList
} from "../components/HomeLayout";
import { Input } from "../components/Form";

export const Home = () => {
  const [user, setUser] = useState<user>();
  const [friends, setFriends] = useState<any[]>([]);
  const [toast, setToast] = useState<boolean>(false)

  useEffect(() => {
    getUser(Auth.getId())
  }, []);

  useEffect(() => {
    if (user) {
      fetchFriends(user._id)
    }
  }, [user]);

  useEffect(() => {
    window.addEventListener('beforeunload', showToast)
    window.addEventListener('unload', closeBrowser)
    return () => {
      window.removeEventListener('beforeunload', showToast)
      window.removeEventListener('unload', closeBrowser)
    }
  })

  const showToast = () => {
    setToast(true)
  }

  const closeBrowser = async (ev: Event) => {
    console.log(ev)
    if (user) {
      const logout = await Api.logout(user._id)
      console.log(logout.ok)
    }
  }

  const getUser = async (id: string) => {
    let userInfo;
    try {
      const userData = await Api.getUserInfo(id).then(async (res: Response) => {
        const data = await res.json()
        return data
      })
      if (userData) userInfo = userData;
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
        <Toast dis={toast}>Good Bye</Toast>
        <FlexContainer>
          <FlexChild>
            <Create />
          </FlexChild>
          <FlexChild>
            <p>Friends online</p>
            <FriendsList>
              {friends.length > 0 ? (
                friends.map((friend) => <li key={friend}>{friend}</li>)
              ) : (
                <li>No friends online</li>
              )}
            </FriendsList>
            <Input placeholder="Enter Email" />
          </FlexChild>
          <FlexChild>
            <UserInfoContainer>
              <p>username: {user.username}</p>
              <p>email: {user.email}</p>

            </UserInfoContainer>
          </FlexChild>
        </FlexContainer>
      </Fragment>
    );
  } else {
    return <div>You need to be logged in for this</div>;
  }
};
