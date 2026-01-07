import { useEffect } from "react";
import { supabase } from "./supabaseClient";

const USER_ID_KEY = "auth-user-id";

// Listens to Supabase auth state changes and keeps
// localStorage.auth-user-id in sync with the current session.
export default function AuthListener() {
  useEffect(() => {
    async function syncInitialSession() {
      const { data } = await supabase.auth.getSession();
      const userId = data?.session?.user?.id;

      if (userId) {
        window.localStorage.setItem(USER_ID_KEY, userId);
      } else {
        window.localStorage.removeItem(USER_ID_KEY);
      }
    }

    syncInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const userId = session?.user?.id;

      if (userId) {
        window.localStorage.setItem(USER_ID_KEY, userId);
      } else {
        window.localStorage.removeItem(USER_ID_KEY);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // This component does not render anything in the UI.
  return null;
}




