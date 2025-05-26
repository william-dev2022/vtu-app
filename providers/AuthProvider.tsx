import { API_URL, USERI_TOKEN_KEY } from "@/constants";
import {
  getStorageItemAsync,
  setStorageItemAsync,
} from "@/helpers/secureStorage";
import { User } from "@/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { store } from "expo-router/build/global-state/router-store";
import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type AuthContextType = {
  signIn: ({ token, user }: { token: string; user: User }) => void;
  updateUserPinStatus: () => void;
  signOut: () => void;
  token: MutableRefObject<string | null> | null;
  isLoading: boolean;
  user: User | null;
};

export const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  token: null,
  isLoading: true,
  user: null,
  updateUserPinStatus: () => null,
});

export default function AuthProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const tokenRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadToken = async (): Promise<void> => {
      console.log("Loading Token");
      try {
        const storedToken = await getStorageItemAsync(USERI_TOKEN_KEY);

        if (!storedToken) {
          setIsLoading(false);
          setUser(null);
          return;
        }
        tokenRef.current = storedToken;

        // Try to validate the token and fetch user
        const response = await axios.get(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        console.log(response);

        if (response.data) {
          const userData = response.data as User;
          tokenRef.current = storedToken;
          setUser(userData);
        }
      } catch (error) {
        // console.error("Failed to load token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  const signIn = useCallback(
    async ({ token, user }: { token: string; user: User }) => {
      console.log("SignIn called with token:", token);
      await setStorageItemAsync(USERI_TOKEN_KEY, token);
      setUser(user);
      tokenRef.current = token;

      if (user.isVerified) {
        console.log("User is verified, redirecting to protected route");
        router.replace("/(protected)");
        return;
      }
      console.log(tokenRef.current, user);
      router.replace("/auth/verify");
    },
    []
  );

  const signOut = useCallback(async () => {
    await setStorageItemAsync(USERI_TOKEN_KEY, null);
    tokenRef.current = null;
    setUser(null);
    router.replace("/auth/login");
  }, []);

  const updateUserPinStatus = () => {
    setUser((prev) => {
      if (prev) {
        return { ...prev, hasPin: true };
      }
      return null;
    });
  };
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        token: tokenRef,
        isLoading,
        user,
        updateUserPinStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
