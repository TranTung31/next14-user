'use server'

import { revalidateTag } from 'next/cache'

export const handleCreateUser = async (value: any) => {
  const res = await fetch('http://localhost:8000/users', {
    method: 'POST',
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
    }
  })

  revalidateTag('list-users')
  return await res.json()
}

export const handleUpdateUser = async (value: any) => {
  const res = await fetch(`http://localhost:8000/users/${value.id}`, {
    method: 'PUT',
    body: JSON.stringify(value),
    headers: {
      "Content-Type": "application/json",
    }
  })

  revalidateTag('list-users')
  return await res.json()
}

export const handleDeleteUser = async (value: any) => {
  const res = await fetch(`http://localhost:8000/users/${value}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    }
  })

  revalidateTag('list-users')
  return await res.json()
}