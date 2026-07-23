from finance import calculer_taux_epargne, calculer_projection, calculer_score_sante

# Test 1
print("=== TAUX D'ÉPARGNE ===")
resultat = calculer_taux_epargne(2000, 1700)
print(resultat)

# Test 2
print("\n=== PROJECTION 10 ANS ===")
projection = calculer_projection(300, 10)
print(projection)

# Test 3
print("\n=== SCORE DE SANTÉ ===")
score = calculer_score_sante(2000, 1700, dettes_mensuelles=0, fond_urgence=5000)
print(score)