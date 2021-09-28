from typing import List
from fastapi import FastAPI, WebSocket, WebSocketDisconnect


app = FastAPI()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket, channel: str):
        await websocket.accept()
        self.active_connections.append({"channel": channel, "ws": websocket})

    def disconnect(self, channel: str, websocket: WebSocket):
        for connection in self.active_connections:
            if connection["ws"] == websocket:
               self.active_connections.remove(connection)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, channel: str, message: str):
        for connection in self.active_connections:
            if connection["channel"] == channel:
                await connection["ws"].send_text(message)


manager = ConnectionManager()

@app.websocket("/ws/{channel}/{username}")
async def websocket_endpoint(websocket: WebSocket, channel: str, username: str):
    await manager.connect(websocket, channel)
    await manager.broadcast(channel, f"{username}:<< {username} joined {channel} >>")

    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(channel,f"{username}:{data}")

    except WebSocketDisconnect:
        await manager.broadcast(channel, f"{username}:<< {username} has left {channel}  >>")
        manager.disconnect(channel, websocket)
