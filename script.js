
// Variables globales
let currentUser = null;

// Funciones de navegación
function showPage(pageId) {
    // Ocultar todas las páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Mostrar la página seleccionada
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

function showDashboardSection(sectionId) {
    // Remover clase active de todos los elementos del menú
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    
    // Agregar clase active al elemento clickeado
    event.target.classList.add('active');
    
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionId + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Validaciones de formularios
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + '-error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

// Manejo del formulario de login
function handleLogin(event) {
    event.preventDefault();
    clearErrors();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    let hasErrors = false;
    
    // Validar email
    if (!validateEmail(email)) {
        showError('login-email', 'Por favor ingresa un email válido');
        hasErrors = true;
    }
    
    // Validar contraseña
    if (!validatePassword(password)) {
        showError('login-password', 'La contraseña debe tener al menos 6 caracteres');
        hasErrors = true;
    }
    
    if (!hasErrors) {
        // Simular login exitoso
        currentUser = {
            name: 'Usuario Demo',
            email: email
        };
        
        // Actualizar nombre de usuario en el dashboard
        const userNameElement = document.getElementById('user-name');
        if (userNameElement) {
            userNameElement.textContent = currentUser.name;
        }
        
        // Mostrar mensaje de éxito y redirigir
        alert('¡Login exitoso! Bienvenido/a ' + currentUser.name);
        showPage('dashboard-page');
    }
}

// Manejo del formulario de registro
function handleRegister(event) {
    event.preventDefault();
    clearErrors();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    
    let hasErrors = false;
    
    // Validar nombre
    if (name.trim().length < 2) {
        showError('register-name', 'El nombre debe tener al menos 2 caracteres');
        hasErrors = true;
    }
    
    // Validar email
    if (!validateEmail(email)) {
        showError('register-email', 'Por favor ingresa un email válido');
        hasErrors = true;
    }
    
    // Validar contraseña
    if (!validatePassword(password)) {
        showError('register-password', 'La contraseña debe tener al menos 6 caracteres');
        hasErrors = true;
    }
    
    // Validar confirmación de contraseña
    if (password !== confirmPassword) {
        showError('register-confirm', 'Las contraseñas no coinciden');
        hasErrors = true;
    }
    
    if (!hasErrors) {
        // Simular registro exitoso
        currentUser = {
            name: name,
            email: email
        };
        
        // Mostrar mensaje de éxito y redirigir al login
        alert('¡Registro exitoso! Ahora puedes iniciar sesión');
        showPage('login-page');
        
        // Limpiar formulario
        document.getElementById('register-form').reset();
    }
}

// Función de logout
function logout() {
    currentUser = null;
    alert('Sesión cerrada correctamente');
    showPage('home-page');
}

// Función para manejar clics en tareas
document.addEventListener('DOMContentLoaded', function() {
    // Agregar listeners para las tareas del dashboard
    const taskCheckboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = 'line-through';
                label.style.opacity = '0.6';
            } else {
                label.style.textDecoration = 'none';
                label.style.opacity = '1';
            }
        });
    });
    
    // Aplicar estilos iniciales a tareas marcadas
    const checkedTasks = document.querySelectorAll('.task-item input[type="checkbox"]:checked');
    checkedTasks.forEach(checkbox => {
        const label = checkbox.nextElementSibling;
        label.style.textDecoration = 'line-through';
        label.style.opacity = '0.6';
    });
});

// Array para almacenar incidencias (simulación de base de datos)
let incidents = [
    {
        id: 1,
        date: '2024-08-20T14:30',
        title: 'Accidente de tránsito en Autopista Duarte',
        types: ['accidente'],
        description: 'Colisión múltiple entre 3 vehículos en la autopista Duarte, km 25.',
        province: 'Santiago',
        municipality: 'Santiago',
        neighborhood: 'Autopista Duarte',
        latitude: 19.4517,
        longitude: -70.6970,
        deaths: 0,
        injured: 5,
        loss: 150000,
        socialLink: 'https://twitter.com/example',
        photo: null
    },
    {
        id: 2,
        date: '2024-08-19T22:15',
        title: 'Robo a mano armada en residencia',
        types: ['robo'],
        description: 'Asalto en residencia del sector Naco, sustrajeron artículos electrónicos.',
        province: 'Santo Domingo',
        municipality: 'Santo Domingo',
        neighborhood: 'Naco',
        latitude: 18.4746,
        longitude: -69.9289,
        deaths: 0,
        injured: 0,
        loss: 75000,
        socialLink: '',
        photo: null
    }
];

// Funciones del sistema de incidencias
function handleIncidentReport(event) {
    event.preventDefault();
    clearErrors();
    
    const formData = new FormData(event.target);
    const types = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
    
    if (types.length === 0) {
        alert('Debe seleccionar al menos un tipo de incidencia');
        return;
    }
    
    const newIncident = {
        id: incidents.length + 1,
        date: formData.get('date'),
        title: formData.get('title'),
        types: types,
        description: formData.get('description'),
        province: formData.get('province'),
        municipality: formData.get('municipality'),
        neighborhood: formData.get('neighborhood'),
        latitude: parseFloat(formData.get('latitude')) || null,
        longitude: parseFloat(formData.get('longitude')) || null,
        deaths: parseInt(formData.get('deaths')) || 0,
        injured: parseInt(formData.get('injured')) || 0,
        loss: parseFloat(formData.get('loss')) || 0,
        socialLink: formData.get('social'),
        photo: formData.get('photo').name || null
    };
    
    incidents.unshift(newIncident);
    
    alert('Incidencia reportada exitosamente');
    event.target.reset();
    updateStats();
    loadIncidents();
}

