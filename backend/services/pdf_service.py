from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet


def create_pdf(content, filename="startup_blueprint.pdf"):

    pdf = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    story = []

    story.append(
        Paragraph("StartupForge AI Blueprint", styles["Title"])
    )

    story.append(Spacer(1, 20))

    story.append(
        Paragraph(content.replace("\n", "<br/>"), styles["BodyText"])
    )

    pdf.build(story)

    return filename