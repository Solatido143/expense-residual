interface ExpenseFormProps {
    name: string;
    setName: (name: string) => void;
    amount: string;
    setAmount: (amount: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export default function ExpenseForm({ name, setName, amount, setAmount, handleSubmit }: ExpenseFormProps) {
    return (
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
    );
}