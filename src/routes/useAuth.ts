import { useEffect, useState } from "react";
import { useAppUser } from "../contexts/AppUserContext";
import { getUser } from "./auth";

export function useAuth() {
  const { appUser, setAppUser } = useAppUser();
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
