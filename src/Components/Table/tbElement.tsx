import React, {FC, useState} from "react";
import {NoteType} from "../../Redux/Reducers/tableReducer";
import STb from "./tbStyle.module.css"
import {Input} from "../../Common/input";
import {
    SketchPicker,
    CompactPicker,
    CirclePicker,
    SliderPicker,
    SwatchesPicker,
    AlphaPicker,
    BlockPicker, ChromePicker
} from 'react-color';
import {Modal} from "../../Common/portal";
import {PickerColor} from "../../Common/pickerColor";
import {Error} from "../../Common/error";


type PropsType = {
    data: NoteType
    index: number
    firstIn: number
    lastIn: number
    err: Array<string>
    deleteNote: (id: number) => void
    setPos: (pos: number, data: NoteType, method: 'up' | 'down') => void
    updateNote: (data: NoteType) => void
    setErr: (data: Array<string>) => void
}

export const TableElement: FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [editData, setEditData] = useState(false)
    const [picker, setPicker] = useState(false)
    const [name, setName] = useState(props.data.name)
    const [type, setType] = useState(props.data.type)
    const [color, setColor] = useState(props.data.color)
    const sendData = () => {
        if (name === '' || type === '') {
            props.setErr(['All fields must be filled !', `${props.data.id}`])
        } else {
            props.updateNote({id: props.data.id, name, type, color})
            setEditData(false)
        }

    }
    const editDataSet = (data: boolean, mode: boolean) => {
        setEditData(data)
        setEditMode(mode)
        if (!data) {
            setName(props.data.name)
            setType(props.data.type)
            setColor(props.data.color)
            props.setErr([])
        }
    }

    const itemsClasses = `${STb.table_items__width} ${STb.table_items__text} ${STb.container_table__marginAuto}`
    const bg = {background: color}
    return (
        <div>
            <div className={STb.display__flex}>
                {!editData && <div className={itemsClasses}><span>{props.data.name}</span></div>}
                {!editData && <div className={itemsClasses}><span>{props.data.type}</span></div>}
                {!editData && <div className={itemsClasses}><span>{props.data.color}</span></div>}
                {editData && <Input placeholder={'Name'} type={'text'} value={name} setValue={setName}/>}
                {editData && <Input placeholder={'Type'} type={'text'} value={type} setValue={setType}/>}
                {editData && <div className={`${STb.display__flex} ${STb.container_table__marginAuto}`}>
                    <Input placeholder={'Color'} type={'text'} value={color} setValue={setColor}/>
                    <div onClick={() => setPicker(!picker)} style={bg}
                         className={`${STb.table_colorPicker__tap}`}></div>
                </div>}
                <div
                    className={`${STb.display__flex} ${STb.table_settings__width} ${STb.container_table__marginAuto} ${STb.table_settings__decor}`}>
                    {editData && <div>
                        <div className={STb.table_settingsItems__width} onClick={sendData}><span>&#10004;</span></div>
                        <div className={STb.table_settingsItems__width} onClick={() => editDataSet(false, true)}>
                            <span>&#10008;</span></div>
                    </div>}
                    {editMode && <div className={`${STb.display__flex}`}>
                        <div className={STb.table_settingsItems__width} onClick={() => editDataSet(true, false)}>
                            <span>&#9881;</span></div>
                        {props.index !== props.firstIn &&
                        <div className={STb.table_settingsItems__width}><span
                            onClick={() => props.setPos(props.index - 1, props.data, 'up')}>&#9650;</span></div>}
                        {props.index !== props.lastIn &&
                        <div className={STb.table_settingsItems__width}><span
                            onClick={() => props.setPos(props.index + 1, props.data, 'down')}>&#9660;</span></div>}
                        <div className={STb.table_settingsItems__width}><span
                            onClick={() => props.deleteNote(props.data.id)}>&#128465;</span></div>
                    </div>
                    }
                    {!editData &&
                    <div className={STb.table_settingsItems__width} onClick={() => setEditMode(!editMode)}>
                        <span>...</span></div>}
                </div>
            </div>
            <div>
                {editData && picker && <PickerColor color={color} setColor={setColor}/>}
            </div>
            {props.err.length > 0 && props.data.id === +props.err[1] && <Error err={props.err}/>}
        </div>

    )
}
