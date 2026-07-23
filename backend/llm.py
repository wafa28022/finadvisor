import os
from dotenv import load_dotenv
from groq import Groq

# Charge les variables du fichier .env
load_dotenv()

# Crée la connexion avec Groq
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def get_ai_response(user_message: str, chat_history: list) -> str:
    
    # La personnalité et le rôle du chatbot
    system_prompt = """
    Tu es FinAdvisor, un conseiller financier personnel intelligent.
    Tu analyses la situation financière de l'utilisateur et tu donnes
    des conseils clairs, précis et bienveillants.
    Tu poses des questions pour mieux comprendre la situation.
    Tu communiques toujours en français.
    """
    
    # Construction de la liste complète des messages
    messages = [{"role": "system", "content": system_prompt}]
    
    # On ajoute l'historique de la conversation
    messages.extend(chat_history)
    
    # On ajoute le nouveau message de l'utilisateur
    messages.append({"role": "user", "content": user_message})
    
    # On envoie tout ça à Groq et on attend la réponse
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        temperature=0.7,
        max_tokens=1024
    )
    
    # On extrait juste le texte de la réponse
    return response.choices[0].message.content