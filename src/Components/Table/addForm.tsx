import React, {FC, useState} from "react";
import {NoteType} from "../../Redux/Reducers/tableReducer";
import STb from "./tbStyle.module.css";
import {Input} from "../../Common/input";
import {PickerColor} from "../../Common/pickerColor";
import {Error} from "../../Common/error";

type PropsType = {
    maxId: number
    setAdd: (value: boolean | ((prevVar: boolean) => boolean)) => void
    addNote: (data: NoteType) => void
    setErr: (data: Array<string>) => void
    err: Array<string>
}


export const AddForm: FC<PropsType> = (props) => {
    const [name, setName] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [color, setColor] = useState<string>('#ffffff')
    const [editColor, setEditColor] = useState(false)
    const sendData = () => {
        if (name === '' || type === '') {
            props.setErr(['All fields must be filled !'])
        } else {
            props.addNote({id: props.maxId + 1, name, type, color})
            setName('')
            setType('')
            setColor('')
            props.setAdd(false)
            props.setErr([])
        }
    }
    const bg = {background: color}
    const buttonClasses = `${STb.table_button__decor} ${STb.table_button__padding}`
    return (
        <div>
            <div className={`${STb.display__flex}`}>
                <Input placeholder={'Name'} type={'text'} value={name} setValue={setName}/>
                <Input placeholder={'Type'} type={'text'} value={type} setValue={setType}/>
                <div className={`${STb.display__flex} ${STb.container_table__marginAuto}`}>
                    <Input placeholder={'Color'} type={'text'} value={color} setValue={setColor}/>
                    <div onClick={() => setEditColor(!editColor)} style={bg}
                         className={`${STb.table_colorPickerAddForm__tap}`}></div>
                </div>
                <div className={`${STb.display__flex} ${STb.table_items__width}`}>
                    <div>
                        <button className={buttonClasses} onClick={sendData}>Add</button>
                    </div>
                    <div>
                        <button className={buttonClasses} onClick={() => {
                            props.setAdd(false)
                            setEditColor(false)
                            props.setErr([])
                        }}>Cancel
                        </button>
                    </div>
                </div>
                {editColor && <PickerColor color={color} setColor={setColor}/>}
            </div>
            {props.err.length > 0 && <Error err={props.err}/>}
        </div>

    )
}
