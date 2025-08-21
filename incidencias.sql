-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    tipo ENUM('reportero', 'validador', 'admin') DEFAULT 'reportero',
    avatar VARCHAR(255),
    oauth_provider VARCHAR(50),
    oauth_uid VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de provincias
CREATE TABLE provincias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla de municipios
CREATE TABLE municipios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    provincia_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    FOREIGN KEY (provincia_id) REFERENCES provincias(id),
    UNIQUE KEY (provincia_id, nombre)
);

-- Tabla de barrios
CREATE TABLE barrios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    municipio_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    FOREIGN KEY (municipio_id) REFERENCES municipios(id),
    UNIQUE KEY (municipio_id, nombre)
);

-- Tabla de tipos de incidencia
CREATE TABLE tipos_incidencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    icono VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL
);

-- Tabla de incidencias
CREATE TABLE incidencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    fecha_ocurrencia DATETIME NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    provincia_id INT NOT NULL,
    municipio_id INT NOT NULL,
    barrio_id INT,
    latitud DECIMAL(10, 8) NOT NULL,
    longitud DECIMAL(11, 8) NOT NULL,
    muertos INT DEFAULT 0,
    heridos INT DEFAULT 0,
    perdida_estimada DECIMAL(12, 2) DEFAULT 0,
    redes_sociales VARCHAR(255),
    foto VARCHAR(255),
    estado ENUM('pendiente', 'validado', 'rechazado') DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (provincia_id) REFERENCES provincias(id),
    FOREIGN KEY (municipio_id) REFERENCES municipios(id),
    FOREIGN KEY (barrio_id) REFERENCES barrios(id)
);

-- Tabla de relación incidencia-tipo (muchos a muchos)
CREATE TABLE incidencia_tipos (
    incidencia_id INT NOT NULL,
    tipo_id INT NOT NULL,
    PRIMARY KEY (incidencia_id, tipo_id),
    FOREIGN KEY (incidencia_id) REFERENCES incidencias(id) ON DELETE CASCADE,
    FOREIGN KEY (tipo_id) REFERENCES tipos_incidencia(id)
);

-- Tabla de correcciones
CREATE TABLE correcciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    incidencia_id INT NOT NULL,
    usuario_id INT NOT NULL,
    campo_afectado VARCHAR(50) NOT NULL,
    valor_anterior TEXT,
    valor_nuevo TEXT,
    estado ENUM('pendiente', 'aceptado', 'rechazado') DEFAULT 'pendiente',
    comentario TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (incidencia_id) REFERENCES incidencias(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de comentarios
CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    incidencia_id INT NOT NULL,
    usuario_id INT NOT NULL,
    contenido TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (incidencia_id) REFERENCES incidencias(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
