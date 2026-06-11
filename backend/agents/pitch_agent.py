from backend.services.granite_service import generate_text

def generate_pitch(startup_idea, theme="investor"):

    prompt = f"""
Startup Idea:
{startup_idea}

Pitch Theme:
{theme}

Generate a professional startup pitch.

Include:

1. Hook
2. Problem
3. Solution
4. Market Opportunity
5. Business Model
6. Competitive Advantage
7. Closing Statement

Adapt the tone to the selected theme.
"""

    return generate_text(prompt)