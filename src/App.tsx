import { useEffect, useState } from "react";
import type { Expense } from "./type"

function App() {
  const [name, setName] = useState<Expense['title']>('');
  const [amount, setAmount] = useState<string>('');
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const stored = localStorage.getItem('expenses');
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // useEffect(() => {
  //   const storedExpenses = localStorage.getItem('expenses');
  //   if (storedExpenses) {
  //     try {
  //       const parsed = JSON.parse(storedExpenses);
  //       if (Array.isArray(parsed)) setExpenses(parsed);
  //     } catch {
  //       console.error("Invalid expenses data");
  //     }
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    const amountNumber = parseFloat(amount);
    const parsedAmount = isNaN(amountNumber) ? 0 : amountNumber;

    if (!name.trim() || parsedAmount <= 0) return;

    setExpenses([...expenses, { id: Date.now(), title: name.trim(), amount: parsedAmount }]);

    setName('');
    setAmount('');
  };

  const deleteExpense = (id: number): void => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  }

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString('en-PH', {
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
                step="0.01"
                id="amount"
                className="block w-full px-3 py-2.5 bg-gray-50 border border-gray-400 text-sm rounded shadow-xs focus:outline-pink-600"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}></input>
            </div>
          </div>
          <button type="submit" className="mt-4 px-4 py-2 bg-pink-600 text-white rounded shadow-xs hover:bg-pink-700 focus:outline-pink-600 md:hidden">Add Expense</button>
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
              {expenses.length === 0 && (
                <tr className="border-b border-gray-200">
                  <td colSpan={3} className='text-gray-500 text-sm p-4'>
                    No expense yet. Add one.
                  </td>
                </tr>
              )}

              {expenses.map((exp) => (
                <tr className="odd:bg-gray-100 even:bg-white border-b border-gray-200" key={exp.id}>
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
          </table>
          <div>
            <p className="text-sm px-3 py-3">Total: {totalExpense}</p>
          </div>
        </div>


      </div>
    </>
  )
}

export default App
