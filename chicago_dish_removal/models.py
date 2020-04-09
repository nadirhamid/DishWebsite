from . import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


class UserAccount(UserMixin, db.Model):
    """Model for user accounts."""

    __tablename__ = "UserAccount"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False, unique=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(
        db.String(200), primary_key=False, unique=False, nullable=False
    )
    created_on = db.Column(db.DateTime, index=False, unique=False, nullable=True)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return "<User {}>".format(self.email)


class UserAppointments(UserMixin, db.Model):
    """Model for user appoinments."""

    __tablename__ = "UserAppointments"

    id = db.Column(db.Integer, primary_key=True)
    UserAccount_id = db.Column(
        db.Integer, db.ForeignKey("UserAccount.id"), nullable=True
    )

    visitor_name = db.Column(db.String(20), nullable=True)
    visitor_email = db.Column(db.String(80), nullable=True)
    visitor_phone_number = db.Column(db.String(20), nullable=True)
    address_line_1 = db.Column(db.String(50), unique=False, nullable=False)
    address_line_2 = db.Column(db.String(50), unique=False, nullable=True)
    city = db.Column(db.String(20), unique=False, nullable=False)
    state = db.Column(db.String(20), unique=False, nullable=False)
    zipcode = db.Column(db.String(20), unique=False, nullable=False)
    booking_time = db.Column(db.DateTime, index=False, unique=False, nullable=False)
    cus_id = db.Column(db.String(50), unique=True, nullable=True)
    paid = db.Column(db.Boolean, default=False)
    luxury = db.Column(db.Boolean, default=False)
    dishes = db.Column(db.Integer)
    price = db.Column(db.FLOAT)
    created_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=True)
    updated_on = db.Column(
        db.DateTime(), default=datetime.utcnow, onupdate=datetime.utcnow
    )

    def __str__(self):
        return "<User Appointment id: {} visitor_name: {} dishes: {} price: {}>"\
            .format(self.id, self.visitor_name, self.dishes, self.price)

    def __uapt__(self):
        return "<User Appointment {}>".format(self.status)
