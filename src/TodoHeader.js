import React, {memo } from "react";
import { Button} from "antd";

const TodoHeader = memo(({showStatusList,active}) =>  {
    return (
      <div className={"mainHeader"}>
        任务列表
        <div className="mainHandle">
          <Button
            size="small"
            type="default"
            className={`"classifyBtn"${active === "SHOW_ALL" ? "active" : null}`}
            onClick={() => showStatusList("SHOW_ALL")}
          >
            全部
          </Button>
          <Button
            size="small"
            type="default"
            className={`"classifyBtn"${active === "SHOW_COMPLETED" ? "active" : null}`}
            onClick={() => showStatusList("SHOW_COMPLETED")}
          >
            已完成
          </Button>
          <Button
            size="small"
            type="default"
            className={`"classifyBtn"${active === "SHOW_ACTIVE" ? "active" : null}`}
            onClick={() => showStatusList("SHOW_ACTIVE")}
          >
            未完成
          </Button>
        </div>
      </div>
    );
  })

  export default TodoHeader