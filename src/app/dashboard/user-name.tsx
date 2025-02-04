"use client";

import { useUserContext } from "../context/user";

export default function UserName() {
  const { user } = useUserContext();

  return (
    <h1 className="text-2xl font-bold m-5">{`Hello ${user?.first_name}`}</h1>
  );
};
