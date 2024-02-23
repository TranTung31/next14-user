'use client'

import { IUser } from "@/types/backend"
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { Button, Popconfirm, Table, message } from "antd"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import CreateUser from "./create.user"
import UpdateUser from "./update.user"
import { handleDeleteUser } from "@/app/actions"

interface IProps {
  users: IUser[] | [];
  meta: {
    current: number;
    pageSize: number;
    total: number;
  }
}

function UsersTable(props: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [dataUpdate, setDataUpdate] = useState<any>(null)

  const { users, meta } = props

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  useEffect(() => {
    if (users) setIsLoading(false)
  }, [users])

  const renderHeader = () => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <h3>Table User</h3>
        <Button type="primary" onClick={() => setIsCreateModalOpen(true)}>Add User</Button>
      </div>
    )
  }

  const handleDelete = async (record: any) => {
    await handleDeleteUser(record?.id)
    message.success('Delete user success!')
  }

  const columns: TableProps<IUser>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <div style={{ fontSize: '20px' }}>
            <EditTwoTone
              twoToneColor="#f57800" style={{ cursor: "pointer", marginRight: 20 }}
              onClick={() => {
                setDataUpdate(record)
                setIsUpdateModalOpen(true)
              }}
            />

            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa user"}
              description={"Bạn có chắc chắn muốn xóa user này?"}
              onConfirm={() => handleDelete(record)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer" }}>
                <DeleteTwoTone twoToneColor="#ff4d4f" />
              </span>
            </Popconfirm>
          </div>
        )
      }
    }
  ]

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams)
      params.set('page', pagination.current)
      replace(`${pathname}?${params.toString()}`)
      setIsLoading(true)
    }
  }

  return (
    <div>
      <Table
        title={renderHeader}
        loading={isLoading}
        rowKey='id'
        dataSource={users}
        columns={columns}
        bordered
        pagination={
          {
            ...meta,
            showTotal: (total, range) => (
              <div>{range[0]} - {range[1]} trên {total}</div>
            )
          }
        }
        onChange={onChange}
      />

      <CreateUser isCreateModalOpen={isCreateModalOpen} setIsCreateModalOpen={setIsCreateModalOpen} />

      <UpdateUser
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </div>
  )
}

export default UsersTable