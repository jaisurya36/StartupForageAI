from backend.services.granite_service import generate_text

def calculate_readiness(startup_idea: str):

    prompt = f"""
You are a startup evaluation expert.

Evaluate:

{startup_idea}

Score each category from 1-10:

1. Market Potential
2. Technical Feasibility
3. Funding Potential
4. Scalability
5. Innovation

Then provide:

Overall Startup Readiness Score out of 100.

Explain each score.
"""

    return generate_text(prompt)