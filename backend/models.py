from pydantic import BaseModel

class MessageRequest(BaseModel):
    message: str
    history: list
    
class FinanceData(BaseModel):
    revenu: float = 0
    depenses: float = 0
    dettes_mensuelles: float = 0
    fond_urgence: float = 0
    
