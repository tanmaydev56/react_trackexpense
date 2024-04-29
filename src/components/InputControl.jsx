

const InputControl = ({id,name,type,value,onChange,label,placeholder ,error}) => {
    return (
        <>
        
            <div className="h-[60px] mb-[50px]">
            <label htmlFor={id} className="text-2xl text-green-800 p-1 my-3 font-bold text-left">{label}</label>
            <input type={type} name={name} value={value} onChange={onChange} id={id} placeholder={placeholder}  min={0}
            className="w-full h-[45px] mt-2 rounded-md px-3 placeholder:pl-3 text-green-800 outline-green-600"
            />
            {error && <p className="text-red-500 font-medium">{error}</p>}
            
            </div>
        </>
    );
}

export default InputControl;
