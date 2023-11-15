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

Framework: Next.JS on Vercel
Database: Postgres

### Why not Rails?

I have been working with Next.js prodominantly over the last few months, I thought I would get more code down in pure Typescript rather than rewire my brain back to Rails thinking. Plus I wanted to demonstrate some React hooks, and integrating React with Rails was not something I was familiar with.

Another benefit to Next,js is simple integration with Vercel for infrastructure tools, deployment, databases etc.

### Applying promotional balances

In your environment varibales include `PROMOTION_END_DATE="2023-11-30"` and `PROMOTION_VALUE=100`, adjust the end date to suit usecase

### Caveats and Todo

- Proper user password encryption / auth sessions not implemented
- Input validations
