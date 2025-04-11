#!/bin/bash
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi
PORT=${PORT:-8001}
CONTAINER_NAME=${CONTAINER_NAME:-vite_template}

echo "🔁 Stopping container: $CONTAINER_NAME on port $PORT..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true
echo "✅ $CONTAINER_NAME is now stopped on port $PORT!"
echo "🚀 Your App is now stopped in a Docker container! Developed By : Anil Godara 🔥🔥🔥"
