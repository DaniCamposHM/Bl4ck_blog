---
title: "Exegol Framework — Entorno de hacking portable"
description: "Qué es Exegol Framework, características, requisitos y diferencias frente a Kali y otras distribuciones."
date: 2024-12-06
tags:
  - exegol
  - docker
  - pentesting
  - framework
  - hacking-etico
---

# Exegol Framework

## Qué es?

*Exegol Framework* es un entorno de *hacking*, impulsado por la comunidad, este entorno es poderoso y simple, como para ser usado por cualquier persona.

*Exegol Framework* es la mejor solución para utilizar entorno de *hacking* de forma segura, fácil y profesional, con el objetivo de no ser tan inestable o poco usables como otros sistemas operativos con el mismo objetivo debido a que estos cuentan con una gran falta de herramientas, como *Kali Linux* (en su versión estándar) este siendo mejor para estudiantes y *pentesters juniors*. *Exegol Framework* resuelve las diferentes necesidades de los profesionales en el área del *hacking* ético.

> **Framework**: Un framework es un esquema o marco de trabajo que ofrece una estructura base para elaborar proyectos con objetivos específicos.

## Características

A diferencia de otros sistemas operativos, *Exegol Framework* ofrece la capacidad de ser portable esto debido a que es un *wrapper* para el manejo de contenedores de *Docker*, además de ser compatible con la mayoría de los sistemas operativos, estando disponibles para: *Windows*, *macOS*, y *Linux*. Además de que *Exegol Framework* no requiere del uso de máquinas virtuales para su ejecución o por otro lado ser instalado como sistema operativo principal.

*Exegol Framework* cuenta con diferentes imágenes a la hora de ser instalado estas son: *Full*, *Nightly*, *OSINT*, *Web*.

| Imagen | Descripción |
|--------|-------------|
| *Full* | Esta incluye todas las herramientas compatibles con *Exegol Framework*, esta es la versión **más pesada**. |
| *Nightly* | Esta imagen está pensada para desarrolladores debido a que contiene las ultimas actualizaciones, debido a esto esta versión puede ser **inestable**. |
| *OSINT* | Incluye todas las herramientas para *OSINT*. |
| *Web* | Incluye solo herramientas para *pentesting Web*. |

> **Wrapper:** Es un programa o código empaquetado para poder mejorar la compatibilidad o interoperabilidad.

## Requisitos

- *git* (para el sistema operativo de su preferencia).
- *python3*
- *docker* para *Linux* o *Docker Desktop* para *Windows* o *macOS*
- Por lo menos *100GB* de almacenamiento, el espacio es relativo, esto varía dependiendo de la versión que se elija

Para tener el tutorial completo de la instalación de *Exegol Framework* ver [documentación oficial](https://exegol.readthedocs.io/en/latest/getting-started/install.html)

## Diferencias entre otras distribuciones

- **Portabilidad:** *Exegol* como se mencionaba anteriormente, esta dentro de un contenedor de *Docker* haciendo que este sea portable y sea mas fácil de transportar, ademas de que se pueda usar en la nube a diferencia de otros los cuales si bien pueden estar en la nube son versiones antiguas.
- **Recursos:** Esta parte es relativa depende mucho de la imagen que haya sido instalada, pero teniendo en cuenta que tiene una gran cantidad de herramientas en la imagen *Full* pues no se compara a otros ademas de que los contenedores en *Docker* por lo general no requieren tantos recursos del sistema.
- **Uso:** El uso de *Exegol Framework* en el diario vivir es mucho mas sencillo que otros sistemas operativos, porque en algunos casos el tener un sistema como *Kali Linux* en tu sistema operativo principal se puede sentir como manejar un tractor en una carretera es decir es relativamente molesto porque *Kali Linux* no esta pensado para eso. En cambio con *Exegol Framework* esto se puede evitar debido a que estan separados, por lo que puedes tener tu sistema operativo favorito para tareas domesticas y tu entorno de *hacking* ético por otro lado.

## Consejos

1. Leer bien la documentación de *Exegol Framework*, esto porque en su documentacion hay un paso a paso de como instalarlo con diferentes sistemas operativos.
2. En caso de tener errores al instalar leer bien los errores porque en algunos casos se te dice porque no se esta realizando la instalacion.
3. Tener conocimiento de *Linux* por lo menos tener los cursos de [Linux Fundamentals](https://tryhackme.com/module/linux-fundamentals) dados por *Try Hack Me*.

---

## Referencias

- Exegol Framework: https://exegol.readthedocs.io/en/latest/index.html
- Try Hack Me: https://tryhackme.com
- SniferL4bs: https://sniferl4bs.com

> Contenido migrado desde https://bl4ckjacks-blog.netlify.app/investigaciones/exegol-framework/
