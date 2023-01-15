# zpr-22z

Press space to start the game when two players are connected.

Use up and down arrows to move your paddle

Requirements: python w/ pipenv, Node.js + npm

To start the server:

`$ cd zpr-22z/zpr-backend`

`$ python3 -m pipenv run app` (Windows: `$ python -m pipenv run app`)

To start the client:

`$ cd zpr-22z/zpr-frontend`

`$ npm install`

`$ npm start`

Access the app at `http://localhost:3000/` using two browser tabs

To run backend tests:

`$ cd zpr-22z/zpr-backend`

`$ python3 -m pipenv run test` (Windows: `$ python -m pipenv run test`)

To run backend linter:

`$ cd zpr-22z/zpr-backend`

`$ python3 -m pipenv run linter` (Windows: `$ python -m pipenv run linter`)

(no output == no linter errors)

To run frontend linter:

`$ cd zpr-22z/zpr-backend`

`$ npm run lint`

To run frontend formatter:

`$ cd zpr-22z/zpr-backend`

`$npm run formatter` - formatter also is being used automatically when using git commit
