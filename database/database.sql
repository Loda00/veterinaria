-- NOMBRE DE BASE DE DATOS  =>  veterinaria

CREATE TABLE tipoMascota (
  ID_TIPO SERIAL NOT NULL,
  DESCRIPTION VARCHAR(30) NOT NULL,
  CONSTRAINT PK_ID_ROL PRIMARY KEY (ID_TIPO)
);

CREATE TABLE razaMascota(
  ID_RAZA SERIAL NOT NULL,
  DESCRIPTION VARCHAR(30) NOT NULL,
  CONSTRAINT PK_ID_RAZA PRIMARY KEY (ID_RAZA)
);

CREATE TABLE estado (
  ID_ESTADO SERIAL NOT NULL,
  DESCRIPTION VARCHAR(30) NOT NULL,
  CONSTRAINT PK_ID_ESTADO PRIMARY KEY (ID_ESTADO)
);

CREATE TABLE doctor (
  ID_DOCTOR SERIAL NOT NULL,
  NOMBRES_APELLIDOS VARCHAR(100) NOT NULL,
  CONSTRAINT PK_ID_DOCTOR PRIMARY KEY (ID_DOCTOR)
);

CREATE TABLE duenio (
  ID_DUENIO SERIAL NOT NULL,
  NOMBRES_APELLIDOS VARCHAR(100) NOT NULL,
  EMAIL VARCHAR(100) NOT NULL,
  DNI INT NOT NULL,
  TELEFONO INT NOT NULL,
  DIRECCION VARCHAR(150) NOT NULL,
  CONSTRAINT PK_ID_DUENIO PRIMARY KEY (ID_DUENIO)
);

CREATE TABLE mascota (
  ID_MASCOTA SERIAL NOT NULL,
  NOMBRE VARCHAR(50),
  ID_DUENIO INT NOT NULL REFERENCES duenio,
  DATE_CREATION DATE DEFAULT CURRENT_DATE NOT NULL,
  TIME_CREATION TIME DEFAULT CURRENT_TIME NOT NULL,
  RAZA INT NOT NULL REFERENCES razaMascota,
  TIPO INT NOT NULL REFERENCES tipoMascota,
  CONSTRAINT PK_ID_MASCOTA PRIMARY KEY (ID_MASCOTA)
);

CREATE TABLE historial (
  ID_HISTORIAL SERIAL NOT NULL,
  ID_MASCOTA INT NOT NULL REFERENCES mascota,
  ID_DUENIO INT NOT NULL REFERENCES duenio,
  ESTADO INT NOT NULL REFERENCES estado,
  DESCRIPCION VARCHAR(200) NOT NULL,
  DATE_CREATION DATE DEFAULT CURRENT_DATE NOT NULL,
  TIME_CREATION TIME DEFAULT CURRENT_TIME NOT NULL,
  ID_DOCTOR INT NOT NULL REFERENCES doctor,
  CONSTRAINT PK_ID_HISTORIAL PRIMARY KEY (ID_HISTORIAL)
);

CREATE TABLE contacto (

);
