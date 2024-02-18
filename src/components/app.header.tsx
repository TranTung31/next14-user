'use client'

import { AppstoreOutlined, HomeFilled, MailOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'

const items: MenuProps['items'] = [
  {
    label: <Link href='/'>Home</Link>,
    key: 'home',
    icon: <HomeFilled />,
  },
  {
    label: <Link href='/users'>Manage User</Link>,
    key: 'user',
    icon: <MailOutlined />,
  },
  {
    label: <Link href='/blogs'>Manage Blog</Link>,
    key: 'blog',
    icon: <AppstoreOutlined />,
  }
]

const AppHeader: React.FC = () => {
  const [current, setCurrent] = useState('home')

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
}

export default AppHeader