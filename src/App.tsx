import { useState } from "react";
import type { Expense } from "./type"

function App() {
  const [name, setName] = useState<Expense['title']>('');
  const [amount, setAmount] = useState<Expense['amount']>(0);
  const [expense, setExpense] = useState<Expense[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!name.trim()) return;
    if (amount <= 0) return;

    setExpense(prev => [...prev, { id: Date.now(), title: name.trim(), amount }]);

    setName('');
    setAmount(0);
  };

  const deleteExpense = (id: number): void => {
    setExpense(prev => prev.filter(exp => exp.id !== id));
  }

  const totalExpense = expense.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString('en-PH', {
                style: 'currency', currency: 'PHP'
              });

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <form onSubmit={handleSubmit} className="bg-white">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium dark:text-white">Name</label>
              <input
                type="text"
                id="name"
                className="block w-full px-3 py-2.5 bg-gray-50 border border-gray-400 text-sm rounded shadow-xs focus:outline-pink-600"
                value={name}
                onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="amount" className="block mb-2 text-sm font-medium dark:text-white">Amount</label>
              <input
                type="number"
                id="amount"
                className="block w-full px-3 py-2.5 bg-gray-50 border border-gray-400 text-sm rounded shadow-xs focus:outline-pink-600"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}></input>
            </div>
          </div>
          <button type="submit" className="hidden"></button>
        </form>

        <div className="relative overflow-x-auto bg-white shadow-xs border border-gray-200 rounded">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-3 py-3 font-medium">Name</th>
                <th className="px-3 py-3 font-medium">Amount</th>
                <th className="px-3 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {expense.length === 0 && (
                <tr className="border-b border-gray-200">
                  <td colSpan={4} className='text-gray-500 text-sm p-4'>
                    No expense yet. Add one.
                  </td>
                </tr>
              )}

              {expense.map((exp) => (
                <tr className="odd:bg-gray-100 even:bg-white border-b border-gray-200" key={exp.id}>
                  <td className="hidden">{exp.id}</td>
                  <td className="px-3 py-4">{exp.title}</td>
                  <td className="px-3 py-4">{exp.amount.toLocaleString('en-PH', {
                    style: 'currency', currency: 'PHP'
                  })}</td>
                  <td className="px-3 py-4">
                    <button 
                    type="button" 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteExpense(exp.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <div>
              <p className="text-sm px-3 py-3">Total: {totalExpense}</p>
            </div>
          </table>
        </div>


      </div>
    </>
  )
}

export default App
