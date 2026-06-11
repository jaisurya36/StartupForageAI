from backend.services.granite_service import generate_text

def funding_strategy(startup_idea):

    prompt = f"""
For this startup:

{startup_idea}

Provide:

1. Estimated MVP Cost
2. Bootstrapping Strategy
3. Funding Sources
4. Angel Investor Strategy
5. Government Grants
6. Fundraising Roadmap

Be practical and realistic.
"""

    return generate_text(prompt)