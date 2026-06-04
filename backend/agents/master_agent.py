from backend.services.granite_service import generate_text


def generate_complete_blueprint(startup_idea):

    prompt = f"""
You are a senior startup consultant, venture capitalist, and product strategist.

Startup Idea:
{startup_idea}

Generate a professional startup blueprint.

FORMAT:

# Idea Analysis
- Domain
- Problem Statement
- Target Users
- Unique Value Proposition

# Market Analysis
- Market Demand
- Market Size
- Competitors
- Opportunities
- Risks

# Business Model
- Revenue Streams
- Pricing Strategy
- Customer Acquisition Strategy

# Product Roadmap
Phase 1 - Research
Phase 2 - MVP Development
Phase 3 - Testing
Phase 4 - Launch
Phase 5 - Scaling

# Startup Readiness Score
Give score out of 100.

Explain:
- Strengths
- Weaknesses
- Improvements Needed

Provide detailed professional output.
"""
    
    return generate_text(prompt)