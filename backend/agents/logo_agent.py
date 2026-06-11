from backend.services.granite_service import generate_text

def generate_logo_prompt(startup_idea):

    prompt = f"""
Create a professional logo design description for:

{startup_idea}

Include:
- Symbol
- Colors
- Style
- Branding feel

Return only the logo design description.
"""

    return generate_text(prompt)