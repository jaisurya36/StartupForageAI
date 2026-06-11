from backend.services.granite_service import generate_text

def predict_success(startup_idea):

    prompt = f"""
You are a startup investor.

Analyze this startup idea:

{startup_idea}

Provide:

1. Success Probability (0-100%)
2. Strengths
3. Risks
4. Challenges
5. Recommendations

Be realistic and professional.
"""

    return generate_text(prompt)