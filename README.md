# wschat

A socket based public chat app built with Vue3/Quasar and python/FastAPI. The user simply picks an username and joins a chatroom, where they can chat with the rest of the users.

## Project setup


### Run frontend
```
npm install
npm run serve
```

### Run backend
```
cd backend/backend
poetry install
poetry shell
uvicorn main:app --reload
```
