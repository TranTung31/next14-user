import { handleCreateUser } from "@/app/actions";
import { Col, Form, Input, Modal, Row, message } from "antd"

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (value: boolean) => any;
}

function CreateUser(props: IProps) {
  const { isCreateModalOpen, setIsCreateModalOpen } = props

  const [form] = Form.useForm()

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false)
  }

  const onFinish = async (value: any) => {
    const res = await handleCreateUser(value)
    if (res?.id) {
      form.resetFields()
      handleCloseCreateModal()
      message.success('Create user success!')
    }
  }

  return (
    <div>
      <Modal
        title="Add a new user"
        open={isCreateModalOpen}
        onOk={() => form.submit()}
        onCancel={() => handleCloseCreateModal()}
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

export default CreateUser