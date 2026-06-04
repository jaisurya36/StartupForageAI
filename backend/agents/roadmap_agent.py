from backend.services.granite_service import generate_text

def generate_roadmap(startup_idea: str):

    prompt = f"""
You are a startup execution consultant.

Create a startup roadmap for:

{startup_idea}

Provide:

Phase 1: Research
Phase 2: MVP Development
Phase 3: Testing
Phase 4: Launch
Phase 5: Growth

Give timeline and activities.
"""

    return generate_text(prompt)