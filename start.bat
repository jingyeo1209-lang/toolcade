@echo off
cd /d "%~dp0"
echo Toolcade 로컬 서버 시작 중...
call npm start
start http://localhost:4173
