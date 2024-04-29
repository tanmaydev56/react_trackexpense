import { useState } from "react";
import AddForm from "./AddForm";
import ExpenseTable from "./ExpenseTable";
import Header from "./Header";

const Home = () => {
    const[formData,setFormData] = useState({title:'',category:'',amount:''});
    const [getID, setGetID] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);

    const [expense, setExpense] =useState(()=>{
        return (JSON.parse(localStorage.getItem('expense')))?(JSON.parse(localStorage.getItem('expense'))):[];
    });
    
   

    return (
        <div className="relative w-[100vw] h-full bg-slate-300 overflow-x-hidden">
            <Header></Header>
            <AddForm setGetID={setGetID} getID={getID} formData={formData} setFormData={setFormData} setExpense={setExpense} expense={expense}></AddForm>
            <ExpenseTable setGetID={setGetID}  setFormData={setFormData}  expense={expense} setExpense={setExpense} totalAmount={totalAmount} setTotalAmount={setTotalAmount}></ExpenseTable>
        </div>
    );
}

export default Home;
