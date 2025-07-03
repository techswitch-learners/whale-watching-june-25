## Running the app

Run `npm install` to install the app dependencies, then run `npm run dev` to get the app running

### Command line options
- `npm run dev` - run the app in developement mode
- `npm run lint` - runs the linter
- `npm run lint-fix` - runs the linter and fixes the problems that it can
- `npm run test` - runs the tests

### Using the Location API to get ocean for list of sightings
- create a geonames account, and confirm account via email at https://www.geonames.org
- go onto account and enable free wen services https://www.geonames.org/manageaccount
- Create a .env file in the UI directory with `VITE_GEONAMES_USERNAMES = "yourUserName"`

