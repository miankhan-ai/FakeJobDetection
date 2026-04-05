from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import logging
from services.analyzer import analyzer
from services.reporter import reporter
from services.email_service import email_service

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="The Sentinel API", description="AI Job Fraud Detection & Reporting System")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Log startup
@app.on_event("startup")
async def startup_event():
    logger.info("🚀 Sentinel API starting up...")
    logger.info(f"✓ CORS enabled for all origins")
    logger.info(f"✓ Email service initialized")

class JobPosting(BaseModel):
    title: str
    company: str
    description: str
    requirements: str = ""
    benefits: str = ""
    has_company_logo: bool = False
    telecommuting: bool = False
    url: Optional[str] = None

class AnalysisResult(BaseModel):
    is_fraud: bool
    risk_score: float
    red_flags: List[str]
    feature_importance: dict

class ReportRequest(BaseModel):
    job_title: str
    company: str
    risk_score: float
    red_flags: List[str]
    target_platform: str

@app.post("/api/analyze", response_model=AnalysisResult)
async def analyze_job(posting: JobPosting):
    result = analyzer.analyze_posting(
        posting.description, 
        posting.requirements, 
        posting.benefits, 
        posting.has_company_logo,
        posting.telecommuting
    )
    # TODO: Log to incident database here if is_fraud
    return result

@app.post("/api/report-incident")
async def generate_fraud_report(request: ReportRequest):
    logger.info(f"📧 Fraud report request received for: {request.company} - {request.job_title}")
    logger.info(f"   Risk Score: {request.risk_score}")
    
    # Send email to the fraud detection team
    email_result = email_service.send_fraud_report(
        recipient_email="miankhan.dev@gmail.com",
        job_title=request.job_title,
        company=request.company,
        risk_score=request.risk_score,
        red_flags=request.red_flags
    )
    
    logger.info(f"📤 Email service response: {email_result['status']}")
    
    if email_result["status"] == "success":
        logger.info(f"✓ Email sent successfully to {email_result['recipient']}")
        return {
            "status": "success",
            "message": "Fraud report sent successfully",
            "email_sent_to": email_result["recipient"]
        }
    else:
        logger.error(f"✗ Email failed: {email_result['message']}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to send report: {email_result['message']}"
        )

@app.get("/api/global-trends")
async def get_global_trends():
    # Return mockup heatmap data
    return {
        "targeted_industries": {"IT/Engineering": 35, "Data Entry": 45, "Customer Service": 20},
        "recent_incidents": 150
    }
