# zpr-22z

Requirements: python w/ pipenv

To start the server:

`$ cd zpr-22z/zpr-backend`

`$ python3 -m pipenv run`

Access the app at `http://localhost:3000/`

Try tapping `Step` and `send Ping` buttons

`send Ping` - sends ping to flask-socketio server and saves response's timestamp

`Step` - steps the ball simulation (calculated by WASM function)

To run backend tests:

`$ cd zpr-22z/zpr-backend`

`$ python3 -m pipenv test`

To run backend linter:

`$ python3 -m pipenv linter` (no output == no linter errors)
