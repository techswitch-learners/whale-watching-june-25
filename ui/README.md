## Running the app

Run `npm install` to install the app dependencies, then run `npm run dev` to get the app running

### Command line options
- `npm run dev` - run the app in developement mode
- `npm run lint` - runs the linter
- `npm run lint-fix` - runs the linter and fixes the problems that it can
- `npm run test` - runs the tests

### Using login context for admin/user privilidges
-in the page you want to use it:

   `import {LoginContext} from "path to LoginManager";`
   
   `const loginContext = useContext(LoginContext);`

-e.g. if you want only admins to see this page

   `if (logincontext.isUserAdmin == true)
   { return (CODE)}`
   
