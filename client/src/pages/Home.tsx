import React, { useEffect, useState } from "react";
import { Create } from "../components/Create";
// import { loggedIn } from "../../Interface/user";
import { Api } from "../API";
import Auth from "../utils/auth";
import { Logout } from "../components/Logout";

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
      console.log(friendsList);
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
      <div>
        <Logout userId={user.id} />
        <div>
          <ul>
            <p>Friends online</p>
            {friends.length > 0 ? (
              friends.map((friend) => <li key={friend}>{friend}</li>)
            ) : (
                <li>No friends online</li>
              )}
          </ul>
        </div>
        <Create />
      </div>
    );
  } else {
    return <div>You need to be logged in for this</div>;
  }
};
