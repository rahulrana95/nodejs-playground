### DB Changes
- Everytime you make changes in prisma run this command.

npx prisma generate

- After defining the table in your Prisma schema, you need to run migrations to create the table in your database. Execute the following command:

bash
Copy code
npx prisma migrate dev


### To run your Node.js application using Docker after creating the Dockerfile, you'll follow these steps:

Build the Docker Image:

Open a terminal or command prompt in the directory where your Dockerfile is located and run the following command to build the Docker image:

bash
Copy code
docker build -t my-node-app .
Replace my-node-app with the desired name for your Docker image.

Run the Docker Container:

Once the image is built, you can run a Docker container using the following command:

bash
Copy code
docker run -p 3000:3000 -v $(pwd):/usr/src/app my-node-app

This command maps port 3000 on your host machine to port 3000 in the Docker container. Adjust the port numbers as needed if your application runs on a different port.

Access Your Application:

Once the container is running, you can access your Node.js application by navigating to http://localhost:3000 in your web browser.