import React, {FC} from "react";
import STb from "./tbStyle.module.css";



// Последняя дивка нужна для правильной разметки данных под заголовками
export const TableHeader: FC<any> = (props) => {
    const itemsClasses = `${STb.table_items__width} ${STb.table_items__text} ${STb.container_table__marginAuto}`
    return (
        <div className={STb.display__flex}>
            <div className={itemsClasses}><span>Name</span></div>
            <div className={itemsClasses}><span>Type</span></div>
            <div className={itemsClasses}><span>Color</span></div>
            <div className={itemsClasses}><span></span></div>
        </div>
    )
}
