import os
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from chicago_dish_removal import dish_removal_app

app = dish_removal_app()


migrate = Migrate(app)
manager = Manager(app)

manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()
