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
