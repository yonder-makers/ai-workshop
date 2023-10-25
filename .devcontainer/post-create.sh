sudo chown vscode client/node_modules
sudo chown vscode server/.env
sudo chown vscode server/model
sudo chown vscode server/__pycache__
sudo chown vscode .cache

# Install Python dependencies
cd server
python -m venv .env
. .env/bin/activate
pip install -r requirements.txt

# Install Node dependencies
cd ../client
npm install

