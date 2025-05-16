import {
  API_URL,
  BALANCE_KEY,
  SERVICES_KEY,
  TRANSACTIONS_KEY,
  USERI_TOKEN_KEY,
} from "@/constants";
import { getStorageItemAsync } from "@/helpers/secureStorage";
import { Service, Transaction } from "@/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface AppDataContextType {
  error: boolean;
  balance: number;
  services: Service[];
  loading: boolean;
  transactions: Transaction[];
  refreshBalance: () => Promise<void>;
  addTransaction: (tx: Transaction) => void;
  refreshTransactions: () => Promise<void>;
}

const AppDataContext = createContext<AppDataContextType>({
  balance: 0,
  loading: false,
  services: [],
  refreshBalance: async () => {},
  transactions: [],
  addTransaction: () => null,
  refreshTransactions: async () => {},
  error: false,
});

const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, _setTransactions] = useState<Transaction[]>([]);
  const [balance, _setBalance] = useState<number>(0);
  const [services, _setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Save to AsyncStorage when updated
  // useEffect(() => {
  //   AsyncStorage.setItem("transactions", JSON.stringify(transactions));
  // }, [transactions]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const storedToken = await getStorageItemAsync(USERI_TOKEN_KEY);

    console.log("Stored token:", storedToken); // Debugging line
    if (!storedToken) return;

    try {
      setLoading(true);
      // 1. Fetch fresh data from server
      const response = await axios.get(`${API_URL}/app/initalize`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }); // Replace with your endpoint

      // console.log("Response data:", data); // Debugging line

      const { transactions, balance, services } = response.data as {
        transactions: Transaction[];
        balance: number;
        services: Service[];
      };

      if (!transactions || !services) {
        throw new Error("Invalid response from server");
      }

      // Update context state
      _setTransactions(transactions);
      _setBalance(balance);
      _setServices(services);

      console.log(services);
      // // Save to AsyncStorage
      // await Promise.all([
      //   AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions)),
      //   AsyncStorage.setItem(BALANCE_KEY, JSON.stringify(balance)),
      //   AsyncStorage.setItem(SERVICES_KEY, JSON.stringify(services)),
      // ]);
    } catch (error: any) {
      // Handle error
      console.error("Error fetching app data:", error);
      setError(true);
      console.warn("Failed to fetch app data:", error?.message);
    } finally {
      setLoading(false);
    }
  };

  // Add one new transaction
  const addTransaction = (tx: Transaction) => {
    _setTransactions((prev) => [tx, ...prev.slice(0, 19)]);
    refreshBalance();
  };

  const refreshBalance = async () => {
    const storedToken = await getStorageItemAsync(USERI_TOKEN_KEY);
    if (!storedToken) return;
    setError(false);
    // Fetch balance from the server
    try {
      const response = await axios.get(`${API_URL}/account/balance`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const { balance } = response.data; // Adjust based on your API response structure
      _setBalance(balance);
      await AsyncStorage.setItem(BALANCE_KEY, JSON.stringify(balance));
    } catch (error) {
      console.error("Error fetching balance:", error);
      setError(true);
    }
  };

  const refreshTransactions = async () => {
    setError(false);
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/account/transactions`); // Replace with your endpoint
      const { transactions } = response.data as {
        transactions: Transaction[];
        total: number;
      }; // Adjust based on your API response structure

      // await AsyncStorage.setItem("transactions", JSON.stringify(transactions));
      _setTransactions(transactions);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppDataContext.Provider
      value={{
        transactions,
        addTransaction,
        refreshTransactions,
        services,
        balance,
        refreshBalance,
        loading,
        error,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

const useAppData = () => {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AppDataContext, AppDataProvider, useAppData };
