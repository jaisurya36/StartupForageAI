from backend.agents.master_agent import generate_complete_blueprint


def generate_blueprint(startup_idea):

    print("Running Master Agent")

    result = generate_complete_blueprint(startup_idea)

    print("Blueprint Generated")

    return {
        "blueprint": result
    }