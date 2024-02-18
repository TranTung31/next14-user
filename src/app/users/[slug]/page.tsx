function UserDetail({ params }: { params: { slug: string } }) {
  return (
    <div style={{ margin: '10px 0' }}>User Detail {params?.slug}</div>
  )
}

export default UserDetail