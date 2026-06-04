from backend.rag.retriever import get_retriever


def retrieve_context(query):

    retriever = get_retriever()

    docs = retriever.get_relevant_documents(query)

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    return context