import React, {FC, useEffect, useState} from "react";
import {TableHeader} from "./tbHeader";
import {AppStateType} from "../../Redux/store";
import {connect} from "react-redux";
import {App} from "../../App";
import {
    actionsTable,
    addNoteThunk,
    deleteNoteThunk,
    NoteType,
    setNotePositionThunk, updateDataThunk, uploadNotesThunk
} from "../../Redux/Reducers/tableReducer";
import {TableElement} from "./tbElement";
import {AddForm} from "./addForm";
import STb from "./tbStyle.module.css";


type PropsType = {
    notes: Array<NoteType>
    isInit: boolean
    err: Array<string>
    setPos: (pos: number, data: NoteType, method: 'up' | 'down') => void
    deleteNote: (id: number) => void
    addNote: (data: NoteType) => void
    uploadNotes: () => void
    updateNote: (data: NoteType) => void
    setErr: (data: Array<string>) => void
}


export const Table: FC<PropsType> = (props) => {
    useEffect(() => {
        props.uploadNotes()
    }, [])
    const [addMode, setAddMode] = useState(false)
    let maxId = -1
    props.notes.forEach(el => {
        if (el.id > maxId) maxId = el.id
    })
    const notes = props.notes.map((el, i) => <TableElement key={el.id} data={el} index={i}
                                                           firstIn={0} lastIn={props.notes.length - 1}
                                                           deleteNote={props.deleteNote} setPos={props.setPos}
                                                           updateNote={props.updateNote} setErr={props.setErr}
                                                           err={props.err}/>)
    const buttonClasses = `${STb.table_button__decor} ${STb.table_button__padding}`
    if (!props.isInit) return null
    return (
        <div>
            {!addMode && <div><button className={buttonClasses} onClick={() => setAddMode(true)}>Add note</button></div>}
            {addMode && <AddForm setErr={props.setErr} err={props.err} addNote={props.addNote} maxId={maxId} setAdd={setAddMode}/>}
            <div><TableHeader/></div>
            {notes.length === 0 && <div className={STb.table_err__decor}><span className={STb.table_err__font}>Table is empty !</span></div>}
            <div>{notes}</div>
        </div>
    )
}


let mapStateToProps = (state: AppStateType) => {
    return {
        notes: state.tableReducer.notes,
        isInit: state.tableReducer.isInit,
        err: state.tableReducer.errors
    }
}

export const TableWrapper = connect(mapStateToProps,
    {
        setPos: setNotePositionThunk, deleteNote: deleteNoteThunk,
        addNote: addNoteThunk, uploadNotes: uploadNotesThunk,
        updateNote: updateDataThunk, setErr: actionsTable.setErrors
    })(Table)
