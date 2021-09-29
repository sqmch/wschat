# wschat

A socket based public chat app built with Vue3/Quasar and python/FastAPI. The user simply picks an username and joins a chatroom where they can chat freely to all the participants. Aside from joining the default "general" channel, the users can also create/join custom channels.

### Demo: https://wschat.netlify.app/

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
