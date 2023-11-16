# Catbank Tech Test

### The task:

#### Background

Silvercat have decided to open an online bank, Catbank, using our new currency, Silveuros. The new bank will run a promotion giving all new customers 100 free Silveuros when they sign up.

#### Requirements

We would like you to build a prototype web application that allows users to:

- Create an account / log in
- View their current balance and transactions
- Send Silveuros to other users

#### The Solution

- You may use any languages, frameworks or technologies you like
- You should include instructions on how to run/deploy your solution
- Please provide a list of any assumptions you make

#### Expectations

- We don't want you to spend more than a few hours on this test!
- Don't worry if you don't end up with a full working solution

Please provide either an online git repository (e.g. GitHub) or a compressed file containing your solution.

### Approach

Framework: Next.JS (Node/React + Typescript)
Database: Postgres

### Why not Rails?

I have been working with Next.js predominantly over the last few months, I thought I would get more code down in pure Typescript rather than rewire my brain back to Rails thinking. Plus I wanted to demonstrate some React hooks, and integrating React with Rails was not something I was familiar with.

Another benefit to Next,js is simple integration with Vercel for infrastructure tools, deployment, databases etc.

### To run locally

You will need the Vercel CLI and an account set up. After cloning this repo, use `vercel link` to asign to a project, then in the Vercel web UI, you can provision a new Postgres database and link to this project. You can then run `vercel env pull .env.local` in your terminal to populate environment variables to connect to your database.

Remeber to run `yarn install` and then you can start the local server on `localhost:3000` with `yarn dev`

However, if you just want see the app running, it is deployed as [a vercel app here](https://catbank-tech-test.vercel.app)

### Applying promotional balances

In your environment varibales include `PROMOTION_END_DATE="2023-11-30"` and `PROMOTION_VALUE=100`, adjust the end date to suit usecase. NB - if you run `vercel env pull .env.local` again, this will overwrite your promotion variables.

### Caveats and Todo's

- Proper user password encryption (bcrypt etc)
- auth session tokens
- Transaction wrappers / eliminate race conditions / queueing transactions for integrity
- Client side input validations on forms
- Testing (I wanted to spend the time getting working features) - this is described as a prototype
- Split DB dev/test/prod
- Better error handling / edge cases
- header/footer partials
- caching/useQuery/refetch
- Probably shouldn't call everything 'props' for the interfaces, maybe should be custom types?
- User ORM instead of SQP strings
