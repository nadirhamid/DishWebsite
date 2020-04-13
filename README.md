Install all dependencies:
 pip install -r requirements.txt

Configure you application:

Open the **config.py** file and modify the following fields with your credentials:
 - MAIL_USERNAME (email address)
 - MAIL_PASSWORD (password from email address account)
 
 - STRIPE_PUBLISHABLE_KEY (stripe public key)
 - STRIPE_SECRET_KEY (stripe secret key)
 
 - ADMIN_EMAIL (admin email)
 - ADMIN_PWD (admin password)
 - ADMIN_SESSION (value in seconds for admin session duration)
 
 
# Run docker

- Build the image

    `sudo docker build . `

- Run a image
    `sudo docker run network=host -e SQLALCHEMY_DATABASE_URI="PASS_ME"  -p 5000:5000 IMAGE_ID`
    sudo docker run --network=host -e SQLALCHEMY_DATABASE_URI="mysql://root:12345678@localhost/db_chicago_dish?charset=utf8" -p 5000:5000 4a31c89d4feb

- Cut a tag
    `sudo docker tag IMAGE_ID REGISTRY_PATH`

    Docker hub notes - instructions:
    sudo docker build .
    sudo docker tag IMAGE_ID DOCKER_HUB_PATH
    sudo docker push DOCKER_HUBPATH
    instead of build use DOCKER_HUB_PATH
    if still error use sude docker-compose run --rm app bash and run migration command

# Run app using docker-compose

   `sudo docker-compose up`
    Note:- If you encounter any issue after this please run below command
    ```
        1. `sudo docker-compose stop`
        2. `sudo docker-compose rm -v`
        3. `sudo docker-compose up`
    ```

    For daemon mode please run with -d for ex. `sudo docker-compose up -d`

