from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo, Length, Optional


class SignupForm(FlaskForm):
    """User Signup Form."""

    name = StringField("Name", validators=[DataRequired()])
    email = StringField(
        "Email",
        validators=[
            Length(min=6),
            Email(message="Enter a valid email."),
            DataRequired(),
        ],
    )
    password = PasswordField(
        "Password",
        validators=[
            DataRequired(),
            Length(min=6, message="Select a stronger password."),
        ],
    )
    confirm = PasswordField(
        "Confirm Your Password",
        validators=[
            DataRequired(),
            EqualTo("password", message="Passwords must match."),
        ],
    )

    submit = SubmitField("Register")


class LoginForm(FlaskForm):
    """User Login Form."""

    email = StringField(
        "Email", validators=[DataRequired(), Email(message="Enter a valid email.")]
    )
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField("Log In")


class BookingForm(FlaskForm):
    """User Appointment Form."""

    booking_time = StringField("booking_time", validators=[DataRequired()])

    address_line_1 = StringField("Address Line 1", validators=[DataRequired()])

    address_line_2 = StringField("Address Line 2")

    city = StringField("City", validators=[DataRequired()])

    state = StringField("State", validators=[DataRequired()])

    zipcode = StringField("Zipcode", validators=[DataRequired()])
