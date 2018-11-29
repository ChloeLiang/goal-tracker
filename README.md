# GoalTracker

[GoalTracker](https://goal-tracker-node.herokuapp.com) is an app that quantifies
your life goal and keeps track of your progress. It automatically breaks a long-term
goal into small pieces based on the time period assigned by user. It's built with
Node.js, Express, Bootstrap, jQuery, JSX and PostgreSQL.

## Getting Started

These instructions will get you a copy of the project up and running on your local
machine for development and testing purposes. See deployment for notes on how to
deploy the project on a live system.

### Prerequisites

- Install [Node.js](https://nodejs.org/en/).
- Install [Postgresq.app](https://postgresapp.com/).
- Create a [Cloudinary](https://cloudinary.com/) account.

### Installing

Create a `.env` file at the project root directory, and add your Cloudinary credentials.

```bash
CLOUDINARY_CLOUD_NAME=<username>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
```

Install all the dependencies:

```bash
cd goal-tracker
npm install
```

Run the app in the development mode at localhost:3000.

```bash
cd codacity
npm start
```

## Deployment

These instructions will get the app up and running on Heroku.

### Setup Heroku

Make sure you have an account with [Heroku](https://www.heroku.com/) and have installed
the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). Choose a region.

Login with Heroku credentials:

```bash
$ heroku login
Enter your Heroku credentials.
Email: adam@example.com
Password (typing will be hidden):
Authentication successful.
```

### Deploy

Create a Heroku app via the command line:

```bash
cd goal-tracker
heroku create
```

Add, and commit all your data to git. Then push it to Heroku:

```bash
git push heroku master
```

Add [Heroku Postgres](https://elements.heroku.com/addons/heroku-postgresql) as an add-on.

## Contributing

When contributing to this repository, please first discuss the change you wish to
make via issue, email, or any other method with the owners of this repository
before making a change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
