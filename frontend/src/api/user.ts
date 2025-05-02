import { IUser } from "../types/user";
// import { mockUser } from "../mocks/user";

export const fetchCurrentUser = async (): Promise<IUser> => {
  const res = await fetch("http://localhost:8080/users/me", {
    credentials: "include",
  });

  if (res.status === 401) throw new Error("Unauthorized");
  if (!res.ok) throw new Error(`Error: ${res.status}`);

  const data: { user: IUser } = await res.json();
  console.log(data.user);
  return data.user;
};

export const logoutUser = async () => {
  try {
    const res = await fetch("http://localhost:8080/users/logout", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    if (res.ok) {
      console.log(data.message);
      return data;
    } else {
      console.error("Error logging out:", data);
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
};
