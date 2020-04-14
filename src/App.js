
import './App.css';

import React, { useState, useEffect,useCallback,useMemo } from "react";
import { CheckSquareOutlined,SnippetsOutlined,CloseOutlined,EditOutlined } from '@ant-design/icons';
import TodoHeader from './TodoHeader'
import EditModal from './EditModal'


import { Input, List, Button,Form} from "antd";

const { Search } = Input;

const App = () =>  {
  //  data - 完整的 todo 数据
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [showArr, setShowArr] = useState([...data]);
  const [visible,setVisible] = useState(false)
  const [editItem,setEditItem] = useState(false)

  // 当 data 发生改变时，执行该 effect，替换 showArr
  useEffect(() => {
    setShowArr([...data]);
  }, [data]);

  // 实现任务输入框的双向绑定
  const [inputValue, setInputValue] = useState("");

  // 控制当前展示任务按钮样式 active
  const [active, setActive] = useState("SHOW_ALL");

  const onFinish = ({name,price}) => {
    const newData = [...data];
    newData.push({
      id: Date.now(),
      name,
      price,
      isDone: false,
      dataTime: new Date()
    });
    setData(newData);
    form.resetFields();
  }

  const showStatusList = useCallback((showStatus) => {
    
      if (showStatus === "SHOW_COMPLETED") {
        const newData = data.filter(item => item.isDone);
        setShowArr([...newData]);
        setActive("SHOW_COMPLETED");
      } else if (showStatus === "SHOW_ACTIVE") {
        const newData = data.filter(item => !item.isDone);
        setShowArr([...newData]);
        setActive("SHOW_ACTIVE");
      } else {
        setShowArr([...data]);
        setActive("SHOW_ALL");
      }
    
  })

  const finishTodo = (id) => {
    const newData = [...data];
    const index = newData.findIndex(item => item.id === id);
    newData[index].isDone = true;
    setData(newData);
  }

  const toggleTodo = (id) =>  {
    const newData = [...data];
    const index = newData.findIndex(item => item.id === id);
    newData[index].isDone = !newData[index].isDone;
    setData(newData);
  }

  const deleteTodo = (id) => {
    const newData = [...data];
    const index = newData.findIndex(item => item.id === id);
    newData.splice(index, 1);
    setData(newData);
  }

  const edit = (v) => {
    setVisible(true)
    setEditItem(v)
  }
  const handleOk = useCallback((value,{id}) => {
    let newData = data.map(item => {
      if(item.id == id){
        return {
          ...item,...value
        }
      }
      return {...item}
    })
    setData(newData)
  })
  const handleCancel = useCallback(() => {
    setVisible(false)
  })
  return (
    <div className="todoList">
      <div className="todoHeader">
        <h1 className="card-title">React Hooks</h1>
        <span className="card-subtitle">添加饮品，管理dailydrinks</span>
      </div>
      <div className="todoSearch">
      <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
       <Form.Item
        label="饮品"
        name="name"
        rules={[
          {
            required: true,
            message: '请输入饮料名！',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="价格"
        name="price"
        rules={[
          {
            required: true,
            message: '请输入价格！',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit">
          添加饮品
        </Button>
      </Form.Item>
      </Form>
      </div>
      <div className="todoMain">
        <List
          header={<TodoHeader showStatusList={showStatusList} active={active} />}
          footer={
            <div className="mainFooter">共 {showArr.length} 项任务</div>
          }
          bordered
          dataSource={showArr}
          renderItem={item => (
            <List.Item>
              <Button
                size="small"
                type={item.isDone ? "primary" : "danger"}
                className="status"
              >
                {item.isDone ? "完成" : "未完成"}
              </Button>
              <p className="content">饮料名称:{item.name}</p>
              <p className="content">价格:{item.price}</p>
              <div className="operate">
                
                {item.isDone ? (
                  ""
                ) : (
                  <CheckSquareOutlined fill='green'  onClick={() => finishTodo(item.id)}/>
                )}
                <EditOutlined style={{margin:'0 0 0 10px'}}  onClick={() => edit(item)} />
                <SnippetsOutlined style={{margin:'0 10px'}}  onClick={() => toggleTodo(item.id)}/>
                <CloseOutlined fill='red' onClick={() => deleteTodo(item.id)} />
              
              </div>
            </List.Item>
          )}
        />
      </div>
      <EditModal visible={visible} handleOk={handleOk} editItem={editItem} handleCancel={handleCancel}/>
    </div>
  );
}

export default App
