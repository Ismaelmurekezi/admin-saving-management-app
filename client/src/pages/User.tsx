import { ChevronLeft, ChevronRight, Filter, Search, Users } from "lucide-react";


export default function User() {
 return (
   <div className="p-8">
     <div className="bg-white w-80 rounded-lg p-6 shadow-sm mb-8 inline-block">
       <div className="flex items-center  justify-between mb-2">
         <p className="text-sm font-medium text-gray-600">Total Users</p>
         <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center ml-8">
           <Users className="w-6 h-6 text-white" />
         </div>
       </div>
       <p className="text-3xl font-bold text-yellow-600">200</p>
     </div>

     <div className="p-6 ">
       <h3 className="text-lg font-semibold text-teal-700">Users List</h3>
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
                 STATUS
               </th>
               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                 BALANCE
               </th>
               <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                 ACTIONS
               </th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-200">
             {[...Array(5)].map((_, i) => (
               <tr key={i}>
                 <td className="px-6 py-4 text-sm text-gray-700">Peter pan</td>
                 <td className="px-6 py-4 text-sm text-gray-700">
                   Peter@gmail.com
                 </td>
                 <td className="px-6 py-4">
                   <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                     Accepted
                   </span>
                 </td>
                 <td className="px-6 py-4 text-sm text-gray-700">$ 12000</td>
                 <td className="px-6 py-4">
                   <div className="flex gap-2">
                     <button className="px-3 py-1 bg-green-500 text-white rounded text-xs">
                       Verify
                     </button>
                     <button className="px-3 py-1 bg-red-500 text-white rounded text-xs">
                       Reject
                     </button>
                   </div>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>

         <div className="flex items-center justify-end gap-4 mt-4">
           <button className="flex items-center gap-1 text-sm text-gray-600">
             <ChevronLeft className="w-4 h-4" />
             Previous
           </button>
           <div className="flex gap-2">
             <button className="w-8 h-8 rounded bg-gray-100">1</button>
             <button className="w-8 h-8 rounded">2</button>
             <button className="w-8 h-8 rounded">3</button>
           </div>
           <button className="flex items-center gap-1 text-sm text-gray-600">
             Next
             <ChevronRight className="w-4 h-4" />
           </button>
         </div>
       </div>
     </div>
   </div>
 );
}

