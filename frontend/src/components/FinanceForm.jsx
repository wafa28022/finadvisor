function FinanceForm({ financeData, setFinanceData }) {
  
  const handleChange = (e) => {
    setFinanceData({
      ...financeData,
      [e.target.name]: parseFloat(e.target.value) || 0
    })
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl w-72">
      
      <h2 className="text-white text-xl font-bold mb-6">
        📊 Ma Situation
      </h2>

      <div className="flex flex-col gap-4">

        <div>
          <label className="text-gray-400 text-sm">Revenu mensuel (DT)</label>
          <input
            type="number"
            name="revenu"
            value={financeData.revenu}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-gray-400 text-sm">Dépenses mensuelles (DT)</label>
          <input
            type="number"
            name="depenses"
            value={financeData.depenses}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-gray-400 text-sm">Dettes mensuelles (DT)</label>
          <input
            type="number"
            name="dettes_mensuelles"
            value={financeData.dettes_mensuelles}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-gray-400 text-sm">Fond d'urgence (DT)</label>
          <input
            type="number"
            name="fond_urgence"
            value={financeData.fond_urgence}
            onChange={handleChange}
            className="w-full bg-gray-700 text-white rounded-lg p-2 mt-1"
          />
        </div>

      </div>
    </div>
  )
}

export default FinanceForm