import React from "react";
import { useGetUsers } from "../hooks/useGetUsers";
import { useEditUser } from "../hooks/useEditUser";
import { User } from "../interface";

export const Home = () => {
  const newUserInfo = {
    name: "hello",
    age: "12",
    address: "world",
  };
  const { data } = useGetUsers();
  const { mutate } = useEditUser();
  const users: User[] = data?.data;
  const handleClick = () => {
    mutate(newUserInfo);
  };
  return (
    <>
      <div>
        {users?.map((user: User) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
      <button onClick={handleClick}>Click me!</button>
    </>
  );
};
