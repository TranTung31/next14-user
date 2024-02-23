export default function Home() {
  async function create(formData: FormData) {
    'use server'
    console.log('data: ', formData.get('username'))
  }

  return (
    <div style={{ margin: '20px 0' }}>
      Home Page
      <form action={create}>
        <input name="username" type="text" />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
