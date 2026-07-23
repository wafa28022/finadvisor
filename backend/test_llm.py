from llm import get_ai_response

if __name__ == "__main__":
    
    # On simule une conversation vide pour le premier message
    historique = []
    
    # On envoie un message test
    message = "Bonjour, mon salaire est 2000€ et je dépense 1700€ par mois."
    
    print("Message envoyé à Groq...")
    print("-" * 40)
    
    reponse = get_ai_response(message, historique)
    
    print("Réponse de FinAdvisor :")
    print(reponse)