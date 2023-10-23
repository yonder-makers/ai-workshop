from fastapi import FastAPI, File, UploadFile
from typing import Annotated
import io
import json


import pdfplumber
import pandas as pd
from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer

app = FastAPI()

@app.post("/")
async def root(file: Annotated[bytes, File()]):
    buffer = io.BytesIO()
    buffer.write(file)

    pdf_doc = pdfplumber.open(buffer)
    doc_lines = []
    for page in pdf_doc.pages:
        doc_lines.extend(page.extract_text().split("\n"))
    pdf_doc.close()

    model = AutoModelForSequenceClassification.from_pretrained("./model")
    tokenizer = AutoTokenizer.from_pretrained("nghuyong/ernie-2.0-base-en")
    classification = pipeline("text-classification", model=model, tokenizer=tokenizer)(doc_lines)
    cv_df = pd.DataFrame({"cv_line": doc_lines, "label": classification})

    return json.loads(cv_df.to_json(orient="records"))