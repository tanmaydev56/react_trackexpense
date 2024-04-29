import { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";

const ExpenseTable = ({ expense,
    setExpense,
    totalAmount,
    setTotalAmount,
    setFormData ,setGetID}) => {

    const [filterdata, setFilterData] = useState([])
    const [contextPosition, setContextPosition] = useState({});


    useEffect(() => {
        setFilterData(expense);
    }, [expense]);

    const uniqueCategories = Array.from(new Set(expense.map(elem => elem.category)));

    const filterByCategory = (e) => {
        const selectedOption = e.target.value;
        const filteredCategory = selectedOption ? expense.filter((elem) => elem.category === selectedOption) : expense;
        setFilterData(filteredCategory);
    }

    useEffect(() => {
        let total = 0;
        filterdata.forEach((element) => {
            total += parseFloat(element.amount);
        });
        setTotalAmount(total);
    }, [filterdata]);

    // context handler
    function contextHandler(e, ID) {
        e.preventDefault();
        setGetID(ID);
        const position = { X: e.clientX, Y: e.clientY, ID: ID }
        setContextPosition(position);
    }

    // sorting handler
    function sortHandler(e) {
        if (e.target.id === "ascending") {
            setFilterData(filterdata.sort((a, b) => a.amount - b.amount));
        }
        if (e.target.id === "descending") {
            setFilterData(filterdata.sort((a, b) => b.amount - a.amount));
        }
    }
    

    return (
        <div className="flex overflow-x-hidden">
            <ContextMenu contextPosition={contextPosition}
                setContextPosition={setContextPosition}
                expense={expense} setExpense={setExpense}
                setFormData={setFormData} />
            <table className="w-full p-3" onClick={() => setContextPosition({})}>
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <select name="filterCategory" onChange={filterByCategory} >
                                <option hidden>Category</option>
                                <option value={''}>All</option>
                                {
                                    uniqueCategories.map((elem, idx) =>
                                        <option key={idx} value={elem} title={elem}>{elem}</option>
                                    )
                                }
                            </select>
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount 
                            <span className="text-2xl mx-1 font-extraboldbold cursor-pointer" id="descending" onClick={(e)=>sortHandler(e)}>&uarr;</span>
                            <span className="text-2xl mx-1 font-extraboldbold cursor-pointer" id="ascending" onClick={(e)=>sortHandler(e)}>&darr;</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filterdata.map((element) => (
                        <tr key={element.id} className="bg-white cursor-pointer" onContextMenu={(e) => contextHandler(e, element.id)}>
                            <td className="text-center py-4 text-sm text-gray-900">{element.title}</td>
                            <td className="text-center py-4 text-sm text-gray-900">{element.category}</td>
                            <td className="text-center py-4 text-sm text-gray-900">{element.amount}</td>
                        </tr>
                    ))}
                    <tr className="bg-gray-50">
                        <td colSpan="2" className="text-left px-6 py-4 text-sm font-medium text-gray-900">
                            Total
                        </td>
                        <td className="py-4 text-sm text-gray-900">{totalAmount}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    );
}

export default ExpenseTable;
