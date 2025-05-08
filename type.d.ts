// export type Transaction = {
//   name: string;
//   amount: string;
//   date: string;
//   icon: string;
// };#

export type User = {
  id: string;
  name: string;
  phoneNumber: string;
  isVerified: boolean;
  status: string;
};

export type Service = {
  name: string;
  link?: string;
  iconText: string;
  status: string;
};

export type Transaction = {
  id: number;
  amount: number;
  type: string;
  date: string;
  icon: string;
  status: string;
  description: string;
  meta: { meta: { [key: string]: any } };
};

export type Service = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  link: string;
  status: string;
};

export type DataPlan = {
  id: string;
  planId: string;
  category: string;
  network: string;
  status: string;
  validity: string;
  name: string;
  price: number;
};

export type CablePlan = {
  id: string;
  name: string;
  planId: string;
  provider: string;
  price: string;
  description: string;
  status: string;
};

export type GroupedPlanType = {
  [key: string]: DataPlan[];
};
export type GroupedCableType = {
  [key: string]: CablePlan[];
};
