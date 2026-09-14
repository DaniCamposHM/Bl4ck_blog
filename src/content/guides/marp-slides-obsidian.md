---
title: "Marp Slides en Obsidian — Presentaciones en Markdown"
description: "Cómo crear presentaciones con Marp Slides dentro de Obsidian: instalación, uso y exportación."
date: 2024-09-02
tags:
  - obsidian
  - marp
  - markdown
  - presentaciones
  - productividad
---

# Marp Slides en Obsidian

## Introducción

*Marp Slides* proviene de las siglas *Markdown Presentation Ecosystem*. Este es un ecosistema para la creación de presentaciones, enfocándose principalmente en el contenido de las mismas, con la diferencia de que se realizan en formato **Markdown**.

## ¿Por qué usar Marp Slides?

Una de las principales razones para usar esta herramienta es su facilidad de uso, ya que utiliza el formato *Markdown* para realizar las presentaciones. Otra razón importante es que *Marp Slides* es de código abierto, por lo que no se necesita una licencia para usarla ni estar conectado a internet para crear presentaciones.

## ¿Cómo usar Marp Slides en Obsidian?

Para poder usar esta herramienta primero tendremos que tener instalado Obsidian la cual se puede descargar del siguiente [enlace](https://obsidian.md/download), cuando ya tengamos instalado obsidian lo primero que veremos una pantalla como la siguiente para crear un nuevo "*vault*" el cual sera nuestro espacio de trabajo.

Ya con nuestro espacio de trabajo lo que haremos es dirigirnos a las configuraciones con el icono de un engranaje o con el comando `ctrl + ,`. Cuando estemos en configuraciones habilitaremos los *community plugins*.

A partir de ese momento lo que haremos es buscar el *plugin* de *Marp Slides* con el botón de *browse* o buscar. Deberíamos tener un resultado como el siguiente, luego lo instalamos y habilitamos.

## Uso de Marp Slides

Para empezar a usar *Marp Slides* lo primero que tenemos que hacer es crear una nueva nota, en la cual tendremos que activar las propiedades mediante el uso de 3 guiones, por lo que tendremos un resultado parecido al siguiente:

```markdown
---
marp: true
---
```

En el apartado de propiedades o *properties* escribiremos: *marp* y luego *True*

Con esta propiedad activada ya podremos empezar a realizar las diferentes presentaciones. Para empezar con las presentaciones empezaremos escribiendo la información que necesitamos en formato *markdown*, para visualizar el resultado de nuestra presentacion tendremos que oprimir el boton de *Marp Slides* el cual se encuentra en la barra izquierda y tiene una forma de rectángulos uno detrás del otro. Donde en el lado derecho tendremos el resultado de nuestra presentacion.

Para agregar otro *slide* pondremos nuevamente 3 guiones

```markdown
---
```

> Nota: Es importante dejar un espacio entre cada *slide*, titulo y texto para que se vea de una mejor forma.

## ¿Cómo exportar?

En la parte derecha donde podemos visualizar el resultado de nuestra presentacion, se nos mostrara los diferentes formatos para exportar siendo: una vista previa, *pptx* (formato de *PowerPoint*), *html*, *pdf* e imagen. Esta presentacion se nos guardara con el mismo nombre de la nota y en el mismo espacio de nuestro *vault* o espacio de trabajo.

> Contenido migrado desde https://bl4ckjacks-blog.netlify.app/obsidian/presentaciones-en-obisdian/ — Imágenes originales alojadas en el blog anterior.
