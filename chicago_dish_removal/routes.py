from datetime import datetime, timedelta
import random
import string
import logging
from flask import Blueprint, render_template, flash, redirect, request, session, url_for
from flask_login import current_user
import stripe
from flask import current_app as app
from flask_login import login_required, logout_user
from flask_mail import Mail, Message
from werkzeug.security import generate_password_hash
from .forms import SignupForm, LoginForm, BookingForm
from .models import db, UserAccount, UserAppointments

main_bp = Blueprint("main_bp", __name__, template_folder="templates", static_folder="static")

logger = logging.getLogger(__name__)

mail = Mail(app)

# session expires after 5 minutes
app.permanent_session_lifetime = timedelta(seconds=app.config.get("ADMIN_SESSION"))

stripe.api_key = app.config.get("STRIPE_SECRET_KEY")


@main_bp.route("/", methods=["GET"])
def index():
    signup_form = SignupForm()
    signin_form = LoginForm()
    return render_template(
        "home.html",
        title="Dish Removal",
        form=signup_form,
        signin_form=signin_form,
        user=current_user,
    )


@app.route("/adminsign", methods=["GET", "POST"])
def adminsign():
    session.permanent = True
    if request.method == "POST":
        password = request.form.get("password")
        email = request.form.get("email")

        if email == app.config.get("ADMIN_EMAIL") and password == app.config.get("ADMIN_PWD"):
            session['admin'] = email
            return redirect(url_for("admin"))
        else:
            flash("Wrong credentials.")

        return redirect(url_for("adminsign"))

    if session.get('admin'):
        return redirect(url_for("admin"))

    return render_template('adminSign.html')


@app.route('/admin', methods=['GET', 'POST'])
def admin():
    if not session.get('admin'):
        return redirect(url_for("adminsign"))

    if request.method == "POST":                     # if POST, then confirm payment
        booking_id = request.form.get("bookingId")
        booking = UserAppointments.query.get(booking_id)
        if not booking:
            flash("Such appointment does not exist. Please check again!", 'danger')
            return redirect(url_for("admin"))

        try:
            charge = stripe.Charge.create(
                amount=int(booking.price * 100),
                currency='usd',
                customer=booking.cus_id,
                description='A payment for the Dishes service.'
            )
            booking.paid = True
            db.session.commit()
            flash("The payment has been confirmed! The amount paid was ${}".format(booking.price), 'success')
        except Exception as e:
            flash("The payment failed! Reason: {}".format(str(e)), 'danger')

        return redirect(url_for("admin"))           # prevent resend FORM on page refresh

    bookings = UserAppointments.query.filter_by(paid=False).all()
    return render_template('admin.html', bookings=bookings)


