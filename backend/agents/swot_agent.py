from backend.services.granite_service import generate_text

def generate_swot(startup_idea):

    prompt = f"""
Create a SWOT analysis for this startup:

{startup_idea}

Format:

Strengths
Weaknesses
Opportunities
Threats

Give bullet points.
"""

    return generate_text(prompt)