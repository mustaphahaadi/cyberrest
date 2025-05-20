import Header from "../components/Header"
import Footer from "../components/Footer"
import Error404 from "../components/Error404"

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Error404 />
      </main>
      <Footer />
    </div>
  )
}

export default NotFoundPage
