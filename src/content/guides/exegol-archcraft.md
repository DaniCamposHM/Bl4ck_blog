---
title: "Instalación de Exegol en Archcraft"
description: "Guía completa para instalar Archcraft en VirtualBox y preparar el entorno para Exegol Framework."
date: 2024-12-08
tags:
  - exegol
  - archcraft
  - linux
  - virtualbox
  - pentesting
---

# Instalación de Exegol framework en Archcraft

Para la instalación de *Exegol framework* primero tenemos que entender que es *Exegol framework* esto se explica mas a detalle en el post de [Exegol Framework](/articles/exegol-framework) en el cual se explican temas importantes.

## Instalación de Archcraft

Para instalar *Archcraft* lo primero que tendremos que hacer es obtener el archivo "**.iso**" el cual es el instalador para este sistema operativo, este se puede encontrar en la pagina oficial de [Archcraft](https://archcraft.io/download.html), este cuenta con varias opciones para este caso se instalara usando la opción de *Google drive*.

> Imagen original: `archcraft_inicio.png` — disponible en el blog anterior en `https://bl4ckjacks-blog.netlify.app/img/user/Images/archcraft_inicio.png`

Para instalar *Archcraft* tendremos dos opciones, la primera opción es mediante un virtualizador como puede ser *virtual box* o *vmware*, la segunda forma es instalar *Archcraft* como sistema operativo principal. Para la instalación de *Exegol framework* usaremos *virtual box*, lo primero que haremos sera abrir virtual box y agregar una nueva maquina.

Cuando apretemos el botón de nuevo o *new*, se nos abrirá otra ventana donde nos tendremos que dar cierta información básica del sistema operativo a virtualizar, los datos que se mostraran dependerán de cada uno, la configuración es personal. Los datos mas importantes serán: nombre de la maquina, imagen del sistema operativos (*ISO image*). En el caso de la imagen del sistema operativo, tendremos que seleccionarlo con el botón con una flecha hacia abajo y seleccionar la opción de otro (*other*).

Luego de esto nos pedira las especificaciones de la maquina virtual, las especificaciones dependeran del *hardware* de cada uno, como pueden ser la memoria RAM y/o el procesador. En el caso de la memoria RAM esta en *megabits* por lo que si queremos ver cuanto queremos usar en *gigabits* podemos multiplicar la cantidad que queremos usar en *gigabits* por 1024 esto nos dara cuanto vamos a usar en *megabits*.

Después tendremos que especificar el espacio del disco virtual, nuevamente esta especificación depende de cada uno, en este caso usare 50 *gigabits* o *GB*.

Por ultimo se nos mostrara una ventana con un resumen de las especificaciones del sistema operativo que vamos a virtualizar. Cuando terminamos este proceso automaticamente se nos agregara la maquina virtual en nuestro listado de maquinas virtuales.

En este punto podemos iniciar la maquina ya sea dando doble *click* o usando el botón de iniciar (*start*). Cuando la maquina inicie lo primero que veremos sera esta pantalla — seleccionamos la primera opción mediante la tecla "*enter*", luego nos mostrara una pantalla de carga. Cuando el sistema cargue por completo esta sera vista inicial de sistema operativo *Archcraft*.

Cerraremos la pantalla de inicio y apretaremos el botón del logo de *Archcraft* este nos abrirá el buscador de aplicaciones llamado *rofi*, cuando nos abra la aplicación buscaremos la opción para instalar *Archcraft*, en esta nos dara diferentes opciones estas son para instalacion grafica o por mediante la interfaz grafica (*CLI*), en nuestro caso seleccionaremos la primera opcion de instalacion grafica.

En el momento que entremos al instalador podremos ver una ventana parecida a la siguiente, lo unico que tendremos que es instalar siguiendo los pasos que nos van mostrando poco a poco, la instalación es muy parecida al sistema operativo *Debian*.

Para continuar con la instalación, tendremos que tener en cuenta el manejador de ventana para *Archcraft* este viene con 2 opciones por defecto las cuales son: *Openbox* y *BSPWM*, para esta oportunidad usaremos *BSPWM*.

> Tener en cuenta que tenemos que revisar el archivo *sxhld* donde estan todos los *key bindings* para abrir las diferentes herramientas

Una vez terminada la instalacion, no reiniciaremos la maquina virtual si no que la apagaremos, esto lo podremos hacer con el comando

```bash
poweroff
```

Desde la terminal que en este caso contamos con 2 las cuales son: *Alacritty* y *xfce Terminal*.

La razón por la cual vamos a apagar la maquina sera para configurar el arranque de la misma, esto debido a que no hace la eliminación del disco de arranque de forma automática como si lo hace con otros sistemas operativos como puede ser el caso de *Ubuntu* o *Kali Linux*. En caso de que no hagamos este paso la maquina al modo mostrado anteriormente mencionado, conocido como *live*.

Para realizar la configuración seleccionaremos nuestra maquina con un solo *click* y apretaremos en el botón con forma de engranaje.

> Como podemos ver en el apartado de almacenamiento (*Storage*) se nos muestra el disco óptico con el instalador de *Archcraft*, esto es importante porque ahí podemos ver el orden de arranque.

Ya dentro del apartado de configuración nos dirigiremos al almacenamiento (*Storage*) y seleccionaremos el archivo "**.iso**" o el disco de arranque de *Archcraft* para luego eliminarlo con el botón que tiene forma de un disco *floppy* con una cruz roja y lo eliminaremos.

Nos saldrá una advertencia, preguntándonos si estamos seguros de remover dicho disco, aceptaremos la opción de remover y por ultimo haremos click en el botón de "*ok*". Con esto ya tendremos la instalación de *Archcraft* terminada lo que resta es instalar *Exegol framework*.

> Contenido migrado desde https://bl4ckjacks-blog.netlify.app/investigaciones/exegol-archcraft/ — Imágenes originales alojadas en el blog anterior.
