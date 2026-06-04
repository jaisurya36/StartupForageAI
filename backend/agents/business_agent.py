from backend.services.granite_service import generate_text

def analyze_business(startup_idea: str):

    prompt = f"""
You are a startup business consultant.

Analyze this startup idea:

{startup_idea}

Provide:

1. Revenue Model
2. Pricing Strategy
3. Customer Segments
4. Cost Structure
5. Value Proposition
6. Business Model Type

Give detailed answers.
"""

    return generate_text(prompt)