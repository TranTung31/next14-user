import { handleCreateUser, handleUpdateUser } from "@/app/actions";
import { Col, Form, Input, Modal, Row, message } from "antd"
import { useEffect } from "react";

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (value: boolean) => any;
  dataUpdate: any;
  setDataUpdate: (value: any) => any;
}

function UpdateUser(props: IProps) {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props

  const [form] = Form.useForm()

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate?.name,
        email: dataUpdate?.email
      })
    }
  }, [dataUpdate])

  const handleCloseUpdateModal = () => {
    setDataUpdate(null)
    setIsUpdateModalOpen(false)
  }

  const onFinish = async (value: any) => {
    const { name, email } = value
    if (dataUpdate) {
      const data = {
        id: dataUpdate?.id,
        name,
        email
      }
      await handleUpdateUser(data)
      handleCloseUpdateModal()
      message.success('Update user success!')
    }
  }

  return (
    <div>
      <Modal
        title="Update user"
        open={isUpdateModalOpen}
        onOk={() => form.submit()}
        onCancel={() => handleCloseUpdateModal()}
        maskClosable={false}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          layout="vertical"
          form={form}
        >
          <Row gutter={[15, 15]}>
            <Col span={24} md={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input type='email' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default UpdateUser