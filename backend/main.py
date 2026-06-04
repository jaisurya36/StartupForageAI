from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from backend.services.pdf_service import create_pdf
from backend.agents.master_agent import generate_complete_blueprint

from backend.agents.idea_agent import analyze_idea
from backend.agents.market_agent import analyze_market
from backend.agents.business_agent import analyze_business
from backend.agents.funding_agent import analyze_funding
from backend.agents.roadmap_agent import generate_roadmap
from backend.agents.readiness_agent import calculate_readiness
from backend.agents.startup_pipeline import generate_blueprint

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "StartupForge AI Running"}

@app.get("/analyze")
def analyze(startup_idea: str):
    return analyze_idea(startup_idea)

@app.get("/market")
def market(startup_idea: str):
    return {
        "startup_idea": startup_idea,
        "market_analysis": analyze_market(startup_idea)
    }

@app.get("/business")
def business(startup_idea: str):
    return {
        "business_analysis": analyze_business(startup_idea)
    }

@app.get("/funding")
def funding(startup_idea: str):
    return {
        "funding_analysis": analyze_funding(startup_idea)
    }

@app.get("/roadmap")
def roadmap(startup_idea: str):
    return {
        "roadmap": generate_roadmap(startup_idea)
    }

@app.get("/readiness")
def readiness(startup_idea: str):
    return {
        "readiness_score": calculate_readiness(startup_idea)
    }

@app.get("/blueprint")
def blueprint(startup_idea: str):
    return generate_blueprint(startup_idea)
import os

@app.get("/env-test")
def env_test():
    return {
        "url": os.getenv("IBM_URL"),
        "project": os.getenv("IBM_PROJECT_ID")
    }


@app.get("/download-pdf")
def download_pdf(startup_idea: str):

    blueprint = generate_complete_blueprint(startup_idea)

    pdf_file = create_pdf(blueprint)

    return FileResponse(
        path=pdf_file,
        media_type="application/pdf",
        filename="Startup_Blueprint.pdf"
    )

