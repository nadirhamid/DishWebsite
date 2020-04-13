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
    `sudo docker run -e SQLALCHEMY_DATABASE_URI="mysql://root:12345678@localhost/db_chicago_dish?charset=utf8"  -p 5000:5000 IMAGE_ID`

- Cut a tag
    `sudo docker tag IMAGE_ID REGISTRY_PATH`

# Run the application:-

`sudo docker-compose up -d` for deamon mode
`sudo docker-compose up` without deamon mode