import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputControl from './InputControl';

const AddForm = ({setGetID, getID, setExpense, expense,formData,setFormData }) => {
    
    const [error, setError] = useState({});

    const validateError = (expenseData) => {
        const { title, category, amount } = expenseData;
        const errorData = {};
        if (!title) {
            errorData.title = "* Title is required";
        }
        if (!category) {
            errorData.category = "* Category is required";
        }
        if (!amount) {
            errorData.amount = "* Amount is required";
        }
        setError(errorData);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        validateError(formData); // Validate error before submitting
        if (Object.keys(error).length !== 0) return;

        // ensuring the edit content 
        const index = expense.findIndex(obj => obj.id === getID);
        if (index !== -1) {          
                expense[index].title = formData.title;

                expense[index].category = formData.category;
            
                expense[index].amount = formData.amount;
            
            setExpense([...expense]);
            setGetID('');
            setFormData({ title: '', category: '', amount: '' }); // Reset form data
            return;
        }

        const newExpenseItem = { ...formData, id: uuidv4() };
        setExpense([...expense, newExpenseItem]);
        setFormData({ title: '', category: '', amount: '' }); // Reset form data
    };

    //saving in local storage
    useEffect(()=>{
        localStorage.setItem('expense',JSON.stringify((expense)));
    },[expense]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };


    return (
        <div className='min-w-[300px] max-w-[600px] max-h-[500px] 
        flex flex-col items-center
        mt-7 mx-auto p-2'>
            <form onSubmit={submitHandler} className="w-[100%] p-5">
                <InputControl
                    label={"Title"}
                    name={"title"}
                    type={"text"}
                    onChange={handleInputChange}
                    id={"title"}
                    value={formData.title}
                    placeholder={"Enter Your Expense name"}
                    error={error.title} />

                <InputControl
                    label={"Category"}
                    name={"category"}
                    type={"text"}
                    onChange={handleInputChange}
                    id={"category"}
                    value={formData.category}
                    placeholder={"Enter Your Expense Category"}
                    error={error.category} />

                <InputControl
                    label={"Amount"}
                    name={"amount"}
                    type={"number"}
                    onChange={handleInputChange}
                    id={"amount"}
                    value={formData.amount}
                    placeholder={"Enter Expense Amount"}
                    error={error.amount} />

                <button type="submit" className="bg-green-300 mt-4 p-2 w-[100px] rounded-lg font-bold text-green-800">ADD</button>
            </form>
        </div>
    );
}

export default AddForm;
