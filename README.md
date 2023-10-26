# Yonder AI Week - Workshop 🤖

> In this workshop, you will learn how to use HuggingFace to run AI in your browser and how to integrate your fine-tuned model in your application. The workshop is divided into two chapters. In the first chapter, you will learn how to use pretrained models in a `Next.js` SSR application using `transformers.js` to solve different NLP tasks. In the second chapter, you will learn how to integrate your fine-tuned model in a `Python FastAPI` application.

## Prerequisites 📋

- Node.js 16.14 or later 📡
- Python 3.9.X (`venv` and `pip` are included) 🐍
- Docker 🐳 - Required only for DevContainer setup
- VSCode 📝

## Installation 📦

### Local setup 🖥️

1. Clone the repository
2. Install client dependencies inside `client` directory:

```bash
npm install
```

3. Verify that Python 3.9.X is installed on your machine:

```bash
python --version # or python3 --version
```

4. Install server dependencies inside `server` directory:

Linux/MacOS:

```bash
/usr/bin/python3 -m venv .env
source .env/bin/activate
pip install -r requirements.txt
```

Windows:

```bash
python -m venv .env
.env\Scripts\activate.bat
pip install -r requirements.txt
```

### Dev Container setup 🐳

> :warning: **For some reason the model inferrence doesn't work as expected as it gets stuck** :warning:

1. Make sure you have Docker installed and running on your machine
2. Open VSCode
3. Install the `Remote - Containers` extension
4. Press `F1`, select or search for `Dev Containers: Clone Repository in Container Volume` and paste the repository URL
5. Wait for the container to build and to install the dependencies

## Chapter I: Running AI in your browser with HuggingFace 🚀

### 1. Running in development mode 🏃

Run the following command inside `client` directory:

```bash
npm run dev
```

### 2. Run your first Named Entity Recognition (NER) model 🕵️

- Open your browser and navigate to `http://localhost:3000`. 🌐
- Type a sentence in English in the text area: **_My name is John, I live in Singapore and work at Microsoft._**
- Analyze the the result. 👀
- Try other sentences and see how the model performs.

**_Let's discover together the HuggingFace Platform and then analyze the code 🔍_**

### 4. From NER to Fill Mask 🎭

- Change the model from NER to Fill Mask (E.g. `Xenova/distilbert-base-cased`):
- Try the same sentence as before: **_My name is John, I live in Singapore and work at Microsoft._** but replace the word **_work_** with **_[MASK]_**.
- Analyze the the result. 🧐

### 5. "Trying to teach a dog to meow" 🐶

- Let's do a zero-shot classification (E.g. `Xenova/bart-large-mnli`)
- Open `client/src/app/api/text-classification/route.ts`
- Modify the code so you can support different labels/categories `await classifier(text, ["cat1", "cat2", "cat3"]);`

**_Everything looks great but how can I customize existing models?_**

## Chapter II: Fine-tuning a model with HuggingFace 🎓

Check this awesome explaination: [A brief introduction to transformers](https://ig.ft.com/generative-ai/) 📰

**_Then we will follow the notebook in Google Collab_** 📓

## Chapter III: Integrate your fine-tuned model in your application 📲

> Make sure you followed the steps fine-tuning your model

> Make sure that you are using the right Python version (3.9.6)

### 1. Deploy your model 🚢

Copy the `model` directory to `server`

**_Let's analyze the code 🔍_**

### 2. Running the server 🏃

Run the following command inside `server` directory:

```bash
uvicorn main:app --reload
```

### 3. Viewing your resume in the browser 👀

#### Using Swagger UI 📊

- Open your browser and navigate to `http://localhost:8000/docs`. You should see the Swagger UI.
- Open the `POST /` endpoint and click on `Try it out`.
- Choose a file to upload and select your resume (E.g. `resume.pdf`).
- Click on `Execute` and analyze the JSON Response.

#### Using Web UI 🌐

- Open your browser and navigate to `http://localhost:3000/resume`.
- Upload your resume and analyze the UI result.
