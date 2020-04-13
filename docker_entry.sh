# exit on error
set -e

echo "Database URL ${SQLALCHEMY_DATABASE_URI}"

echo "RUNNING MIGRATIONS"
python db-migrate.py

#run server
python wsgi.py