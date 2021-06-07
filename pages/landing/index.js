import Header from '../../components/Landing/Header'
import Banner from '../../components/Landing/Banner'

const Landing = () => {
  return (
    <div>
      <div className="h-screen flex flex-col">
        <Header />
        <Banner />
      </div>
      <main>
        <h1>test</h1>
      </main>
    </div>
  )
}

export default Landing
