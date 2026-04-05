import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings:
    """Application configuration loaded from environment variables."""
    
    # Email Configuration
    EMAIL_SENDER = os.getenv("EMAIL_SENDER", "your-email@gmail.com")
    EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "your-app-password")
    EMAIL_SMTP_SERVER = os.getenv("EMAIL_SMTP_SERVER", "smtp.gmail.com")
    EMAIL_SMTP_PORT = int(os.getenv("EMAIL_SMTP_PORT", "587"))
    
    # Report Configuration
    REPORT_RECIPIENT = os.getenv("REPORT_RECIPIENT", "miankhan.dev@gmail.com")
    
    # App Configuration
    DEBUG = os.getenv("DEBUG", "False").lower() == "true"
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    
    @classmethod
    def validate(cls):
        """Validate that required environment variables are set."""
        required = ["EMAIL_SENDER", "EMAIL_PASSWORD", "REPORT_RECIPIENT"]
        missing = [var for var in required if not os.getenv(var)]
        if missing:
            raise ValueError(f"Missing required environment variables: {', '.join(missing)}")

settings = Settings()
