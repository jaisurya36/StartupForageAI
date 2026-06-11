from backend.services.granite_service import generate_text

def generate_mvp(startup_idea):

    prompt = f"""
For this startup idea:

{startup_idea}

Generate:

1. Core Features
2. MVP Features
3. Nice-to-have Features
4. Tech Stack Recommendation
5. Development Timeline

Format clearly.
"""

    return generate_text(prompt)