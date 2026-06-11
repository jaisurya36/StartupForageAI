from backend.agents.master_agent import generate_complete_blueprint
from backend.agents.swot_agent import generate_swot
from backend.agents.pitch_agent import generate_pitch
from backend.agents.mvp_agent import generate_mvp


def generate_blueprint(startup_idea):

    print("Running Master Agent")
    blueprint = generate_complete_blueprint(startup_idea)

    print("Running SWOT Agent")
    swot = generate_swot(startup_idea)

    print("Running Pitch Agent")
    pitch = generate_pitch(startup_idea)

    print("Running MVP Agent")
    mvp = generate_mvp(startup_idea)

    print("Blueprint Generated")

    return {
        "blueprint": blueprint,
        "swot": swot,
        "pitch": pitch,
        "mvp": mvp
    }