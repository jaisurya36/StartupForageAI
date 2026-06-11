from backend.services.granite_service import generate_text

def generate_names(startup_idea):

    prompt = f"""
Generate 10 startup names for:

{startup_idea}

Requirements:

- Short
- Modern
- Brandable
- Startup style

Return only names.
"""

    return generate_text(prompt)