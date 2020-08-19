import React, {FC} from "react";
import STb from "../Components/Table/tbStyle.module.css";

type PropsType = {
    placeholder: string
    type: string
    value: string
    setValue: (value: string | ((prevVar: string) => string)) => void
}

export const Input: FC<PropsType> = (props) => {
    let ref = React.createRef<HTMLInputElement>()
    const updData = () => {
        if (ref.current) {
            props.setValue(ref.current.value)
        }
    }
    const inputClasses = `${STb.table_input__decor} ${STb.table_input__width}`
    return (
        <div className={`${STb.container_table__marginAuto}`}>
            <input className={inputClasses} onChange={updData} value={props.value} placeholder={props.placeholder} ref={ref} type={props.type}/>
        </div>
    )
}
