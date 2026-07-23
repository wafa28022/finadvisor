from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from llm import get_ai_response
from finance import calculer_taux_epargne, calculer_projection, calculer_score_sante

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class FinanceData(BaseModel):
    revenu: float = 0
    depenses: float = 0
    dettes_mensuelles: float = 0
    fond_urgence: float = 0

class MessageRequest(BaseModel):
    message: str
    history: list
    finance_data: FinanceData = FinanceData()

@app.get("/health")
def health_check():
    return {"status": "FinAdvisor is running"}

@app.post("/chat")
def chat(request: MessageRequest):
    
    # Étape 1 — On calcule les stats financières
    taux = calculer_taux_epargne(
        request.finance_data.revenu,
        request.finance_data.depenses
    )
    
    projection = calculer_projection(
        taux["epargne_mensuelle"], 10
    )
    
    score = calculer_score_sante(
        request.finance_data.revenu,
        request.finance_data.depenses,
        request.finance_data.dettes_mensuelles,
        request.finance_data.fond_urgence
    )
    
    # Étape 2 — On construit le contexte financier
    contexte = f"""
    Contexte financier calculé automatiquement :
    - Revenu mensuel : {request.finance_data.revenu}DT
    - Dépenses mensuelles : {request.finance_data.depenses}DT
    - Épargne mensuelle : {taux['epargne_mensuelle']}DT
    - Taux d'épargne : {taux['taux_epargne']}% ({taux['evaluation']})
    - Projection sur 10 ans : {projection['capital_final']}DT
    - Intérêts gagnés : {projection['interets_gagnes']}DT
    - Score de santé financière : {score['score']}/100 ({score['evaluation']})
    - Détails : {', '.join(score['details'])}
    """
    
    # Étape 3 — On enrichit le message avec le contexte
    message_enrichi = f"{request.message}\n\n{contexte}"
    
    # Étape 4 — On envoie à Groq
    reponse = get_ai_response(message_enrichi, request.history)
    
    return {
        "response": reponse,
        "stats": {
            "taux_epargne": taux,
            "projection": projection,
            "score": score
        }
    }
    
    