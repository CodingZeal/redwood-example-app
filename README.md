# redwood-template-app

This is a template application using RedwoodJS. It establishes common patterns for creating an app quickly.

## 🧑‍💻 Additional Core Components

The following is a list of frameworks, utilities, libraries, components, etc... that have been added to the template to streamline the development experience.

- 🗃️ [PostgreSQL](https://www.postgresql.org/)
- 🚢 [Docker](https://www.docker.com/)
- 💄 [TailwindCSS](https://tailwindcss.com/)

## 🧱 Development Setup

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

## ⚡️ Quickstart

```bash
# install dependencies
yarn install

# setup .env
cp .env.example .env

# start dev server and database
# Your browser should automatically open to <http://localhost:8910>.
yarn dev

# (first run) run command in a separate terminal to setup database and seed data
yarn db:setup

# See extra helper scripts in package.json

```

## 🔍 Testing

```bash
# unit tests
yarn test # <api|web>
yarn test:watch # <api|web>

# end to end
yarn test:e2e

# run e2e in headed mode
yarn test:e2e --headed
```

## 🚀 Deployment on Heroku

Important note: The NGINX buildpack notoriously fails to pull with some regularity. Just re-run if this happens.

- Heroku "review apps" can be triggered for any branch in the 'pipeline' section of heroku
  - Review apps' database is ephemeral and will migrate / seed on each trigger
  - Review apps can be "promoted" but this is discouraged. PR into staging and let it auto deploy.
  - The naming pattern for review apps is `redwood-temp-app-pr-<PR number>`
- Migrations are run automatically for staging and prod. (TODO: document manual migrations)
- Deployment to staging occurs automatically from the staging branch
- Deployment to production occurs automatically from the main branch
- Heroku configuation exists in `app.json` as well as the `Procfile`

### Helpful heroku notes

Redwood deployments in heroku need to be managed by a process manager and requests proxied via NGINX. We are using PM2 and the initialization for that can be found in the root `index.js` file.
NGINX must have its config named and placed in `config/nginx.config.erb`.
Additionally, `@redwoodjs/api-server` was added to facilitate proxing the requests

```bash
# Login to heroku
heroku login

# Show app logs example. replace -a name with your app name
# i.e. staging-redwood-template-app
heroku logs --tail -a redwood-temp-app-pr-23

```

## 📄 Github Templates

To make creating new issues and pull requests easy and consistent, we have templates for the different use cases when creating an issue or pull request. You can find them in the `.github` directory.

### Notes

---

- Helpful for github [workflow development](https://github.com/nektos/act)
  - ex: `act -j playwright` runs single job
