import React, { useRef, useState } from 'react'
import { data } from '../assets/questions';




const Quiz =() => {

    let [index,setIndex] = useState(0);
    let [question,SetQuestion] = useState(data[index]);
    let [lock,SetLock] = useState(false);
    let[score,SetScore] = useState(0);
    let[result,setResult] = useState(false)

    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);

    let option_array = [option1,option2,option3,option4];


    const checkAns = (e,ans)=>{
        if(lock === false){
            if(question.ans === ans){
                e.target.classList.add("correct")
                SetLock(true);
                SetScore(prev=>prev+1);
            }else{
                e.target.classList.add("wrong")
                SetLock(true);
                option_array[question.ans-1].current.classList.add("correct");
            }
        }
        
    }


    const next = ()=>{
        if(lock===true){
            if(index === data.length -1){
                setResult(true);
                return 0;
            }
            setIndex(++index);
            SetQuestion(data[index]);
            SetLock(false);
            option_array.map((option)=>{
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const reset = () =>{
        setIndex(0);
        SetQuestion(data[0]);
        SetScore(0);
        SetLock(false);
        setResult(false);
    }

  return (
    <>
    
        <div className="container d-flex ">
            <h1 style={{color:"greenyellow"}}>Quiz App</h1>
            <hr />
            {result?<></>:<>
            <h2>{index+1} . <span style={{color:"darkorange"}}>{question.question}</span></h2>
            
            <ul style={{color:"whitesmoke"}}>
                <li ref={option1} onClick={(e)=>{checkAns(e,1)}} >{question.option1}</li>
                <li ref={option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
                <li ref={option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
                <li ref={option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
            </ul>
            <button style={{color:"black"}} onClick={next}>NEXT</button>
            <div className="index">{index+1} of {data.length} question-</div>
            </>}
            {result?<>
                <h2>you scored {score} out of {data.length}</h2>
          <button onClick={reset}>reset</button>
            </>:<>
           
            </>}
         
        </div>
    </>
  )
}
export default Quiz