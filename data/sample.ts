export const transactions = [
  {
    name: "Airtime",
    amount: "₦500.00",
    date: "09:15 AM  5th, Jan 2025",
    icon: "mtn",
  },
  {
    name: "Data",
    amount: "₦1,200.00",
    date: "10:30 AM  8th, Jan 2025",
    icon: "airtel",
  },
  {
    name: "Fund Wallet",
    amount: "₦3,500.00",
    date: "11:00 AM  12th, Jan 2025",
    icon: "fund",
  },
  {
    name: "Electricity Bill",
    amount: "₦8,000.00",
    date: "01:10 PM  15th, Jan 2025",
    icon: "electricity",
  },
  {
    name: "Airtime",
    amount: "₦300.00",
    date: "07:45 AM  18th, Jan 2025",
    icon: "glo",
  },
  {
    name: "Data",
    amount: "₦2,000.00",
    date: "06:00 PM  20th, Jan 2025",
    icon: "mtn",
  },
  {
    name: "Fund Wallet",
    amount: "₦5,000.00",
    date: "09:30 AM  23rd, Jan 2025",
    icon: "fund",
  },
  {
    name: "Electricity",
    amount: "₦4,000.00",
    date: "10:00 AM  26th, Jan 2025",
    icon: "airtel",
  },
  {
    name: "Airtime",
    amount: "₦400.00",
    date: "02:15 PM  28th, Jan 2025",
    icon: "nineMobile",
  },
  {
    name: "Data",
    amount: "₦1,500.00",
    date: "11:30 AM  30th, Jan 2025",
    icon: "glo",
  },
  {
    name: "Electricity Bill",
    amount: "₦6,000.00",
    date: "08:25 AM  2nd, Feb 2025",
    icon: "electricity",
  },
  {
    name: "Fund Wallet",
    amount: "₦7,500.00",
    date: "04:40 PM  5th, Feb 2025",
    icon: "fund",
  },
  {
    name: "Airtime",
    amount: "₦250.00",
    date: "07:10 AM  8th, Feb 2025",
    icon: "airtel",
  },
  {
    name: "Data",
    amount: "₦1,000.00",
    date: "10:55 AM  10th, Feb 2025",
    icon: "mtn",
  },
  {
    name: "Electricity",
    amount: "₦3,000.00",
    date: "12:00 PM  12th, Feb 2025",
    icon: "electricity",
  },
  {
    name: "Fund Wallet",
    amount: "₦6,000.00",
    date: "09:00 AM  15th, Feb 2025",
    icon: "fund",
  },
  {
    name: "Airtime",
    amount: "₦600.00",
    date: "10:20 AM  18th, Feb 2025",
    icon: "mtn",
  },
  {
    name: "Data",
    amount: "₦2,500.00",
    date: "11:45 AM  20th, Feb 2025",
    icon: "glo",
  },
  {
    name: "Electricity",
    amount: "₦5,500.00",
    date: "01:30 PM  23rd, Feb 2025",
    icon: "electricity",
  },
  {
    name: "Fund Wallet",
    amount: "₦4,000.00",
    date: "08:10 AM  26th, Feb 2025",
    icon: "fund",
  },
  {
    name: "Airtime",
    amount: "₦700.00",
    date: "09:30 AM  28th, Feb 2025",
    icon: "9mobile",
  },
  {
    name: "Data",
    amount: "₦1,800.00",
    date: "03:15 PM  1st, Mar 2025",
    icon: "airtel",
  },
  {
    name: "Electricity",
    amount: "₦4,500.00",
    date: "11:10 AM  4th, Mar 2025",
    icon: "electricity",
  },
  {
    name: "Fund Wallet",
    amount: "₦9,000.00",
    date: "10:00 AM  6th, Mar 2025",
    icon: "fund",
  },
  {
    name: "Airtime",
    amount: "₦550.00",
    date: "09:20 AM  10th, Mar 2025",
    icon: "mtn",
  },
];

export const previousTransactions = [
  { id: 1, network: "mtn", number: "08133654736" },
  { id: 2, network: "airtel", number: "08021234567" },
  { id: 3, network: "glo", number: "07051234567" },
  { id: 4, network: "nineMobile", number: "09081234567" },
  { id: 5, network: "mtn", number: "08124567890" },
  { id: 6, network: "airtel", number: "08037894567" },
  { id: 7, network: "glo", number: "07039876543" },
  { id: 8, network: "nineMobile", number: "09027654321" },
  { id: 9, network: "mtn", number: "08135678901" },
  { id: 10, network: "airtel", number: "08023456789" },
];

