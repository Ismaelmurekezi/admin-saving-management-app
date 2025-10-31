import { ChevronLeft, ChevronRight, DollarSign, Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { adminAPI } from "../services/api";
import { toast } from "react-toastify";
import StatsCard from "../components/StatsCard";

interface Transaction {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  type: "deposit" | "withdraw";
  amount: number;
  balanceAfter: number;
  createdAt: string;
}

export default function Transaction() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await adminAPI.getTransactions();
      setTransactions(response.data);
    } catch (error) {
      toast.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  const totalDeposits = transactions
    .filter(t => t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalWithdrawals = transactions
    .filter(t => t.type === "withdraw")
    .reduce((sum, t) => sum + t.amount, 0);

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading transactions...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Transaction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard title="Total Deposits" value={`$${totalDeposits.toLocaleString()}`} icon={DollarSign} color="green" />
        <StatsCard title="Total Withdrawals" value={`$${totalWithdrawals.toLocaleString()}`} icon={DollarSign} color="red" />
        <StatsCard title="Total Transactions" value={transactions.length} icon={DollarSign} color="blue" />
      </div>

     <div className="p-6 ">
       <h3 className="text-lg font-semibold text-teal-700">Transaction List</h3>
     </div>
     <div className="bg-white rounded-lg shadow-sm">
       <div className="p-6">
         <div className="flex items-center justify-between mb-4">
           <div className="relative flex-1 max-w-md">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
             <input
               type="text"
               placeholder="Search"
               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
             />
           </div>
           <div className="flex gap-3">
             <button className="px-4 py-2 border border-gray-300 rounded-md">
               Actions
             </button>
             <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center gap-2">
               <Filter className="w-4 h-4" />
               Filter
             </button>
           </div>
         </div>

         <table className="w-full">
           <thead className="bg-gray-50">
             <tr>
               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                 NAME
               </th>
               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                 EMAIL
               </th>
               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                 AMOUNT
               </th>
               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                 TYPE
               </th>
               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                 BALANCE AFTER
               </th>
               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                 DATE
               </th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-200">
             {transactions.map((transaction) => (
               <tr key={transaction._id} className="hover:bg-gray-50">
                 <td className="px-6 py-4 text-sm text-gray-700">{transaction.userId.name}</td>
                 <td className="px-6 py-4 text-sm text-gray-700">{transaction.userId.email}</td>
                 <td className="px-6 py-4 text-sm text-gray-700">${transaction.amount.toLocaleString()}</td>
                 <td className="px-6 py-4">
                   <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                     transaction.type === "deposit" 
                       ? "bg-green-100 text-green-700" 
                       : "bg-red-100 text-red-700"
                   }`}>
                     {transaction.type}
                   </span>
                 </td>
                 <td className="px-6 py-4 text-sm text-gray-700">${transaction.balanceAfter.toLocaleString()}</td>
                 <td className="px-6 py-4 text-sm text-gray-700">
                   {new Date(transaction.createdAt).toLocaleDateString("en-US", {
                     year: "numeric",
                     month: "short",
                     day: "numeric",
                     hour: "2-digit",
                     minute: "2-digit"
                   })}
                 </td>
               </tr>
             ))}
           </tbody>
         </table>

         <div className="flex items-center justify-between mt-4">
           <p className="text-sm text-gray-700">
             Showing {transactions.length} of {transactions.length} results
           </p>
           <div className="flex items-center gap-4">
             <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
               <ChevronLeft className="w-4 h-4" />
               Previous
             </button>
             <div className="flex gap-2">
               <button className="w-8 h-8 rounded bg-teal-600 text-white text-sm">1</button>
               <button className="w-8 h-8 rounded hover:bg-gray-100 text-sm">2</button>
               <button className="w-8 h-8 rounded hover:bg-gray-100 text-sm">3</button>
             </div>
             <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
               Next
               <ChevronRight className="w-4 h-4" />
             </button>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}
