# zpr-22z

Use up and down arrows to move your paddle

Requirements: python w/ pipenv

To start the server:

`$ cd zpr-22z/zpr-backend`

`$ python3 -m pipenv run`

To start the client:

`$ cd zpr-22z/zpr-frontend`

`$ npm start`

Access the app at `http://localhost:3000/` using two browser tabs

To run backend tests:

`$ cd zpr-22z/zpr-backend`

`$ python3 -m pipenv test`

To run backend linter:

`$ python3 -m pipenv linter` (no output == no linter errors)

To run frontend linter:
`$ npm run lint`

To run frontend formatter:
`$npm run formatter` - formatter also is being used while commiting 
