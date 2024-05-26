document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Login successful');
        localStorage.setItem('token', data.token);
        if (role === 'doctor') {
            window.location.href = 'doctor_dashboard.html';
        } else {
            window.location.href = 'patient_dashboard.html';
        }
    } else {
        alert(data.message);
    }
});

document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Signup successful');
        window.location.href = 'login.html';
    } else {
        alert(data.message);
    }
});

async function fetchDoctorDetails() {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/doctors/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (response.ok) {
        document.getElementById('doctorDetails').innerHTML = `
            <h2>Welcome, Dr. ${data.username}</h2>
            <p>Email: ${data.email}</p>
            <p>Department: ${data.department}</p>
            <p>City: ${data.city}</p>
        `;
        fetchAppointments();
    } else {
        alert(data.message);
    }
}

async function fetchAppointments() {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/bookings/doctor', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (response.ok) {
        const appointmentsList = document.getElementById('appointmentsList');
        appointmentsList.innerHTML = '';
        data.forEach(appointment => {
            appointmentsList.innerHTML += `
                <div class="appointmentCard">
                    <p>Patient: ${appointment.patientName}</p>
                    <p>Date: ${appointment.date}</p>
                    <p>Time: ${appointment.time}</p>
                    <p>Reason: ${appointment.reason}</p>
                </div>
            `;
        });
    } else {
        alert(data.message);
    }
}

document.getElementById('closeBookings')?.addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/doctors/close-bookings', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        alert('Bookings closed');
    } else {
        const data = await response.json();
        alert(data.message);
    }
});

async function fetchPatientDetails() {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/patients/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (response.ok) {
        document.getElementById('patientDetails').innerHTML = `
            <h2>Welcome, ${data.username}</h2>
            <p>Email: ${data.email}</p>
        `;
        fetchPatientAppointments();
    } else {
        alert(data.message);
    }
}

async function fetchPatientAppointments() {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/bookings/patient', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (response.ok) {
        const patientAppointmentsList = document.getElementById('patientAppointmentsList');
        patientAppointmentsList.innerHTML = '';
        data.forEach(appointment => {
            patientAppointmentsList.innerHTML += `
                <div class="appointmentCard">
                    <p>Doctor: ${appointment.doctorName}</p>
                    <p>Date: ${appointment.date}</p>
                    <p>Time: ${appointment.time}</p>
                    <p>Reason: ${appointment.reason}</p>
                </div>
            `;
        });
    } else {
        alert(data.message);
    }
}

document.getElementById('searchForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const search = document.getElementById('search').value;

    const response = await fetch(`/api/doctors/search?query=${search}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (response.ok) {
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = '';
        data.forEach(doctor => {
            searchResults.innerHTML += `
                <div class="doctorCard">
                    <h3>Dr. ${doctor.username}</h3>
                    <p>Email: ${doctor.email}</p>
                    <p>Department: ${doctor.department}</p>
                    <p>City: ${doctor.city}</p>
                    <button onclick="bookAppointment('${doctor._id}')">Book Appointment</button>
                </div>
            `;
        });
    } else {
        alert(data.message);
    }
});

async function bookAppointment(doctorId) {
    localStorage.setItem('doctorId', doctorId);
    window.location.href = 'booking.html';
}

document.getElementById('bookingForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const doctorId = localStorage.getItem('doctorId');
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const reason = document.getElementById('reason').value;

    const token = localStorage.getItem('token');
    const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorId, date, time, reason }),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Appointment booked successfully');
        window.location.href = 'patient_dashboard.html';
    } else {
        alert(data.message);
    }
});

window.onload = async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (role === 'doctor') {
        fetchDoctorDetails();
    } else if (role === 'patient') {
        fetchPatientDetails();
    }
};
