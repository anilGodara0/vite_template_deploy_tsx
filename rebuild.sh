#!/bin/bash
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi
CONTAINER_NAME=${CONTAINER_NAME:-vite_template}
echo '🔥 🔥 🔥 Start Building a Project Created by Anil Godara 😎'
echo "🛠️ Rebuilding Docker image: $CONTAINER_NAME..."
sudo docker build -t "$CONTAINER_NAME" .

echo "🔁 Restarting container: $CONTAINER_NAME..."
sudo ./start.sh

echo "✅ Rebuild complete for: $CONTAINER_NAME!"
