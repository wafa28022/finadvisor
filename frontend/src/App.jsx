import { useState } from "react"
import Chat from "./components/Chat"
import FinanceForm from "./components/FinanceForm"
import Charts from "./components/Charts"

function App() {

  const [financeData, setFinanceData] = useState({
    revenu: 0,
    depenses: 0,
    dettes_mensuelles: 0,
    fond_urgence: 0
  })

  const [stats, setStats] = useState(null)

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">

      {/* Header */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <h1 className="text-white text-2xl font-bold text-center">
          FinAdvisor 💰
        </h1>
        <p className="text-gray-400 text-center text-sm mt-1">
          Ton conseiller financier personnel
        </p>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-1 gap-4 p-4">
        <FinanceForm
          financeData={financeData}
          setFinanceData={setFinanceData}
        />
        <Chat
          financeData={financeData}
          setStats={setStats}
        />
      </div>

      {/* Graphiques */}
      <Charts financeData={financeData} stats={stats} />

    </div>
  )
}

export default App