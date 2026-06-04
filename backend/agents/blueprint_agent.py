def generate_final_blueprint(
    idea,
    market,
    business,
    funding,
    roadmap,
    readiness
):

    return {
        "idea_analysis": idea,
        "market_analysis": market,
        "business_analysis": business,
        "funding_analysis": funding,
        "roadmap": roadmap,
        "readiness_score": readiness
    }