export default function Id({ params }: { params: { id: string } }) {
    return <h1>My Page: { params.id}</h1>
  }