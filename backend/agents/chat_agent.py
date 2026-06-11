from backend.services.granite_service import generate_text

chat_history = []

def chat_with_ai(message):

    global chat_history

    chat_history.append(
        f"User: {message}"
    )

    conversation = "\n".join(chat_history)

    prompt = f"""
You are StartupForge AI.

Conversation:

{conversation}

Reply as AI assistant.
"""

    reply = generate_text(prompt)

    chat_history.append(
        f"AI: {reply}"
    )

    return reply