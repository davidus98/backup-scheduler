# Backup Scheduler CLI

A simple CLI tool that helps you schedule and run automatic backups from any folder, compress them into ZIP files, and upload them to a MinIO (or S3-compatible) bucket.

It’s built in plain JavaScript using Node.js, and meant to be dead simple to use.

---

## Features

- Schedule backups with a cron expression
- Run backups manually whenever you want
- Automatically compress folders to `.zip`
- Uploads backups to MinIO or any S3-compatible service
- Keeps track of your jobs in a local `jobs.json` file

---

## Quickstart

### 1. Install dependencies

```bash
npm install
```

## How to use it

```bash

npm run cli -- schedule --path "D:/important_stuff" --cron "0 3 \* \* \*"

```

## Run a backupt immediately

```bash

npm run cli -- run-now --path "D:/important_stuff"

```

## List scheduled backups

```bash

npm run cli -- list

```

## Running the scheduler

```bash

npm run scheduler
```
