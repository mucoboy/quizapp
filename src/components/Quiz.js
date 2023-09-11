import { useState, useEffect } from "react";

//Main Component
export default function Quiz() {
    const [page, setPage] = useState("start");//start,exam and finish
    const [questions, setQuestions] = useState([])

    let content;



    //get Questions from your rest api
    async function getQuestion() {


        
        try {
            await fetch('/questions')//your rest api url
                .then(response => response.json())
                .then(json => {

                    setQuestions(json)
                    setPage("exam")
                })


        } catch (error) {
            alert(error)
        }

    }

    //get Demo Questions
    function getDemo(){
        //this is the format of json response from your rest api
        //marked must be empty at the begining. when user mark the question, change marked value
            let demoQuestions = [

                {
                    question : "Complete the sentence: Hello, ... ?",
                    a: "Kitty!",
                    b: "Baby!",
                    c: "World!",
                    d: "React!",
                    e: "JS!",
                    answer:"c",
                    marked:""
                },

                {
                    question : "Which one is the programming language?",
                    a: "React",
                    b: "Spring",
                    c: ".Net",
                    d: "JavaScript",
                    e: "Bootstrap",
                    answer:"d",
                    marked:""
                },

                {
                    question : "Which statement returns true in if block?",
                    a: "Java === JavaScript",
                    b: "C === C++",
                    c: "C# === .Net",
                    d: "React === Angular",
                    e: "true || false",
                    answer:"e",
                    marked:""
                }

                
            ]

            
            setQuestions(demoQuestions)
            setPage("exam")
    }

    if (page === "start")
        content = <Start getDemo={getDemo} getQuestion={getQuestion}/>;
    else if (page === "exam")
        content = <Exam questions={questions} update={(newQuestions) => setQuestions(newQuestions)} finish={() => setPage("finish")} />
    else if (page === "finish")
        content = <Finish newExam={() => setPage("start")} questions={questions} />

    return (content)
}

//Start Component. When you click start button, it fetch data from your rest api then send to exam page
function Start({ getQuestion, getDemo }) {



    let content =
        <div className='container'>
            <div className='row align-items-center' style={{ height: "80vh" }}>

                <div className='card col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 col-xxl-4 offset-xxl-4' style={{ border: "0" }} >
                <img src="logo512.png" style={{marginLeft:"20px", marginBottom:"20px"}} alt="quiz logo here"></img>
                <div class="d-grid gap-2 mt-2">
                        <button style={{ fontSize: "20px", fontFamily: "Anek Malayalam" }} onClick={getQuestion} type="button" class="btn btn-success" >Start</button>
                    </div>
                    <div class="d-grid gap-2 mt-2">
                        <button style={{ fontSize: "20px", fontFamily: "Anek Malayalam" }} onClick={getDemo} type="button" class="btn btn-primary" >Try Demo</button>
                    </div>
                </div>
            </div>
        </div>



    return (
        content
    )

}

