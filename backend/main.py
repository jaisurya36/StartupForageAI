from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from backend.services.pdf_service import create_pdf
from backend.agents.master_agent import generate_complete_blueprint

from backend.agents.name_agent import generate_names

from backend.agents.idea_agent import analyze_idea
from backend.agents.market_agent import analyze_market
from backend.agents.business_agent import analyze_business
from backend.agents.funding_agent import analyze_funding
from backend.agents.roadmap_agent import generate_roadmap
from backend.agents.readiness_agent import calculate_readiness
from backend.agents.startup_pipeline import generate_blueprint
from backend.agents.swot_agent import generate_swot
from backend.agents.pitch_agent import generate_pitch
from backend.agents.competitor_agent import analyze_competitors
from backend.agents.success_agent import predict_success
from backend.agents.mvp_agent import generate_mvp
from backend.agents.funding_strategy_agent import funding_strategy
from backend.agents.report_agent import generate_complete_report
from backend.agents.chat_agent import chat_with_ai
from backend.agents.analytics_agent import generate_analytics
from backend.agents.logo_agent import generate_logo_prompt

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
@app.get("/swot")
def swot(startup_idea: str):
        return {
        "swot_analysis": generate_swot(startup_idea)
    }
        
@app.get("/pitch")
def pitch(
    startup_idea: str,
    theme: str = "investor"
):

    return {
        "pitch":
        generate_pitch(
            startup_idea,
            theme
        )
    }
@app.get("/competitors")
def competitors(startup_idea: str):

    return {
        "competitor_analysis":
        analyze_competitors(startup_idea)
    }
@app.get("/success")
def success(startup_idea: str):

    return {
        "success_prediction":
        predict_success(startup_idea)
    }    
@app.get("/mvp")
def mvp(startup_idea: str):

    return {
        "mvp_plan": generate_mvp(startup_idea)
    }    
@app.get("/funding-strategy")
def funding(startup_idea: str):

    return {
        "funding_strategy":
        funding_strategy(startup_idea)
    } 
@app.get("/complete-report")
def complete_report(startup_idea: str):

    return generate_complete_report(startup_idea)       
@app.get("/chat")
def chat(message: str):

    return {
        "reply": chat_with_ai(message)
    }
@app.get("/analytics")
def analytics(startup_idea: str):

    return {
        "analytics":
        generate_analytics(startup_idea)
    }    
@app.get("/startup-names")
def startup_names(startup_idea: str):

    return {
        "names": generate_names(startup_idea)
    }   
@app.get("/logo")
def logo(startup_idea: str):

    return {
        "prompt":
        generate_logo_prompt(startup_idea)
    }     