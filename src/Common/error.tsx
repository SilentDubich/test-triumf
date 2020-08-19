import React, {FC} from "react";
import STb from "../Components/Table/tbStyle.module.css";

type PropsType = {
    err: Array<string>
}

export const Error: FC<PropsType> = (props) => {
    return (
        <div className={STb.table_err__decor}>
            <span className={STb.table_err__font}>{props.err[0]}</span>
        </div>
    )
}