export interface DataPlan {
  planName: string;
  price: number;
  data: string;
  duration: string;
  durationType: "daily" | "weekly" | "monthly" | "3months";
}

const dataPlans: DataPlan[] = [
  // Daily Plans
  {
    planName: "Daily Lite",
    price: 50,
    data: "100MB",
    duration: "1 day",
    durationType: "daily",
  },
  {
    planName: "Daily Standard",
    price: 100,
    data: "500MB",
    duration: "1 day",
    durationType: "daily",
  },
  {
    planName: "Daily Premium",
    price: 200,
    data: "1GB",
    duration: "1 day",
    durationType: "daily",
  },
  {
    planName: "Daily Extra",
    price: 300,
    data: "2GB",
    duration: "1 day",
    durationType: "daily",
  },
  {
    planName: "Daily Max",
    price: 500,
    data: "5GB",
    duration: "1 day",
    durationType: "daily",
  },
  {
    planName: "Daily Ultimate",
    price: 1000,
    data: "10GB",
    duration: "1 day",
    durationType: "daily",
  },

  // Weekly Plans
  {
    planName: "Weekly Lite",
    price: 200,
    data: "1GB",
    duration: "7 days",
    durationType: "weekly",
  },
  {
    planName: "Weekly Standard",
    price: 500,
    data: "5GB",
    duration: "7 days",
    durationType: "weekly",
  },
  {
    planName: "Weekly Premium",
    price: 1000,
    data: "10GB",
    duration: "7 days",
    durationType: "weekly",
  },
  {
    planName: "Weekly Extra",
    price: 1500,
    data: "20GB",
    duration: "7 days",
    durationType: "weekly",
  },
  {
    planName: "Weekly Max",
    price: 2500,
    data: "50GB",
    duration: "7 days",
    durationType: "weekly",
  },
  {
    planName: "Weekly Ultimate",
    price: 5000,
    data: "100GB",
    duration: "7 days",
    durationType: "weekly",
  },

  // Monthly Plans
  {
    planName: "Monthly Lite",
    price: 1000,
    data: "5GB",
    duration: "30 days",
    durationType: "monthly",
  },
  {
    planName: "Monthly Standard",
    price: 2000,
    data: "10GB",
    duration: "30 days",
    durationType: "monthly",
  },
  {
    planName: "Monthly Premium",
    price: 5000,
    data: "50GB",
    duration: "30 days",
    durationType: "monthly",
  },
  {
    planName: "Monthly Extra",
    price: 7500,
    data: "100GB",
    duration: "30 days",
    durationType: "monthly",
  },
  {
    planName: "Monthly Max",
    price: 10000,
    data: "200GB",
    duration: "30 days",
    durationType: "monthly",
  },
  {
    planName: "Monthly Ultimate",
    price: 15000,
    data: "500GB",
    duration: "30 days",
    durationType: "monthly",
  },

  // 3 Months Plans
  {
    planName: "3 Months Lite",
    price: 2500,
    data: "15GB",
    duration: "90 days",
    durationType: "3months",
  },
  {
    planName: "3 Months Standard",
    price: 5000,
    data: "30GB",
    duration: "90 days",
    durationType: "3months",
  },
  {
    planName: "3 Months Premium",
    price: 10000,
    data: "100GB",
    duration: "90 days",
    durationType: "3months",
  },
  {
    planName: "3 Months Extra",
    price: 15000,
    data: "200GB",
    duration: "90 days",
    durationType: "3months",
  },
  {
    planName: "3 Months Max",
    price: 25000,
    data: "500GB",
    duration: "90 days",
    durationType: "3months",
  },
  {
    planName: "3 Months Ultimate",
    price: 40000,
    data: "1TB",
    duration: "90 days",
    durationType: "3months",
  },
];

export const groupedPlans = {
  daily: dataPlans.filter((plan) => plan.durationType === "daily"),
  weekly: dataPlans.filter((plan) => plan.durationType === "weekly"),
  monthly: dataPlans.filter((plan) => plan.durationType === "monthly"),
  "3months": dataPlans.filter((plan) => plan.durationType === "3months"),
};