//Exam Component includes timer. either you finish exam or timer finishes
function Exam({ finish, update,  questions }) {
    let [index, setIndex] = useState(1)
    
    function mark(result) {

        //if it is empty, mark it
        if (questions[index - 1].marked !== result) {
            let newQuestions = [...questions]
            newQuestions[index - 1].marked = result

            update(newQuestions)//we update questions in upper component because we send to finish page later
        }

        //if it is not empty, unmark it
        else {
            let newQuestions = [...questions]
            newQuestions[index - 1].marked = ""

            update(newQuestions)
        }
    }


    function finishExam() {
        let result = window.confirm("Are you sure want to finish the exam?")
        if (result) {
            finish()
        }
    }


    //bootstrap's perfect grid
    let alignment = 'col-xs-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3';

    let content = <div className='container mt-1' style={{ height: "100vh" }}>

        <div className='row' >
            <div className={alignment}>
                <div class="card" style={{ border:"0" }}>
                    <div class="card-header bg-transparent border-success" style={{ border: "0" }}>
                        <p style={{ fontFamily: "Anek Malayalam", fontSize: "32px", fontWeight: "bold" }} className='text-center'>{questions[index - 1].question} </p>
                    </div>
                    <div class="btn-group-vertical m-2" role="group" aria-label="Vertical radio toggle button group">
                        <input checked={questions[index - 1].marked === "a" ? true : false} onClick={mark.bind(this, "a")} type="radio" class="btn-check" name="vbtn-radio" id="a" autoComplete="off" />
                        <label style={{textAlign:"left"}} class="btn btn-outline-primary mb-3  rounded-pill" htmlFor="a" >A-) {questions[index - 1].a}</label>
                        <input checked={questions[index - 1].marked === "b" ? true : false} onClick={mark.bind(this, "b")} type="radio" class="btn-check" name="vbtn-radio" id="b" autoComplete="off" />
                        <label style={{textAlign:"left"}} class="btn btn-outline-primary mb-3   rounded-pill" htmlFor="b">B-) {questions[index - 1].b}</label>
                        <input checked={questions[index - 1].marked === "c" ? true : false} onClick={mark.bind(this, "c")} type="radio" class="btn-check" name="vbtn-radio" id="c" autoComplete="off" />
                        <label style={{textAlign:"left"}} class="btn btn-outline-primary mb-3   rounded-pill" htmlFor="c">C-) {questions[index - 1].c}</label>
                        <input checked={questions[index - 1].marked === "d" ? true : false} onClick={mark.bind(this, "d")} type="radio" class="btn-check" name="vbtn-radio" id="d" autoComplete="off" />
                        <label style={{textAlign:"left"}} class="btn btn-outline-primary mb-3   rounded-pill" htmlFor="d">D-) {questions[index - 1].d}</label>
                        <input checked={questions[index - 1].marked === "e" ? true : false} onClick={mark.bind(this, "e")} type="radio" class="btn-check" name="vbtn-radio" id="e" autoComplete="off" />
                        <label style={{textAlign:"left"}} class="btn btn-outline-primary rounded-pill" htmlFor="e">E-) {questions[index - 1].e}</label>
                    </div>
                </div>
            </div>
        </div>

        <div className='row mt-4 mb-4'>
            <div className={alignment}>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-4'>
                            {index !== 1 ? <button style={{ fontSize: 20, fontFamily: "Anek Malayalam" }} type="button" class="btn btn-secondary float-start" onClick={() => setIndex(--index)}>&#60; &#60;</button> : null}
                        </div>
                        <div className='col-4' style={{ textAlign: "center" }}>
                            <span style={{ display: "inline-block", fontFamily: "Anek Malayalam", fontSize: "32px", fontWeight: "bold", alignContent: "center" }} className='text-primary'>{index}<span style={{ alignItems: "center", fontSize: "20px", fontWeight: "bold", fontFamily: "Anek Malayalam" }} className='text-secondary'>/{questions.length}</span></span>
                        </div>
                        <div className='col-4'>
                            {index !== questions.length ? <button style={{ fontSize: 20, fontFamily: "Anek Malayalam" }} type="button" class="btn btn-success float-end" onClick={() => setIndex(++index)}>&#62; &#62;</button> : null}
                        </div>
                    </div>
                </div>
            </div> 
        </div>

        <div className='row mt-2'>
            <div className={alignment} >
                <div className='d-grid'>
                    <button onClick={finishExam} style={{ fontSize: "20px" }} type="button" class="btn btn-danger" >Finish Exam</button>
                </div>
            </div>
        </div>

        <div className='row mt-4'>
            <div className={alignment} style={{ textAlign: "center" }}>
                <Timer finish={finish} questionLength={questions.length} />
            </div>
        </div>
    </div>

    return content

}


//Finish Component checks result according to user answers
function Finish({ newExam, questions }) {

    let[correct,setCorrect] = useState(0)
    let[inCorrect,setIncorrect] = useState(0)
    let[empty,setEmpty] = useState(0)
    let[show,setShow] = useState(false)//show answers

    
    //we use effect because we don't want to calculate when it is rerender
    useEffect(() => {
        for (let item of questions) {

            if(item.marked === "")
                setEmpty(++empty)

            else if (item.marked === item.answer)
                setCorrect(++correct)

            else
                setIncorrect(++inCorrect)
            
            
        }
        
        

      return () => {
        
      }
    }, [questions])
    
    
    
    let content = <div className='container' style={{ border: 0 }}>
        <div className='row align-items-center' style={{ height: "80vh"}}>
            <div className='col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 col-xxl-4 offset-xxl-4'>
                <p className='card-text'>Correct : {correct}</p>
                <p className='card-text'>Incorrect : {inCorrect}</p>
                <p className='card-text'>Empty : {empty}</p>
                
                {correct <= inCorrect?<p className="card-text text-danger" style={{fontStyle:"italic",fontWeight:"bold"}}>Result: Fail!</p>:<p className="card-text text-success" style={{fontStyle:"italic",fontWeight:"bold"}}>Result: Pass!</p>}
                <div class="d-grid gap-2 mt-2">
                    <button onClick={newExam} type="button" class="btn btn-primary" >New Exam</button>
                    <button onClick={()=>setShow(!show)} type="button" class="btn btn-secondary" >{show===false?"Show Answers":"Hide Answers"}</button>
                </div>
                {show===true?<AnswerKey questions={questions}/>:null}
            </div>
        </div>

        

    </div>


    return (
        content
    )
}

//Answer Key Component is hidden by default. user can show it by clicking show button
function AnswerKey({questions}){
    
    const listItems = questions.map(item => {
        let color;
        let result;

        if(item.marked ==="")
            {
                color = "gray"
                result = "EMPTY"
            }

        else if(item.marked === item.answer)
            {
                color = "green"
                result = "CORRECT"
            }

        else
            {
                color = "red";
                result = "INCORRECT"
            }

           return <li class="list-group-item">
                <span style={{color:color,fontWeight:"bold"}}>{result} : {item.question}</span> 
                <br /> 
                <span style={item.marked==="a"?{color:color,fontStyle:"italic",fontWeight:"bold"}:(item.answer ==="a"?{color:"green",fontStyle:"italic",fontWeight:"bold"}:null)}>a-) {item.a}</span> 
                <br/> 
                <span style={item.marked==="b"?{color:color,fontStyle:"italic",fontWeight:"bold"}:(item.answer ==="b"?{color:"green",fontStyle:"italic",fontWeight:"bold"}:null)}>b-) {item.b}</span>
                <br/> 
                <span style={item.marked==="c"?{color:color,fontStyle:"italic",fontWeight:"bold"}:(item.answer ==="c"?{color:"green",fontStyle:"italic",fontWeight:"bold"}:null)}>c-) {item.c}</span> 
                <br/> 
                <span style={item.marked==="d"?{color:color,fontStyle:"italic",fontWeight:"bold"}:(item.answer ==="d"?{color:"green",fontStyle:"italic",fontWeight:"bold"}:null)}>d-) {item.d}</span> 
                <br/> 
                <span style={item.marked==="e"?{color:color,fontStyle:"italic",fontWeight:"bold"}:(item.answer ==="e"?{color:"green",fontStyle:"italic",fontWeight:"bold"}:null)}>e-) {item.e}</span>
            </li>
    });
    
    return <ul className="list-group mt-2">{listItems}</ul>
}

//Timer Component finishes the exam when time expired
function Timer({ finish, questionLength }) {
    //Only timer component rerender when states changed
    let [second, setSecond] = useState(0)
    //quiz total minute.
    let [minute, setMinute] = useState(questionLength)

    useEffect(() => {

        let interval = setInterval(() => {

            //time expired
            if (second === 0 && minute === 0) {
                clearInterval(interval)
                finish()
            }

            //minute expired
            else if (second === 0 && minute > 0) {
                setSecond(second = 59)
                setMinute(--minute)
            }

            else
                setSecond(--second)
        }, 1000);

        return () => {
            //before unmount the component, clear timer
            clearInterval(interval)
        }
    }, [questionLength])//timer depends on questionlenght. it avoids to create new timer when rerender

    return (<i class="fa-regular fa-hourglass fa-lg fa-bounce"  > {minute<10?"0"+minute:minute}:{second<10?"0"+second:second}</i>)
}