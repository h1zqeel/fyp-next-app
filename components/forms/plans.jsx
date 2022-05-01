import { useState } from "react";
import Plan from "./plan";
const Plans = () => {
    const [s1,setS1] = useState(false);
    const [s2,setS2] = useState(false);
    const [s3,setS3] = useState(false);
    const select = (id) => {
        switch(id){
            case 1:{
                setS1(true);
                setS2(false);
                setS3(false);
                break;
            }
            case 2:{
                setS1(false);
                setS2(true);
                setS3(false);
                break;
            }
            case 3:{
                setS1(false);
                setS2(false);
                setS3(true);
                break;
            }
        }
    }
    return (
        <div className="flex flex-row text-center ">
        <Plan testnum={'10'} price={'$2.99'} selected={s1} oc={()=>select(1)}/>
        <Plan testnum={'20'} price= {'$5.99'} selected={s2} oc={()=>select(2)}/>
        <Plan testnum={'50'} price= {'$10.99'} selected={s3} oc={()=>select(3)}/>

        </div>
    )
}

export default Plans;