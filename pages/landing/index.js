import Header from '../../components/Landing/Header'
import Banner from '../../components/Landing/Banner'
import LandingSpaces from '../../components/Landing/LandingSpaces'

const Landing = ({ data }) => {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Banner />
      </div>
      <main>
        <LandingSpaces data={data} />
      </main>
    </div>
  )
}

export const getStaticProps = async (ctx) => {
  return {
    props: {
      data: [
        {
          spaceName: 'UW Math 2025',
          description:
            'finals grind, upper years available in chat for help with past exams',
          headCount: '17',
          music: 'lofi 2',
        },
        {
          spaceName: "Capstone Grind '25",
          description:
            'writing your report, making your presentation, setting up data',
          headCount: '23',
          music: 'cafe beats eng edition F21',
        },
        {
          spaceName: 'UW Math 2025',
          description:
            '3rd and 4th years offering help in MSCI, GENE, MATH, and CS',
          headCount: '8',
          music: 'none',
        },
      ],
    },
  }
}

export default Landing
