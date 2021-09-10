# Cubic Bot

[@CubicPlaceBot](https://t.me/CubicPlaceBot) is a Telegram bot for cubic.place.

- Saves data every minute (`npm run tasks`) and notifies on new events
- Bot can return latest data with `/prices`

## dev

`npm start`

## build

`npm run build`

## run

`npm run serve`

## taskss

Using cron:

```sh
* * * * * cd PROJECT_DIR && /bin/bash run_tasks.sh >> tasks.log 2>&1
```
