function BlogDetail(props: any) {
  const { params } = props
  return (
    <div style={{ margin: '10px 0' }}>Blog Detail {params?.slug}</div>
  )
}

export default BlogDetail