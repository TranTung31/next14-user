'use client'

import { IUser } from "@/types/backend"
import { Table } from "antd"
import type { TableProps } from 'antd'
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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

  const { users, meta } = props

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  useEffect(() => {
    if (users) setIsLoading(false)
  }, [users])

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
    </div>
  )
}

export default UsersTable