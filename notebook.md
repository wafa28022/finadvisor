# 📓 FinAdvisor — Mon Journal d'Apprentissage

## 🗓️ Session 1 — Le cerveau de l'app (llm.py)

### Ce qu'on a construit
Le fichier `llm.py` — la connexion entre notre app et l'IA Groq.

### Ce que j'ai appris

**Les environnements virtuels (venv)**
Une boîte isolée pour chaque projet Python.
Ce qu'on installe dedans ne touche pas le reste de l'ordi.
Commande : `python -m venv nom_env` puis `nom_env\Scripts\activate`

**Le fichier .env**
Un fichier secret pour stocker les clés API.
On ne le met jamais sur GitHub.
On lit les valeurs avec : `os.getenv("MA_CLE")`

**Les imports**
Avant d'utiliser une bibliothèque, on l'importe :
`from groq import Groq` → j'ai besoin de cet outil, va le chercher

**Le client Groq**
`client = Groq(api_key=...)` → crée une connexion avec les serveurs Groq
C'est notre "téléphone" vers l'IA

**La fonction get_ai_response()**
Prend un message + un historique
Envoie tout à Groq
Retourne la réponse en texte

**Le system prompt**
L'instruction secrète qu'on donne au modèle avant que l'utilisateur écrive.
C'est ici qu'on définit la personnalité du chatbot.

**La structure des messages**
Groq attend une liste de messages avec des rôles :
- system → les instructions secrètes
- user → ce que l'utilisateur écrit  
- assistant → ce que le chatbot a répondu

**temperature**
Contrôle la créativité du modèle.
0 = très rigide / 1 = très créatif / 0.7 = équilibre parfait

**max_tokens**
Limite la longueur de la réponse.
1 token ≈ 1 mot

### L'architecture du projet



Utilisateur → React → FastAPI → Groq → FastAPI → React → Utilisateur