function updateStats() {
    // Actualizar estadísticas
    const totalIncidents = incidents.length;
    const accidents = incidents.filter(i => i.types.includes('accidente')).length;
    const robberies = incidents.filter(i => i.types.includes('robo')).length;
    const others = totalIncidents - accidents - robberies;
    
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers[0]) statNumbers[0].textContent = totalIncidents;
    if (statNumbers[1]) statNumbers[1].textContent = accidents;
    if (statNumbers[2]) statNumbers[2].textContent = robberies;
    if (statNumbers[3]) statNumbers[3].textContent = others;
}

function loadIncidents() {
    const incidentsList = document.getElementById('incidents-list');
    if (!incidentsList) return;
    
    const typeFilter = document.getElementById('filter-type').value;
    const provinceFilter = document.getElementById('filter-province').value;
    
    let filteredIncidents = incidents;
    
    if (typeFilter) {
        filteredIncidents = filteredIncidents.filter(incident => 
            incident.types.includes(typeFilter)
        );
    }
    
    if (provinceFilter) {
        filteredIncidents = filteredIncidents.filter(incident => 
            incident.province === provinceFilter
        );
    }
    
    incidentsList.innerHTML = filteredIncidents.map(incident => `
        <div class="incident-detail-card">
            <h4>${incident.title}</h4>
            <div class="incident-info"><strong>Fecha:</strong> ${new Date(incident.date).toLocaleString('es-ES')}</div>
            <div class="incident-info"><strong>Ubicación:</strong> ${incident.neighborhood}, ${incident.municipality}, ${incident.province}</div>
            <div class="incident-types">
                ${incident.types.map(type => `<span class="type-badge ${type}">${type}</span>`).join('')}
            </div>
            <div class="incident-info"><strong>Descripción:</strong> ${incident.description}</div>
            ${incident.latitude && incident.longitude ? 
                `<div class="incident-info"><strong>Coordenadas:</strong> ${incident.latitude}, ${incident.longitude}</div>` : ''}
            <div class="casualties">
                <div class="casualty-item">
                    <div class="casualty-number">${incident.deaths}</div>
                    <div>Muertos</div>
                </div>
                <div class="casualty-item">
                    <div class="casualty-number">${incident.injured}</div>
                    <div>Heridos</div>
                </div>
            </div>
            ${incident.loss > 0 ? 
                `<div class="incident-info"><strong>Pérdida estimada:</strong> RD$ ${incident.loss.toLocaleString('es-ES')}</div>` : ''}
            ${incident.socialLink ? 
                `<a href="${incident.socialLink}" target="_blank" class="social-link">Ver en redes sociales</a>` : ''}
        </div>
    `).join('');
}

function filterIncidents() {
    loadIncidents();
}

// Función para simular actualización de perfil
function updateProfile() {
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
    
    if (name.trim() && validateEmail(email)) {
        if (currentUser) {
            currentUser.name = name;
            currentUser.email = email;
            
            // Actualizar nombre en la navbar
            const userNameElement = document.getElementById('user-name');
            if (userNameElement) {
                userNameElement.textContent = currentUser.name;
            }
        }
        
        alert('Perfil actualizado correctamente');
    } else {
        alert('Por favor verifica que todos los campos sean válidos');
    }
}

// Función para inicializar el mapa de República Dominicana
function initializeDominicanMap() {
    // Coordenadas del centro de República Dominicana
    const dominicanRepublicCenter = [18.7357, -70.1627];
    
    // Inicializar el mapa
    const map = L.map('dominican-map').setView(dominicanRepublicCenter, 8);
    
    // Agregar capa de mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Agregar marcadores para las incidencias existentes
    incidents.forEach(incident => {
        if (incident.latitude && incident.longitude) {
            const popupContent = `
                <div class="map-popup">
                    <h4>${incident.title}</h4>
                    <p><strong>Tipo:</strong> ${incident.types.join(', ')}</p>
                    <p><strong>Fecha:</strong> ${new Date(incident.date).toLocaleDateString('es-ES')}</p>
                    <p><strong>Ubicación:</strong> ${incident.neighborhood}, ${incident.municipality}</p>
                    <p><strong>Muertos:</strong> ${incident.deaths} | <strong>Heridos:</strong> ${incident.injured}</p>
                </div>
            `;
            
            // Color del marcador según el tipo de incidencia
            let markerColor = '#007bff';
            if (incident.types.includes('accidente')) markerColor = '#ffc107';
            else if (incident.types.includes('robo')) markerColor = '#dc3545';
            else if (incident.types.includes('pelea')) markerColor = '#17a2b8';
            else if (incident.types.includes('desastre')) markerColor = '#6c757d';
            
            const marker = L.circleMarker([incident.latitude, incident.longitude], {
                radius: 8,
                fillColor: markerColor,
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map);
            
            marker.bindPopup(popupContent);
        }
    });
    
    return map;
}

// Event listeners adicionales cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Agregar listener al botón de guardar perfil
    const profileSection = document.getElementById('profile-section');
    if (profileSection) {
        const saveButton = profileSection.querySelector('.btn-primary');
        if (saveButton) {
            saveButton.addEventListener('click', updateProfile);
        }
    }
    
    // Cargar incidencias iniciales
    loadIncidents();
    
    // Mostrar estadísticas animadas
    animateStats();
    
    // Inicializar el mapa cuando se cargue la página
    setTimeout(() => {
        if (document.getElementById('dominican-map')) {
            initializeDominicanMap();
        }
    }, 500);
});

// Función para animar las estadísticas
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 30;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = finalValue;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentValue);
            }
        }, 50);
    });
}
