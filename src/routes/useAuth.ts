import { useContext, useEffect, useState } from "react";
import { AppUserContext } from "../contexts/AppUserContext";
import { getUser } from "./auth";

export function useAuth() {
  const { appUser, setAppUser } = useContext(AppUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        if (user) setAppUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { loading, appUser };
}
