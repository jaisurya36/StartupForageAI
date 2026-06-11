from backend.services.granite_service import generate_text


def generate_complete_blueprint(startup_idea):

    prompt = f"""
You are a senior startup consultant, venture capitalist, and product strategist.

Startup Idea:
{startup_idea}

Generate a professional startup blueprint.

FORMAT STRICTLY AS:

IDEA ANALYSIS

Domain:
<content>

Problem Statement:
<content>

Target Users:
<content>

Unique Value Proposition:
<content>

--------------------------------------------------

MARKET ANALYSIS

Market Demand:
<content>

Market Size:
<content>

Competitors:
<content>

Opportunities:
<content>

Risks:
<content>

--------------------------------------------------

BUSINESS MODEL

Revenue Streams:
<content>

Pricing Strategy:
<content>

Customer Acquisition:
<content>

--------------------------------------------------

PRODUCT ROADMAP

Phase 1:
<content>

Phase 2:
<content>

Phase 3:
<content>

Phase 4:
<content>

Phase 5:
<content>

--------------------------------------------------

STARTUP READINESS SCORE

Score:
XX/100

Strengths:
<content>

Weaknesses:
<content>

Improvements Needed:
<content>

Do NOT use:
#
##
###
****
Markdown

Return professional report format only.
"""
    
    return generate_text(prompt)