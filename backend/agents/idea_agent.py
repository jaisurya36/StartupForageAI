from backend.services.granite_service import generate_text


def analyze_idea(startup_idea: str):

    prompt = f"""
You are an expert startup consultant.

Analyze the following startup idea:

{startup_idea}

Provide your answer in this format:

Domain:
Problem Statement:
Target Users:
Unique Value Proposition:
Market Opportunity:

Give detailed answers.
"""

    result = generate_text(prompt)

    return {
        "startup_idea": startup_idea,
        "analysis": result
    }