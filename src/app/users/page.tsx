import UsersTable from "@/components/users/users.table";

const UserPage = async (props: any) => {
  const { searchParams } = props

  const LIMIT = 1
  const PAGE = searchParams?.page

  // Fetching data ở phía server, sau đó truyền data xuống component con UsersTable
  // Component UsersTable chỉ nhận data và xử lý logic (Không fetching data ở phía client)
  const res = await fetch(`http://localhost:8000/users?_page=${PAGE}&_limit=${LIMIT}`, {
    method: 'GET'
  })

  const data = await res.json()

  return (
    <div style={{ margin: '20px 0' }}>
      <UsersTable users={data || []}/>
    </div>
  )
}

export default UserPage