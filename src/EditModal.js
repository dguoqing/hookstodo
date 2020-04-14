import { Modal, Button,Form,Input } from 'antd';
import React,{useEffect,useState,memo} from 'react'


const EditModal = memo(({handleCancel,handleOk,visible,editItem}) => {
    
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue(editItem)
    },[editItem])
    return <div>
    <Modal
    getContainer={false}
      title="编辑饮品"
      visible={visible}
      onOk={() => {handleCancel(); handleOk(form.getFieldsValue(),editItem) }}
      onCancel={handleCancel}
    >
      <Form
      form={form}
      name='edit'
     
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
      </Form>
    </Modal>
  </div>
})


export default EditModal