- React = la salle du restaurant (ce que l'utilisateur voit)
- FastAPI = la cuisine (la logique)
- Groq/LLaMA = le chef (l'intelligence)

### Pourquoi pas LangChain ?
LangChain simplifie mais cache ce qui se passe dessous.
On construit manuellement pour vraiment comprendre.
LangChain s'apprend facilement après avoir maîtrisé les bases.

### Pourquoi Groq et pas Ollama ?
Ollama = modèle sur ton ordi (lourd, pas déployable en ligne)
Groq = modèle sur leurs serveurs (rapide, gratuit, déployable partout)

### Erreurs rencontrées et solutions
❌ `ModuleNotFoundError: No module named 'dotenv'`
✅ Le venv n'était pas bien activé — conflit entre conda et venv
✅ Solution : appeler directement `envi2\Scripts\python.exe fichier.py`

❌ Modèle `llama3-8b-8192` retiré de Groq
✅ Remplacé par `llama-3.3-70b-versatile` (encore mieux — 70B paramètres)

### Résultat final
✅ Groq répond correctement en français
✅ Le chatbot analyse les chiffres financiers et pose des questions intelligentes

## 🗓️ Session 2 — Le serveur FastAPI (main.py)

### Ce que j'ai appris

**Les routes**
Une route = une adresse = une action.
`/health` → vérifie si le serveur tourne
`/chat` → reçoit les messages et répond

**GET vs POST**
GET → demander une information (pas de données envoyées)
POST → envoyer des données pour traitement

**CORS**
Permission pour que React (port 3000) parle à FastAPI (port 8000)
Sans ça, le navigateur bloque la communication

**Pydantic**
Valide automatiquement les données reçues
Si les données sont mauvaises → FastAPI rejette la requête

**Les décorateurs**
`@app.get("/health")` → connecte une adresse à une fonction
`@app.post("/chat")` → même chose mais pour POST

**Middleware**
S'exécute avant chaque requête — comme un agent de sécurité

### Résultat final
✅ Serveur FastAPI tourne sur localhost:8000
✅ Route /health retourne {"status": "FinAdvisor is running"}
✅ Route /chat connectée à llm.py et Groq

## 🗓️ Session 3 — Le moteur financier (finance.py)

### Ce que j'ai appris

**Les fonctions pures**
Une fonction = un seul calcul
Facile à modifier sans casser le reste

**Le taux d'épargne**
taux = ((revenu - depenses) / revenu) × 100
Moins de 10% → dangereux
10% à 20% → correct
Plus de 20% → excellent

**Les intérêts composés**
capital = epargne × ((1 + taux_mensuel)^mois - 1) / taux_mensuel
L'argent génère de l'argent sur le long terme
300€/mois pendant 10 ans = 46,584€ au lieu de 36,000€

**Le score de santé financière**
Score sur 100 basé sur 3 critères :
- Taux d'épargne (40 points)
- Ratio dettes/revenu (30 points)
- Fond d'urgence (30 points)

**Valeurs par défaut**
def fonction(parametre: float = 0)
Si personne ne précise → Python utilise 0 automatiquement

**list.append()**
Ajoute un élément à la fin d'une liste

### Résultats des tests
✅ Taux d'épargne : 15% — correct
✅ Projection 10 ans : 46,584€ avec intérêts
✅ Score santé : 50/100

### Prochaine étape
Connecter finance.py à main.py pour que
Groq reçoive les vrais chiffres calculés

## 🗓️ Session 4 — Connexion de tout le backend

### Ce que j'ai appris

**L'injection de contexte**
Technique clé en développement IA.
On enrichit le message de l'utilisateur avec
les stats calculées avant d'envoyer à Groq.
Résultat : des réponses précises et personnalisées.

**Les f-strings**
Façon d'insérer des variables dans un texte :
f"Taux : {taux['taux_epargne']}%"
→ "Taux : 15%"

**finance_data: FinanceData = FinanceData()**
Valeur par défaut pour un objet Pydantic.
Si React n'envoie pas les données → tout à zéro.

**Le retour enrichi**
On renvoie maintenant deux choses à React :
- response → la réponse du chatbot
- stats → les chiffres pour les graphiques

### Résultat final
✅ Backend complet et testé
✅ Groq reçoit les vrais chiffres calculés
✅ Réponses personnalisées et précises
✅ Stats disponibles pour les graphiques React

### Prochaine étape
Construire le frontend React + Tailwind


## 🗓️ Session 5 — Frontend React

### Ce que j'ai appris

**Les composants React**
Chaque composant = une fonction qui retourne du JSX
Un fichier = un composant = une responsabilité

**Les props**
Données envoyées d'un parent vers un enfant
{ financeData, setFinanceData } = props reçues

**useState**
La mémoire d'un composant
[valeur, setValeur] = useState(valeurInitiale)

**Lifting state up**
Le state partagé entre composants va dans le parent commun
App.jsx possède financeData
FinanceForm la modifie / Chat la lit

**async/await**
Pour les opérations qui prennent du temps
await axios.post(...) attend la réponse de FastAPI

**try/catch/finally**
try → essaie ce code
catch → si erreur, fais ça
finally → dans tous les cas, fais ça

**Le spread operator (...)**
Copie tout un objet puis modifie un seul champ
{ ...financeData, revenu: 3000 }

**Erreur CORS port**
allow_origins doit correspondre exactement
au port de React — Vite utilise 5173 pas 3000

### Résultat
✅ App complète qui fonctionne
✅ Chat connecté à Groq via FastAPI
✅ Données financières injectées dans les réponses
✅ Interface propre avec Tailwind

### Outils utilisés

**Vite**
Outil qui génère automatiquement la structure d'un projet React
Comme un modèle de maison — tu pars d'une base déjà prête
Commande : npm create vite@latest frontend -- --template react
Tourne sur http://localhost:5173

**Tailwind CSS**
Bibliothèque de styles CSS
On stylise directement dans le JSX avec des classes
bg-gray-900 → fond gris foncé
text-white → texte blanc
flex, gap, p, rounded → mise en page rapide
Import : @import "tailwindcss" dans index.css

**Axios**
Bibliothèque pour envoyer des requêtes HTTP depuis React
axios.post(url, données) → envoie un POST à FastAPI
Plus simple que le fetch natif de JavaScript

**npm**
Gestionnaire de paquets JavaScript
Comme pip mais pour JavaScript
npm install → installe les dépendances
npm run dev → lance le serveur de développement

**JSX**
Syntaxe React — du HTML dans du JavaScript
Différence principale : class → className
Permet d'écrire l'interface directement dans le code


## 🗓️ Session 6 — Les graphiques (Charts.jsx)

### Ce que j'ai appris

**Recharts**
Bibliothèque de graphiques pour React
Composants disponibles :
- PieChart → camembert
- LineChart → graphique en ligne
- ResponsiveContainer → s'adapte à l'écran

**ResponsiveContainer**
Rend les graphiques responsives automatiquement
width="100%" height={250}

**Génération de données dynamiques**
.map() pour créer les données de projection
année par année de 0 à 10

**Barre de progression dynamique**
style={{ width: `${score}%` }}
La largeur change selon le score en temps réel

**Lifting state up (suite)**
stats remonte de Chat.jsx → App.jsx → Charts.jsx
setStats passé comme prop à Chat
stats passé comme prop à Charts

**if (!stats) return null**
Affiche les graphiques seulement quand
les données sont disponibles

### Résultat
✅ 3 graphiques fonctionnels
✅ Données en temps réel depuis FastAPI
✅ Interface complète et professionnelle

## 🗓️ Session 7 — Déploiement

### Ce que j'ai appris

**Git**
Système de versioning — sauvegarde l'historique du code
git init → initialise un dépôt
git add . → ajoute tous les fichiers
git commit -m "..." → sauvegarde une version
git push → envoie sur GitHub

**.gitignore**
Fichiers à ne jamais envoyer sur GitHub :
- .env → clés secrètes
- envi2/ → environnement virtuel
- node_modules/ → dépendances JS

**Render**
Héberge le backend FastAPI gratuitement
Lit requirements.txt et installe automatiquement
Variables d'environnement = équivalent du .env
Free tier → s'endort après 15min d'inactivité

**Vercel**
Héberge le frontend React gratuitement
Se connecte à GitHub et déploie automatiquement
vercel.json → configure le build

**CORS en production**
allow_origins doit contenir l'URL Vercel exacte
Sinon le navigateur bloque la communication

### Liens finaux
Frontend → https://finadvisor-alpha.vercel.app
Backend  → https://finadvisor-backend-7bk2.onrender.com
GitHub   → https://github.com/wafa28022/finadvisor

### Résultat
✅ App complète déployée et accessible mondialement
✅ 0 DT dépensé