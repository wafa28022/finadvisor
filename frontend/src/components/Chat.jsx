import { useState } from "react"
import axios from "axios"

function Chat({ financeData, setStats }) {

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {

    // Si le message est vide on ne fait rien
    if (!input.trim()) return

    // On ajoute le message de l'utilisateur à la conversation
    const userMessage = { role: "user", content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
    const response = await axios.post("https://finadvisor-backend-7bk2.onrender.com/chat", {
        message: input,
        history: messages,
        finance_data: financeData
    })

    const botMessage = {
        role: "assistant",
        content: response.data.response
    }
    setMessages([...newMessages, botMessage])

    // On envoie les stats à App.jsx pour les graphiques
    setStats(response.data.stats)

    } catch (error) {
    console.error("Erreur :", error)
    }finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-800 rounded-xl p-6">

      <h2 className="text-white text-xl font-bold mb-6">
        💬 FinAdvisor Chat
      </h2>

      {/* Zone des messages */}
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto mb-4">

        {messages.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            Bonjour ! Remplis ta situation financière à gauche 
            puis pose-moi une question 👋
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl max-w-xl text-sm ${
              msg.role === "user"
                ? "bg-blue-600 text-white self-end"
                : "bg-gray-700 text-gray-100 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="bg-gray-700 text-gray-400 p-3 rounded-xl self-start text-sm">
            FinAdvisor réfléchit...
          </div>
        )}

      </div>

      {/* Zone de saisie */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Pose ta question financière..."
          className="flex-1 bg-gray-700 text-white rounded-lg p-3 text-sm"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-lg font-bold hover:bg-blue-700"
        >
          Envoyer
        </button>
      </div>

    </div>
  )
}

export default Chat