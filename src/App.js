import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import EditPannel from "./EditPannel/EditPannel";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {TextField} from "@mui/material";

function App() {

    //taski - tabela
    //const[toDo, setToDo]=useState([
//{"id": 1, "title":"Prvo opravilo","date":"11-12-2022","person": "Jakob", "desc":"Updejtaj podatkovno bazo in jo uredi tako, da bo delovala kot more. Prav tako napiši select stavke in poišči vse ljudi, ki so starejši od 18 let.","status":true},
//{"id": 2, "title":"Drugo opravilo","date":"15-12-2022","person": "Jakob", "desc":"To je drugi task.", "status":true }
// ]);

//nalaganje tabele opravil
    const loadTodos = () => {
        const tmpTodos = JSON.parse(localStorage.getItem("toDo"))

        if (tmpTodos != null) {

            return tmpTodos
        }

        return []

    }
    const[toDo, setToDo]=useState(loadTodos());


//stanje
    const [newTitle, setNewTitle]=useState('');
    const [newDesc, setNewDesc]=useState('');
    const [newAut, setNewAut]=useState('');
    const [newDate, setNewDate]=useState(new Date());
    const [editPannelItem, setEditPannelItem] = useState(null);
    const [openEditPannel, setOpenEditPannel] = useState(false);

//shranjevanje v local storage
    useEffect(() => {
        localStorage.setItem("toDo", JSON.stringify(toDo));
    }, [toDo])

    useEffect(() => {
        const tmpTodos = JSON.parse(localStorage.getItem("toDo"))
        setToDo(tmpTodos)
    }, [])



//dodajanje opravila
    const addTask = () => {
        if(newAut  && newDate && newDesc && newTitle){
            let i = toDo.length +1;
            let newTask = {id: i, title: newTitle, person:  newAut, desc: newDesc, date: newDate, status: false}
            setToDo([...toDo, newTask]);
            setNewTitle('');
            setNewDesc ('');
            setNewAut ('');
            setNewDate ('');
        }

    }

//brisanje opravila
    const deleteTask = (id) =>{
        let newT = toDo.filter(task => task.id !== id)
        setToDo(newT);
    }

//zaključevanje opravila
    const doneTask = (id) =>{
        let newT = toDo.map( task => {
            if(task.id === id){
                return ({...task, status: !task.status})
            }
            return task
        })
        setToDo(newT);
    }

//edit pannel klik
    const handleDblClick = (itemId) => {
        setEditPannelItem(toDo.find(value => value.id === itemId))
        if (!openEditPannel) {
            setOpenEditPannel(true)
            document.getElementById('appBody').style.width = '80%';
            document.getElementById('appEditPannel').style.width = '20%';
        }
    }


    return (

        <div className="App">
            <div id={'appBody'}>
                <h2>Seznam opravil</h2>
                <br></br>
                <br></br>
                <div>
                    Naslov: <input
                    maxLength={30}
                    value={newTitle}
                    onChange={(e)=> setNewTitle(e.target.value)}

                    title="Naslov" className="naslov_input" name='n_in'/>
                    <br></br>

                    Opis: <input
                    maxLength={150}
                    value={newDesc}
                    onChange={(e)=> setNewDesc(e.target.value)}

                    title="Opis" className="opis_input" name='o_in'/>
                </div>

                <br></br>

                Avtor: <input
                maxLength={20}
                value={newAut}
                onChange={(e)=> setNewAut(e.target.value)}
                title="Avtor" className="avtor_input" name='a_in'/>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker label={'Datum'} onChange={(date) => setNewDate(date.toDate())} disablePast={true} inputFormat={'DD.MM.YYYY'}
                                    value={dayjs(newDate)} renderInput={(params) => <TextField {...params}></TextField>}>
                    </DateTimePicker>
                </LocalizationProvider>
                
                <br></br>
                <br></br>
                <button className="btn  btn-success" onClick={addTask}>Dodaj opravilo</button>
                <br></br>
                <br></br>
                {toDo && toDo.map((task, index)=>{
                        return(

                            <React.Fragment key={task.id}>

                                <div className="col taskCs" onDoubleClick={() => handleDblClick(task.id)}>

                                    <div className="naslov">
                                        <span className={task.status ? 'done' :"taskTitle"}>{task.title}</span>
                                    </div>
                                    <div className="opis">
                                        <span className={task.status ? 'done' :"taskDesc"}>{task.desc}</span>
                                    </div>
                                    <br></br>
                                    <div className="datum">
                                        <span className={task.status ? 'done' :"taskDate"}>{task.date.toString()}</span>
                                    </div>
                                    <div className="avtor">
                                        <span className={task.status ? 'done' :"taskPerson"}>{task.person}</span>
                                    </div>




                                    <div className="icons">
                                        <span title="Zaključi" onClick={(e)=>doneTask(task.id)}>
                                            <FontAwesomeIcon icon={faCircleCheck}/>
                                        </span>
                                        <span title="Zbriši" onClick={() => deleteTask(task.id)}>
                                            <FontAwesomeIcon icon={faTrashCan}/>
                                        </span>
                                        {task.status ? null :(
                                            <span title="Uredi" onClick={() => handleDblClick(task.id)}>
                                                <FontAwesomeIcon icon={faPen}/>
                                            </span>
                                        )}
                                    </div>

                                </div>

                            </React.Fragment>
                        )
                    }

                )}
            </div>
            <div id={'appEditPannel'} hidden={!openEditPannel}>
                <EditPannel setOpenEditPannel={setOpenEditPannel} setTodos={setToDo} todos={toDo} editPanelItem={editPannelItem}></EditPannel>
            </div>
        </div>

    );
}

export default App;
