# Book Management System - Express

## Introduction

The Book Management System is a full stack project, including complete frontend code and backend code.

- Frontend: nextjs + React + antd
- Backend: express + mongodb

This repository is **backend** part.

Refer to [frontend part](https://github.com/nagasawalee/book-management-react)

### Database
I prepared [mock book data](https://apifox.com/apidoc/shared-567e8a7f-ce65-4c99-9924-97e44579d780) for this project. There is a mongodb folder in the root directory of the project.

Book data is obtained through the crawling [Books to Scrape](https://books.toscrape.com/). Refer to [crawlers](https://github.com/nagasawalee/crawler-book-list-demo).

- Use MongoDB Atlas
   ```shell
   const uri = "mongodb+srv://<username>:<password>@clusterbook.wljvnyy.mongodb.net/?retryWrites=true&w=majority"
   ```
   *Change &lt;username&gt; and &lt;password&gt; according to your setting*

- You can also import my mock data and use local MongoDB server service.
  ```shell
  const uri = "mongodb://localhost:27017/book-data"
  ```
  Refer to [Mongodb Connection Guide](https://www.mongodb.com/docs/drivers/go/current/fundamentals/connections/connection-guide/#connection-guide) for more information.

### System Structure
![](https://github.com/nagasawalee/book-management-react/blob/main/screenshot/Mind%20Map.png)

### Demo
![](https://github.com/nagasawalee/book-management-react/blob/main/screenshot/loginpage.png)
[Demo Video](https://github.com/nagasawalee/book-management-react/tree/main/screenshot)

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

