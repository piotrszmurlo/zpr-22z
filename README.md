# zpr-22z

Requirements: docker compose, make

To start the app:

`$ cd zpr-22z`

`$ ./run.sh`

Access the app at `http://localhost:3000/`

Try tapping `Step` and `send Ping` buttons

`send Ping` - sends ping to flask-socketio server and saves response's timestamp

`Step` - steps the ball simulation (calculated by WASM function)

To run backend tests (make sure you have the requirements.txt installed):

`$ cd zpr-22z/zpr-backend`

`$ pytest`
