#!/bin/bash
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi
PORT=${PORT:-8001}
CONTAINER_NAME=${CONTAINER_NAME:-vite_template}

echo "🔁 Restarting container: $CONTAINER_NAME on port $PORT..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true
docker run -d \
  --name "$CONTAINER_NAME" \
  -p "$PORT":80 \
  "$CONTAINER_NAME"

echo "✅ $CONTAINER_NAME is now running on port $PORT!"
echo "🚀 Your React app is now running in a Docker container!"
