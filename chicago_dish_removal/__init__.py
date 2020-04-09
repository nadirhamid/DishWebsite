from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate

db = SQLAlchemy()
login_manager = LoginManager()


def dish_removal_app():
    """Construct the core app object."""
    app = Flask(__name__, instance_relative_config=False)
    # Application Configuration

    app.config.from_object('config.Config')

    # Initialize Plugins
    db.init_app(app)
    login_manager.init_app(app)

    #All the database migration will be hero__image
    migrate = Migrate(app, db)

    with app.app_context():
        from . import routes
        from . import auth_routes

        app.register_blueprint(routes.main_bp)
        app.register_blueprint(auth_routes.auth)

        # Create Database Models
        db.create_all()

        return app
