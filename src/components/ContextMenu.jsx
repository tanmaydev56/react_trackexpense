
const ContextMenu = ({
    contextPosition,
    setContextPosition,
    expense,setExpense, 
    setFormData}) => {

    if(!contextPosition.X||!contextPosition.Y)
    return;

    //  delete feature
    const ID =contextPosition.ID;
    function deleteHandler(){
        setExpense(()=> expense.filter((elem)=>elem.id !==ID ));
        setContextPosition({});
    }

    // edit feature
    function editHandler(){
        const toEdit = (expense.filter((elem)=> elem.id ===ID))[0]
        setFormData(toEdit);
        setContextPosition({});
    }
    
    return (
        <div className={`w-[70px] h-fit py-3 min-w-fit font-semibold rounded-md bg-green-200 z-10`} style={{position:"absolute" ,top:`${contextPosition.Y+10}px`,left:`${contextPosition.X+20}px`}}>
            <div className='hover:bg-green-300 cursor-pointer px-2' onClick={()=>editHandler()}>Edit</div>
            <div className='hover:bg-green-300 cursor-pointer px-2' onClick={()=>deleteHandler()}>Delete</div>
        </div>
    );
}

export default ContextMenu;
