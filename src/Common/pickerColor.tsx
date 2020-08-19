import React, {FC} from "react";
import {ChromePicker} from "react-color";
import STb from "../Components/Table/tbStyle.module.css";
import {Modal} from "./portal";

type PropsType = {
    color: string
    setColor: (color: string | ((prevVar: string) => string)) => void
}

export const PickerColor: FC<PropsType> = (props) => {
    const setNewColor = (color: any) => {
        props.setColor(color.hex)
    }
    return (
        <Modal>
            <div>
                <ChromePicker className={`${STb.container_table__marginAuto} ${STb.table_colorPicker__width}`}
                              disableAlpha={true} color={ props.color } onChange={ setNewColor }/>
            </div>
        </Modal>
    )
}
