# Book Management System - Express

## Introduction

The Book Management System is a full stack project, including complete frontend code and backend code.

- Frontend: nextjs + React + antd
- Backend: express + mongodb

This repository is **backend** part.

### Database
I prepared [mock book data](https://apifox.com/apidoc/shared-567e8a7f-ce65-4c99-9924-97e44579d780) for this project. There is a mongodb folder in the root directory of the project.

Book data is obtained through the crawling [Books to Scrape](https://books.toscrape.com/). [Books to Scrape](https://books.toscrape.com/) Refer for crawlers.

Use MongoDB Atlas
   ```shell
   const uri = "mongodb+srv://super:super@clusterbook.wljvnyy.mongodb.net/?retryWrites=true&w=majority";
   ```

You can also import my mock data and use local MongoDB server service.
  ```shell
  const uri = "mongodb://localhost:27017/book-data"
  ```
Refer [Mongodb Connection Guide](https://www.mongodb.com/docs/drivers/go/current/fundamentals/connections/connection-guide/#connection-guide) for more information.

### System Structure

### Demo

## Getting Started
1. Download the code, enter the project directory in terminal

2. Download dependencies
   ```shell
   npm install
   ```

3. Run project
   ```shell
   npm run dev
   ```

