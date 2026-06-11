from backend.services.granite_service import generate_text

def analyze_competitors(startup_idea):

    prompt = f"""
Analyze competitors for this startup:

{startup_idea}

Provide:

1. Top Competitors
2. Competitor Strengths
3. Competitor Weaknesses
4. Competitive Advantage
5. Market Gap Opportunity

Format professionally.
"""

    return generate_text(prompt)