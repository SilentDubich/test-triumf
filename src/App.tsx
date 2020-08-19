import React, {FC} from 'react';
import './App.css';
import {TableWrapper} from "./Components/Table/table";
import STb from "./Components/Table/tbStyle.module.css";

export const App: FC<any> = (props) => {
  return (
    <div className={`${STb.container_table__width} ${STb.container_table__marginAuto}`}>
      <TableWrapper/>
    </div>
  );
}

