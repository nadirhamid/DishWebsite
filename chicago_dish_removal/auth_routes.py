from flask import Blueprint, redirect,flash, render_template, request, session, url_for
from flask_login import login_required, logout_user, current_user, login_user
from .forms import SignupForm, LoginForm
from .models import db, UserAccount, UserAppointments
from . import login_manager
from . import db
from werkzeug.security import generate_password_hash, check_password_hash

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main_bp.dashboard'))  # Bypass if user is logged in

    login_form = LoginForm()

    if request.method == 'POST':
        #if login_form.validate_on_submit():
        email = request.form.get('email')
        password = request.form.get('password')
        user = UserAccount.query.filter_by(email=email).first()  # Validate Login Attempt
        if user and user.check_password(password=password):
            login_user(user)
            next_page = request.args.get('next')
            return redirect(next_page or url_for('main_bp.index'))
    flash('Invalid username/password combination')
    return redirect(url_for('main_bp.index', attempt_login='true'))


@auth.route('/register', methods=['GET', 'POST'])
def signup():
    signup_form = SignupForm()
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        existing_user = UserAccount.query.filter_by(email=email).first()  # Check if user exists
        if existing_user is None:
            user = UserAccount(name=name,
            email=email,
            password=generate_password_hash(password, method='sha256'))
            db.session.add(user)
            db.session.commit()  # Create new user
            login_user(user)  # Log in as newly created user
            return redirect(url_for('main_bp.booking'))
    flash('A user already exists with that email address.')
    return redirect(url_for('main_bp.index', attempt_register='true'))



@login_manager.user_loader
def load_user(user_id):
    """Check if user is logged-in on every page load."""
    if user_id is not None:
        return UserAccount.query.get(user_id)
    return None


@login_manager.unauthorized_handler
def unauthorized():
    """Redirect unauthorized users to Login page."""
    return redirect(url_for('main_bp.index'))
