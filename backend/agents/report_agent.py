from backend.agents.idea_agent import analyze_idea
from backend.agents.market_agent import analyze_market
from backend.agents.business_agent import analyze_business
from backend.agents.swot_agent import generate_swot
from backend.agents.pitch_agent import generate_pitch
from backend.agents.competitor_agent import analyze_competitors
from backend.agents.success_agent import predict_success
from backend.agents.mvp_agent import generate_mvp

def generate_complete_report(startup_idea):

    return {
        "idea_analysis": analyze_idea(startup_idea),
        "market_analysis": analyze_market(startup_idea),
        "business_analysis": analyze_business(startup_idea),
        "swot_analysis": generate_swot(startup_idea),
        "competitor_analysis": analyze_competitors(startup_idea),
        "investor_pitch": generate_pitch(startup_idea),
        "success_prediction": predict_success(startup_idea),
        "mvp_plan": generate_mvp(startup_idea)
    }