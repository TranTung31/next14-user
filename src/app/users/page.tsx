import UsersTable from "@/components/users/users.table"

const UserPage = async (props: any) => {
  const { searchParams } = props

  const calculatePagesCount = (pageSize: number, totalCount: number) => {
    return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize)
  }

  const LIMIT = 1
  const PAGE = searchParams?.page ?? 1

  // Fetching data ở phía server, sau đó truyền data xuống component con UsersTable
  // Component UsersTable chỉ nhận data và xử lý logic (Không fetching data ở phía client)
  const res = await fetch(`http://localhost:8000/users?_page=${PAGE}&_limit=${LIMIT}`, {
    method: 'GET'
  })

  // Dấu + giúp biến string thành number
  const totalUser = +(res.headers?.get('X-Total-Count') ?? 0)
  const totalPage = calculatePagesCount(LIMIT, totalUser)

  const data = await res.json()

  return (
    <div style={{ margin: '20px 0' }}>
      <UsersTable
        users={data || []}
        meta={{
          current: +PAGE,
          pageSize: LIMIT,
          total: totalUser
        }}
      />
    </div>
  )
}

export default UserPage