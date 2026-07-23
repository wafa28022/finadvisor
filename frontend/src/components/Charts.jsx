import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

function Charts({ financeData, stats }) {

  // Si pas de données encore → on affiche rien
  if (!stats) return null

  // Données pour le graphique camembert (budget)
  const budgetData = [
    { name: "Épargne", value: stats.taux_epargne.epargne_mensuelle },
    { name: "Dépenses", value: financeData.depenses },
    { name: "Dettes", value: financeData.dettes_mensuelles }
  ]

  // Couleurs du camembert
  const COLORS = ["#22c55e", "#3b82f6", "#ef4444"]

  // Données pour le graphique de projection (ligne)
  const projectionData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(annee => ({
    annee: `${annee}a`,
    avec_interets: Math.round(stats.taux_epargne.epargne_mensuelle * annee * 12 * (1 + 0.05 * annee)),
    sans_interets: stats.taux_epargne.epargne_mensuelle * annee * 12
  }))

  return (
    <div className="flex flex-col gap-6 p-4">

      <h2 className="text-white text-xl font-bold">
        📈 Analyse Visuelle
      </h2>

      <div className="flex gap-6 flex-wrap">

        {/* Graphique 1 — Répartition du budget */}
        <div className="bg-gray-800 rounded-xl p-6 flex-1 min-w-72">
          <h3 className="text-white font-bold mb-4">
            💰 Répartition du budget
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value} DT`}
              >
                {budgetData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Graphique 2 — Projection d'épargne */}
        <div className="bg-gray-800 rounded-xl p-6 flex-1 min-w-72">
          <h3 className="text-white font-bold mb-4">
            📊 Projection sur 10 ans (DT)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={projectionData}>
              <XAxis dataKey="annee" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="avec_interets"
                stroke="#22c55e"
                name="Avec intérêts"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="sans_interets"
                stroke="#3b82f6"
                name="Sans intérêts"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Score de santé financière */}
        <div className="bg-gray-800 rounded-xl p-6 flex-1 min-w-72">
          <h3 className="text-white font-bold mb-4">
            🏥 Score de santé financière
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Score global</span>
              <span className="text-white font-bold text-2xl">
                {stats.score.score}/100
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="h-4 rounded-full"
                style={{
                  width: `${stats.score.score}%`,
                  backgroundColor: stats.score.score >= 80 ? "#22c55e" : stats.score.score >= 50 ? "#f59e0b" : "#ef4444"
                }}
              />
            </div>
            <div className="flex flex-col gap-2 mt-2">
              {stats.score.details.map((detail, index) => (
                <p key={index} className="text-gray-300 text-sm">{detail}</p>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Charts