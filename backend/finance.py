import numpy as np

def calculer_taux_epargne(revenu: float, depenses: float) -> dict:
    
    epargne_mensuelle = revenu - depenses
    taux = (epargne_mensuelle / revenu) * 100
    
    # Évaluation qualitative
    if taux < 10:
        evaluation = "Dangereux — tu dépenses presque tout ce que tu gagnes"
    elif taux < 20:
        evaluation = "Correct — mais tu peux faire mieux"
    else:
        evaluation = "Excellent — tu épargnes bien"
    
    return {
        "epargne_mensuelle": round(epargne_mensuelle, 2),
        "taux_epargne": round(taux, 2),
        "evaluation": evaluation
    }
    
def calculer_projection(epargne_mensuelle: float, 
                        annees: int, 
                        taux_interet_annuel: float = 0.05) -> dict:
    
    taux_mensuel = taux_interet_annuel / 12
    mois = annees * 12
    
    # Avec intérêts composés
    capital_avec_interets = epargne_mensuelle * ((1 + taux_mensuel)**mois - 1) / taux_mensuel
    
    # Sans intérêts (simple addition)
    capital_sans_interets = epargne_mensuelle * mois
    
    # Les intérêts générés
    interets_gagnes = capital_avec_interets - capital_sans_interets
    
    return {
        "annees": annees,
        "capital_final": round(capital_avec_interets, 2),
        "capital_sans_interets": round(capital_sans_interets, 2),
        "interets_gagnes": round(interets_gagnes, 2)
    }
    
def calculer_score_sante(revenu: float, 
                         depenses: float, 
                         dettes_mensuelles: float = 0,
                         fond_urgence: float = 0) -> dict:
    
    score = 0
    details = []
    
    # Critère 1 — Taux d'épargne (40 points maximum)
    taux_epargne = ((revenu - depenses) / revenu) * 100
    
    if taux_epargne >= 20:
        score += 40
        details.append("✅ Excellent taux d'épargne")
    elif taux_epargne >= 10:
        score += 20
        details.append("⚠️ Taux d'épargne correct mais améliorable")
    else:
        score += 0
        details.append("❌ Taux d'épargne trop faible")
    
    # Critère 2 — Ratio dettes/revenu (30 points maximum)
    ratio_dettes = (dettes_mensuelles / revenu) * 100
    
    if ratio_dettes == 0:
        score += 30
        details.append("✅ Aucune dette")
    elif ratio_dettes <= 30:
        score += 15
        details.append("⚠️ Dettes gérables")
    else:
        score += 0
        details.append("❌ Dettes trop élevées par rapport au revenu")
    
    # Critère 3 — Fond d'urgence (30 points maximum)
    # Un bon fond d'urgence = 6 mois de dépenses
    fond_recommande = depenses * 6
    
    if fond_urgence >= fond_recommande:
        score += 30
        details.append("✅ Fond d'urgence suffisant")
    elif fond_urgence >= fond_recommande / 2:
        score += 15
        details.append("⚠️ Fond d'urgence insuffisant — continue à épargner")
    else:
        score += 0
        details.append("❌ Pas de fond d'urgence — priorité absolue")
    
    # Évaluation globale
    if score >= 80:
        evaluation = "Excellente santé financière"
    elif score >= 50:
        evaluation = "Santé financière correcte"
    else:
        evaluation = "Santé financière fragile — des améliorations sont nécessaires"
    
    return {
        "score": score,
        "evaluation": evaluation,
        "details": details
    }