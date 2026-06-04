from backend.services.granite_service import generate_text

def analyze_market(startup_idea: str):

    prompt = f"""
You are a market research expert.

Analyze this startup idea:

{startup_idea}

Provide:

1. Market Demand
2. Competitors
3. Industry Trends
4. Opportunities
5. Risks

Give detailed answers.
"""

    return generate_text(prompt)