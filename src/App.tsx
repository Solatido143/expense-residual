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

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 mb-6">

        <ExpenseForm name={name} setName={setName} amount={amount} setAmount={setAmount} setExpenses={setExpenses}/>

        <ExpenseTable expenses={expenses} setExpenses={setExpenses}/>

      </div>
    </>
  )
}

export default App
