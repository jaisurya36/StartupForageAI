from dotenv import load_dotenv
import os

from ibm_watsonx_ai import Credentials
from ibm_watsonx_ai.foundation_models import ModelInference

load_dotenv()

API_KEY = os.getenv("IBM_API_KEY")
PROJECT_ID = os.getenv("IBM_PROJECT_ID")
URL = os.getenv("IBM_URL")


def generate_text(prompt: str):

    try:

        credentials = Credentials(
            url=URL,
            api_key=API_KEY
        )

        model = ModelInference(
            model_id="ibm/granite-4-h-small",
            credentials=credentials,
            project_id=PROJECT_ID
        )

        response = model.generate_text(
            prompt=prompt,
            params={
                "max_new_tokens": 1200,
                "temperature": 0.3
            }
        )

        return response

    except Exception as e:
        return f"IBM Error: {str(e)}"