@main_bp.route("/booking", methods=["GET", "POST"])
def booking():
    signup_form = SignupForm()
    signin_form = LoginForm()
    booking_form = BookingForm()

    if request.method == "POST":
        stripe_token = request.form.get("stripeToken")
        full_name = request.form.get("full_name")
        visitor_email = request.form.get("visitor_email")
        visitor_phone = request.form.get("visitor_phone")
        booking_time = datetime.strptime(
            request.form.get("booking_time"), "%m/%d/%Y %I:%M %p"
        )
        address_line_1 = request.form.get("address_line_1")
        address_line_2 = request.form.get("address_line_2")
        city = request.form.get("city")
        state = request.form.get("state")
        zipcode = request.form.get("zipcode")
        luxury = bool(request.form.get("luxury"))
        dishes = int(request.form.get("dishes"))
        password = randomPassword(8)
        existing_user = UserAccount.query.filter_by(email=visitor_email).first()

        if existing_user is None:
            try:
                user = UserAccount(
                    name=full_name,
                    email=visitor_email,
                    password=generate_password_hash(password, method="sha256"),
                )
                db.session.add(user)
                db.session.commit()  # Create new user
            except Exception as e:
                logger.error(
                    "ERROR_IN_REGISTERING_USER | CRITICAL | ALERT {}".format(str(e))
                )
        else:
            user = existing_user

        try:
            customer = stripe.Customer.create(
                email=visitor_email,
                source=stripe_token
            )

            price = compose_price(dishes, luxury)

            appointment = UserAppointments(
                booking_time=booking_time,
                address_line_1=address_line_1,
                address_line_2=address_line_2,
                city=city,
                state=state,
                zipcode=zipcode,
                visitor_name=full_name,
                visitor_email=visitor_email,
                visitor_phone_number=visitor_phone,
                UserAccount_id=user.id,
                cus_id=customer.id,
                luxury=luxury,
                dishes=dishes,
                price=price
            )
            db.session.add(appointment)
            db.session.commit()
            msg = Message(
                subject="New booking request from " + str(full_name),
                sender=app.config.get("MAIL_USERNAME"),
                recipients=[visitor_email, app.config.get("NOTIFICATION_EMAIL")],
                body="Hi Admin,\n\nThere is new booking request with the following details,\n\nName: "
                + str(full_name)
                + "\nEmail: "
                + str(visitor_email)
                + "\nPrice: $"
                + str(price)
                + "\nPhone No: "
                + str(visitor_phone)
                + "\nBooking time: "
                + str(request.form.get("booking_time"))
                + "\nAddress: "
                + str(address_line_1)
                + ","
                + str(address_line_2)
                + "\n"
                + str(city)
                + ", "
                + str(state)
                + ", "
                + str(zipcode),
            )
            mail.send(msg)
            flash("Your Request has been sent", 'success')
        except Exception as e:
            flash("Error while sending booking request! " + str(e), 'danger')
            logger.error(
                "ERROR_IN_BOOKING_REQUEST | CRITICAL | ALERT {}".format(str(e))
            )

        return redirect(url_for("main_bp.booking"))
    return render_template(
        "booking.html",
        title="Schedule a appointment",
        booking_form=booking_form,
        form=signup_form,
        signin_form=signin_form,
        user=current_user,
        pub_key=app.config.get("STRIPE_PUBLISHABLE_KEY"),
        regular_price=app.config.get("REGULAR_PRICE"),
        luxury_price=app.config.get("LUXURY_PRICE"),
        additional_price=app.config.get("ADDITIONAL_PRICE")
    )


@main_bp.route("/terms")
def terms():
    signup_form = SignupForm()
    signin_form = LoginForm()
    return render_template(
        "terms.html",
        title="Terms and condition",
        form=signup_form,
        signin_form=signin_form,
        user=current_user,
    )


@main_bp.route("/privacy")
def privacy():
    signup_form = SignupForm()
    signin_form = LoginForm()
    return render_template(
        "privacy.html",
        title="Privacy Policy",
        form=signup_form,
        signin_form=signin_form,
        user=current_user,
    )


@main_bp.route("/faq")
def faq():
    signup_form = SignupForm()
    signin_form = LoginForm()
    return render_template(
        "faq.html",
        title="FAQ's",
        form=signup_form,
        signin_form=signin_form,
        user=current_user,
    )


@main_bp.route("/logout")
@login_required
def logout():
    """User log-out logic."""
    logout_user()
    return redirect(url_for("main_bp.index"))


def compose_price(dishes, luxury):
    if int(dishes) < 1:
        raise ValueError('Invalid number of dishes!')

    additional = dishes - 1
    price = additional * app.config.get("ADDITIONAL_PRICE") + app.config.get("REGULAR_PRICE")
    if luxury:
        price = additional * app.config.get("ADDITIONAL_PRICE") + app.config.get("LUXURY_PRICE")

    return float('%.2f' % price)


def randomPassword(stringLength=10):
    """Generate a random string of fixed length """
    letters = string.ascii_lowercase
    return "".join(random.choice(letters) for i in range(stringLength))
