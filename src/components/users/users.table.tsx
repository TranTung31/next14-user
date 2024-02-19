'use client'

import { IUser } from "@/types/backend"
import { Table } from "antd"
import type { TableProps } from 'antd'

interface IProps {
  users: IUser[] | [];
}

function UsersTable(props: IProps) {
  const { users } = props

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
  ]

  return (
    <div>
      <Table
        rowKey='id'
        dataSource={users}
        columns={columns}
        bordered
        pagination={
          {
            current: 1,
            pageSize: 10,
            total: 20,
            showTotal: (total, range) => (
              <div>{range[0]} - {range[1]} trên {total}</div>
            )
          }
        }
      />
    </div>
  )
}

export default UsersTable