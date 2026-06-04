from backend.rag.loader import load_documents
from backend.rag.vector_store import create_vector_store

docs = load_documents("knowledge_base")

create_vector_store(docs)

print("Knowledge Base Created")