
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Aplicación - Inicio</title>
    <link rel="stylesheet" href="styles.css">
    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <!-- Leaflet JS -->
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
</head>
<body>
    <div id="app">
        <!-- Página de Inicio -->
        <div id="home-page" class="page active">
            <header>
                <nav class="navbar">
                    <div class="nav-brand">
                        <h1>Mi Aplicación</h1>
                    </div>
                    <div class="nav-links">
                        <button class="btn btn-outline" onclick="showPage('login-page')">Iniciar Sesión</button>
                        <button class="btn btn-primary" onclick="showPage('register-page')">Registrarse</button>
                    </div>
                </nav>
            </header>
            <main class="hero">
                <div class="hero-content">
                    <h2>Bienvenido a Nuestra Plataforma</h2>
                    <p>Una solución moderna y eficiente para gestionar tus proyectos</p>
                    <div class="hero-buttons">
                        <button class="btn btn-primary btn-large" onclick="showPage('register-page')">Comenzar Ahora</button>
                        <button class="btn btn-outline btn-large" onclick="showPage('login-page')">Ya tengo cuenta</button>
                    </div>
                </div>
            </main>
        </div>

        <!-- Página de Inicio de Sesión -->
        <div id="login-page" class="page">
            <div class="auth-container">
                <div class="auth-card">
                    <h2>Iniciar Sesión</h2>
                    <form id="login-form" onsubmit="handleLogin(event)">
                        <div class="form-group">
                            <label for="login-email">Correo Electrónico</label>
                            <input type="email" id="login-email" name="email" required>
                            <span class="error-message" id="login-email-error"></span>
                        </div>
                        <div class="form-group">
                            <label for="login-password">Contraseña</label>
                            <input type="password" id="login-password" name="password" required>
                            <span class="error-message" id="login-password-error"></span>
                        </div>
                        <button type="submit" class="btn btn-primary btn-full">Iniciar Sesión</button>
                    </form>
                    <div class="auth-footer">
                        <p>¿No tienes cuenta? <a href="#" onclick="showPage('register-page')">Regístrate aquí</a></p>
                        <p><a href="#" onclick="showPage('home-page')">Volver al inicio</a></p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Página de Registro -->
        <div id="register-page" class="page">
            <div class="auth-container">
                <div class="auth-card">
                    <h2>Crear Cuenta</h2>
                    <form id="register-form" onsubmit="handleRegister(event)">
                        <div class="form-group">
                            <label for="register-name">Nombre Completo</label>
                            <input type="text" id="register-name" name="name" required>
                            <span class="error-message" id="register-name-error"></span>
                        </div>
                        <div class="form-group">
                            <label for="register-email">Correo Electrónico</label>
                            <input type="email" id="register-email" name="email" required>
                            <span class="error-message" id="register-email-error"></span>
                        </div>
                        <div class="form-group">
                            <label for="register-password">Contraseña</label>
                            <input type="password" id="register-password" name="password" required>
                            <span class="error-message" id="register-password-error"></span>
                        </div>
                        <div class="form-group">
                            <label for="register-confirm">Confirmar Contraseña</label>
                            <input type="password" id="register-confirm" name="confirm" required>
                            <span class="error-message" id="register-confirm-error"></span>
                        </div>
                        <button type="submit" class="btn btn-primary btn-full">Crear Cuenta</button>
                    </form>
                    <div class="auth-footer">
                        <p>¿Ya tienes cuenta? <a href="#" onclick="showPage('login-page')">Inicia sesión aquí</a></p>
                        <p><a href="#" onclick="showPage('home-page')">Volver al inicio</a></p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Panel de Reporte de Incidencias -->
        <div id="dashboard-page" class="page">
            <header class="dashboard-header">
                <nav class="navbar">
                    <div class="nav-brand">
                        <h1>Sistema de Incidencias</h1>
                    </div>
                    <div class="nav-links">
                        <span class="user-name" id="user-name">Usuario</span>
                        <button class="btn btn-outline" onclick="logout()">Cerrar Sesión</button>
                    </div>
                </nav>
            </header>
            <div class="dashboard-container">
                <aside class="sidebar">
                    <ul class="sidebar-menu">
                        <li><a href="#" class="menu-item active" onclick="showDashboardSection('overview')">Resumen</a></li>
                        <li><a href="#" class="menu-item" onclick="showDashboardSection('report')">Nuevo Reporte</a></li>
                        <li><a href="#" class="menu-item" onclick="showDashboardSection('incidents')">Ver Incidencias</a></li>
                        <li><a href="#" class="menu-item" onclick="showDashboardSection('profile')">Perfil</a></li>
                    </ul>
                </aside>
                <main class="dashboard-content">
                    <!-- Sección Resumen -->
                    <div id="overview-section" class="dashboard-section active">
                        <h2>Resumen de Incidencias</h2>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <h3>Total Incidencias</h3>
                                <div class="stat-number">45</div>
                            </div>
                            <div class="stat-card">
                                <h3>Accidentes</h3>
                                <div class="stat-number">18</div>
                            </div>
                            <div class="stat-card">
                                <h3>Robos</h3>
                                <div class="stat-number">12</div>
                            </div>
                            <div class="stat-card">
                                <h3>Otros</h3>
                                <div class="stat-number">15</div>
                            </div>
                        </div>
                        
                        <!-- Mapa de República Dominicana -->
                        <div class="map-section">
                            <h3>Mapa de Incidencias - República Dominicana</h3>
                            <div id="dominican-map"></div>
                        </div>
                        <div class="recent-incidents">
                            <h3>Incidencias Recientes</h3>
                            <div class="incident-list">
                                <div class="incident-card">
                                    <h4>Accidente de tránsito</h4>
                                    <p><strong>Fecha:</strong> 20/08/2024</p>
                                    <p><strong>Ubicación:</strong> Santiago, Centro</p>
                                    <span class="status accident">Accidente</span>
                                </div>
                                <div class="incident-card">
                                    <h4>Robo en residencia</h4>
                                    <p><strong>Fecha:</strong> 19/08/2024</p>
                                    <p><strong>Ubicación:</strong> Santo Domingo, Naco</p>
                                    <span class="status robbery">Robo</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sección Nuevo Reporte -->
                    <div id="report-section" class="dashboard-section">
                        <h2>Reportar Nueva Incidencia</h2>
                        <form id="incident-form" class="incident-form" onsubmit="handleIncidentReport(event)">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="incident-date">Fecha de Ocurrencia</label>
                                    <input type="datetime-local" id="incident-date" name="date" required>
                                </div>
                                <div class="form-group">
                                    <label for="incident-title">Título</label>
                                    <input type="text" id="incident-title" name="title" required>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Tipo de Incidencia</label>
                                <div class="checkbox-group">
                                    <label class="checkbox-item">
                                        <input type="checkbox" name="type" value="accidente"> Accidente
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" name="type" value="pelea"> Pelea
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" name="type" value="robo"> Robo
                                    </label>
                                    <label class="checkbox-item">
                                        <input type="checkbox" name="type" value="desastre"> Desastre
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="incident-description">Descripción</label>
                                <textarea id="incident-description" name="description" rows="4" required></textarea>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="incident-province">Provincia</label>
                                    <select id="incident-province" name="province" required>
                                        <option value="">Seleccionar provincia</option>
                                        <option value="Santo Domingo">Santo Domingo</option>
                                        <option value="Santiago">Santiago</option>
                                        <option value="La Vega">La Vega</option>
                                        <option value="San Cristóbal">San Cristóbal</option>
                                        <option value="Puerto Plata">Puerto Plata</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="incident-municipality">Municipio</label>
                                    <input type="text" id="incident-municipality" name="municipality" required>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="incident-neighborhood">Barrio</label>
                                    <input type="text" id="incident-neighborhood" name="neighborhood" required>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="incident-latitude">Latitud</label>
                                    <input type="number" step="any" id="incident-latitude" name="latitude" placeholder="18.4861">
                                </div>
                                <div class="form-group">
                                    <label for="incident-longitude">Longitud</label>
                                    <input type="number" step="any" id="incident-longitude" name="longitude" placeholder="-69.9312">
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="incident-deaths">Muertos</label>
                                    <input type="number" id="incident-deaths" name="deaths" min="0" value="0">
                                </div>
                                <div class="form-group">
                                    <label for="incident-injured">Heridos</label>
                                    <input type="number" id="incident-injured" name="injured" min="0" value="0">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="incident-loss">Pérdida Estimada (RD$)</label>
                                <input type="number" id="incident-loss" name="loss" min="0" step="0.01" placeholder="0.00">
                            </div>

                            <div class="form-group">
                                <label for="incident-social">Link a Redes Sociales</label>
                                <input type="url" id="incident-social" name="social" placeholder="https://...">
                            </div>

                            <div class="form-group">
                                <label for="incident-photo">Foto del Hecho</label>
                                <input type="file" id="incident-photo" name="photo" accept="image/*">
                            </div>

                            <button type="submit" class="btn btn-primary btn-full">Reportar Incidencia</button>
                        </form>
                    </div>

                    <!-- Sección Ver Incidencias -->
                    <div id="incidents-section" class="dashboard-section">
                        <h2>Listado de Incidencias</h2>
                        <div class="filters">
                            <select id="filter-type" onchange="filterIncidents()">
                                <option value="">Todos los tipos</option>
                                <option value="accidente">Accidentes</option>
                                <option value="pelea">Peleas</option>
                                <option value="robo">Robos</option>
                                <option value="desastre">Desastres</option>
                            </select>
                            <select id="filter-province" onchange="filterIncidents()">
                                <option value="">Todas las provincias</option>
                                <option value="Santo Domingo">Santo Domingo</option>
                                <option value="Santiago">Santiago</option>
                                <option value="La Vega">La Vega</option>
                            </select>
                        </div>
                        <div id="incidents-list" class="incidents-grid">
                            <!-- Las incidencias se cargarán aquí dinámicamente -->
                        </div>
                    </div>

                    <!-- Sección Perfil -->
                    <div id="profile-section" class="dashboard-section">
                        <h2>Mi Perfil</h2>
                        <div class="profile-form">
                            <div class="form-group">
                                <label for="profile-name">Nombre</label>
                                <input type="text" id="profile-name" value="Usuario Demo">
                            </div>
                            <div class="form-group">
                                <label for="profile-email">Email</label>
                                <input type="email" id="profile-email" value="usuario@ejemplo.com">
                            </div>
                            <button class="btn btn-primary">Guardar Cambios</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
