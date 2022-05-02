const Plan = ({price, testnum,selected, oc}) =>{
    return <div className={selected?'p-5 shadow-md m-2 rounded-xl border-lime-500 border-2 cursor-pointer':'p-5 shadow-md m-2 rounded-xl border-2 cursor-pointer hover:border-lime-200'} onClick={oc}>
       <div>{testnum}<sub> tests</sub></div>
        <div className="">{price}</div>
    </div>
}

export default Plan;

