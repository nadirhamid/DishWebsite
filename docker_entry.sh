# exit on error
set -e

echo "Database URL ${SQLALCHEMY_DATABASE_URI}"

echo "RUNNING MIGRATIONS"

python3 db-migrate.py db stamp head # To set the revision in the database to the head, without performing any migrations. You can change head to the required change you want.
python3 db-migrate.py db migrate # To detect automatically all the changes.
python3 db-migrate.py db upgrade # To apply all the changes.

echo "RUNNING SERVER"

#run server
python wsgi.py