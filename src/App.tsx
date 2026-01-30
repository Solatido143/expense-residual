import { useEffect, useState } from "react";
import type { Expense } from "./type";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/Expensetable";

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

        <ExpenseForm name={name} setName={setName} amount={amount} setAmount={setAmount} handleSubmit={handleSubmit}/>

        <ExpenseTable expenses={expenses} deleteExpense={deleteExpense} totalExpense={totalExpense} />

      </div>
    </>
  )
}

export default App
