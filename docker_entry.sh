# exit on error
set -e

echo "Database URL ${SQLALCHEMY_DATABASE_URI}"

echo "RUNNING MIGRATIONS"
python3 db-migrate.py db migrate
python3 db-migrate.py db upgrade

echo "RUNNING SERVER"

#run server
python wsgi.py