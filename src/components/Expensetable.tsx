interface Expense {
    id: number;
    title: string;
    amount: number;
}

export default function ExpenseTable( { expenses, deleteExpense, totalExpense }: { expenses: Expense[]; deleteExpense: (id: number) => void; totalExpense: string }) {
    return (
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
    )
}