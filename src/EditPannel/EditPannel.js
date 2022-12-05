import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const EditPannel = (props) => {
    //const [todos, setTodos] = useState(props.todos);
    //const [originalData, setOriginalData] = useState(props.editPanelItem);
    const [editPanelItem, setEditPanelItem] = useState(props.editPanelItem);

    useEffect(() => {
        setEditPanelItem(props.editPanelItem)
        //setOriginalData(props.editPanelItem)
    },[props.editPanelItem])


    //spreminjanje naslova
    const titleChange = (event) => {
        editPanelItem.title = event.target.value
        props.setTodos(props.todos.map(value => {
            if (value.id === editPanelItem.id) {
                return {...value, title: event.target.value}
            }
            return value;
        }))
    }

    //spreminjanje opisa
    const descriptionChange = (event) => {
        editPanelItem.desc = event.target.value
        props.setTodos(props.todos.map(value => {
            if (value.id === editPanelItem.id) {
                return {...value, desc: event.target.value}
            }
            return value;
        }))
    }

    //spreminjanje avtorja
    const personChange = (event) => {
        editPanelItem.person = event.target.value
        props.setTodos(props.todos.map(value => {
            if (value.id === editPanelItem.id) {
                return {...value, person: event.target.value}
            }
            return value;
        }))
    }

    //spremninjanje datuma
    const dateChange = (date) => {
        if (date == null) {
            return
        }

        editPanelItem.date = date.toDate();
        props.setTodos(props.todos.map(value => {
            if (value.id === editPanelItem.id) {
                return {...value, date: date.toDate()}
            }
            return value;
        }))
    }

    //cancel update
    const cancelButtonPress = () => {
        /*props.setTodos(props.todos.map(value => {
            if (value.id === originalData.id) {
                return {...originalData}
            }
            return value;
        }))*/
        document.getElementById('appBody').style.width = '100%';
        props.setOpenEditPannel(false)
    }

    //save update
    const saveButtonPress = () => {
        props.setOpenEditPannel(false)
        document.getElementById('appBody').style.width = '100%';
    }

    return (
        //izgled panela
        <div>
            {editPanelItem && <div>
                <br></br>
                <br></br>
                <TextField value={editPanelItem.id} label={'ID'} InputProps={{readOnly: true}}></TextField>
                <br></br>
                <br></br>
                <TextField value={editPanelItem.title} label={'Naslov'} onChange={titleChange}></TextField>
                <br></br>
                <br></br>
                <TextField value={editPanelItem.desc} label={'Opis'} onChange={descriptionChange}></TextField>
                <br></br>
                <br></br>
                <TextField value={editPanelItem.person} label={'Avtor'} onChange={personChange}></TextField>
                <br></br>
                <br></br>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker label={'Datum'} onChange={dateChange} disablePast={true} inputFormat={'DD.MM.YYYY'}
                                    value={dayjs(editPanelItem.date)} renderInput={(params) => <TextField {...params}></TextField>}>
                    </DateTimePicker>
                </LocalizationProvider>
{/*                <input
                    value={editPanelItem.date}
                    onChange={dateChange}

                    title="Datum" type="date" className="datum_input" name='d_in'/>*/}
            </div>
            }
            <div>
                <button onClick={() => saveButtonPress()}>Shrani</button>
                {/*<button onClick={() => saveButtonPress()}>Save</button>*/}
                <button onClick={() => cancelButtonPress()}>Prekini</button>
            </div>
        </div>
    )
}

export default EditPannel