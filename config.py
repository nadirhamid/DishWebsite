import os

class Config:
    """Set Flask configuration vars from .env file."""
    # General Config
    SECRET_KEY = os.urandom(32)
    FLASK_APP = os.environ.get('FLASK_APP')
    FLASK_ENV = os.environ.get('FLASK_ENV')
    FLASK_DEBUG = os.environ.get('FLASK_DEBUG')

    #SMTP Credentials
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = ''
    MAIL_PASSWORD = ''

    # Database
    SQLALCHEMY_DATABASE_URI = os.environ.get("SQLALCHEMY_DATABASE_URI", "mysql://root:12345678@localhost/db_chicago_dish?charset=utf8")
    # SQLALCHEMY_DATABASE_URI = "sqlite:///example.sqlite"
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = os.environ.get('SQLALCHEMY_TRACK_MODIFICATIONS')

    STRIPE_PUBLISHABLE_KEY = ''
    STRIPE_SECRET_KEY = ''

    ADMIN_EMAIL = 'admin@admin.org'
    ADMIN_PWD = 'qweasd'

    ADMIN_SESSION = 300  # time in seconds for admin session availability

    # Change the price
    REGULAR_PRICE = 149.99
    LUXURY_PRICE = 299.99
    ADDITIONAL_PRICE = 49.99

    NOTIFICATION_EMAIL = ''
