from backend.services.granite_service import generate_text

def generate_analytics(startup_idea):

    prompt = f"""
Analyze this startup idea:

{startup_idea}

Give scores from 0-100 for:

1. Market Potential
2. Innovation Score
3. Funding Readiness
4. Scalability
5. Competition Risk

Format:

Market Potential: XX
Innovation Score: XX
Funding Readiness: XX
Scalability: XX
Competition Risk: XX
"""

    return generate_text(prompt)