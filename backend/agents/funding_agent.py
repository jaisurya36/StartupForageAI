from backend.services.granite_service import generate_text
from backend.rag.rag_service import retrieve_context


def analyze_funding(startup_idea: str):

    context = retrieve_context(startup_idea)

    prompt = f"""
You are a startup funding advisor.

Use the following knowledge:

{context}

Startup Idea:

{startup_idea}

Provide:

1. Funding Sources
2. Government Schemes
3. Grants
4. Incubators
5. Investor Types
6. Fundraising Roadmap

Answer only using retrieved information where possible.
"""

    return generate_text(prompt)