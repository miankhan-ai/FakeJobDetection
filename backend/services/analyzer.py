import numpy as np

# Mockup for Sentinel's NLP Preprocessing & BiLSTM Inference

class FraudAnalyzer:
    def __init__(self, model_path=None):
        # Mock model - not using TensorFlow for demo
        self.model = None
    
    def analyze_posting(self, description: str, requirements: str, benefits: str, has_logo: bool, telecommuting: bool):
        # 1. Mock Preprocessing text (Tokenization -> Padding)
        # 2. Mock Inference
        
        # For demonstration, generate a mock score
        risk_score = np.random.uniform(0, 100)
        is_fraud = risk_score > 75.0
        
        flags = []
        if risk_score > 50:
            flags.append("Vague Salary")
        if risk_score > 80:
            flags.append("Request for bank details")
            
        return {
            "is_fraud": bool(is_fraud),
            "risk_score": round(float(risk_score), 2),
            "red_flags": flags,
            "feature_importance": {"description_weight": 0.6, "no_logo_weight": 0.4}
        }

analyzer = FraudAnalyzer()


analyzer = FraudAnalyzer()
