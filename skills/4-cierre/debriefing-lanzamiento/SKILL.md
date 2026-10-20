---
name: "debriefing-lanzamiento"
description: "Cierra un lanzamiento Shivalink: datos de Whop + registros de WhatsApp, página de resultados en Lovable con el branding del creador, guion del vídeo de Dani y permiso de YouTube. Úsala con \"debriefing de X\" o \"resultados del lanzamiento de X\"."
---

# Debriefing del lanzamiento — el informe que el creador quiere enseñar

**Analogía.** Un lanzamiento sin debriefing es un partido sin repetición: se gana o se pierde, pero no se aprende. El debriefing es la sala de vídeo: qué jugada funcionó, cuál no y qué cambiamos para el siguiente partido.

**Cuándo**

| Hito | Día | Quién |
|---|---|---|
| Exportar datos de Whop y registros de WhatsApp | D+5 | Carina |
| Página de resultados en Lovable (con esta skill) | D+6 | Dani |
| Vídeo de debriefing grabado y enviado al creador | D+7 | Dani |
| Llamada de debriefing, decisión de Fase 2 y permiso de YouTube | D+7 | Dani + creador |

**Qué no hace:** no calcula la liquidación ni el reparto (eso es el paso 47 del checklist interno y nunca aparece en la página del creador).

---

## Paso 1 — Reunir los datos (no se inventa nada)

| Fuente | Qué se saca | Cómo |
|---|---|---|
| **Whop** | Ventas, facturación, ticket medio, pago único / plazos / VIP, ventas por día (D0 → D+4), ventas con cada bono, reembolsos | Desde el proyecto de Claude del creador (conector de Whop: `payments_list`, `memberships_list`) o con el CSV que exporta Carina (`exports_create`) |
| **Excel de tracking** | Miembros de la comunidad de WhatsApp día a día (D−14 → D+5) | [Excel de tracking](https://docs.google.com/spreadsheets/d/1gw4WMMv9Rgzj_A3dKzZRBz6kDjNh1kA_QJBCOLN-6oY), pestaña del creador |
| **SendFlow** | Entradas, salidas y clics de la comunidad | Captura o export que pasa Ange |
| **Registros** | Registros en la landing y por palabra clave (Flap Class) | Landing + Flap Class |
| **Webinar** | Asistentes en directo, pico, % que llega a la oferta | Plataforma del directo + revisión del replay (masterclass, Paso 5) |
| **Ficha** | Objetivos, resultado de la encuesta, objeciones más repetidas, qué cerró Samantha, carritos abandonados recuperados por Carina | Notion |

Si falta un dato, se marca `[PENDIENTE]` y se sigue. Los reembolsos se cuentan a fecha del D+5 y se indica.

## Paso 2 — Los números que importan

| Métrica | Cálculo |
|---|---|
| Facturación | Suma de Whop (sin reembolsos) |
| Ventas | Nº de pagos únicos + planes de plazos |
| Ticket medio | Facturación / ventas |
| Registros → comunidad | Miembros de WhatsApp / registros |
| Asistencia en directo | Asistentes / miembros de la comunidad |
| Conversión | Ventas / registros · Ventas / asistentes |
| Dónde se vendió | Ventas el D0 (directo), el D+1 (bono de acción rápida) y del D+2 al D+4 |
| Opción de pago | % único · % plazos · % VIP |
| Objetivo frente a real | Contra "🎯 Objetivos" de la ficha |

Todo se calcula con un script, nunca a ojo.

## Paso 3 — Las conclusiones (máximo 3 de cada)

- **✅ Lo que funcionó** (con su dato).
- **🔧 Lo que mejoramos en la próxima edición** (con su porqué).
- **💎 Para la oferta v2:** qué objeción salió más, qué bono pesó, qué opción de pago eligieron, directo frente a carrito y qué cerró Samantha.
- **🚀 Fase 2:** si la facturación pasa de 10.000 €, propuesta de Fase 2 (12 meses, objetivo 500.000 €) con la fecha de la siguiente edición.

⛔ **Checkpoint:** números y conclusiones se enseñan a Dani en el chat antes de crear la página.

## Paso 4 — La página de resultados en Lovable

Una página que el creador quiera enseñar, con **su branding** (bloque "🎨 Branding" de 🎨 Marca y diseño: colores hex y fuentes).

- **Dónde:** un proyecto nuevo de Lovable `Resultados · [Creador]` (no se toca su landing). Página privada: sin indexar y sin enlaces desde su web.
- **Estructura (de arriba abajo):**
  1. **Portada:** "[Programa] · Primera edición" y la cifra grande de facturación.
  2. **4 números clave:** ventas, registros, asistentes en directo y conversión.
  3. **El viaje en una línea de tiempo:** captación → clase → bono → cierre, con la evolución de la comunidad de WhatsApp (gráfico).
  4. **Dónde se vendió:** ventas por día (gráfico de barras D0 → D+4).
  5. **Lo que hicimos:** las piezas del lanzamiento con su enlace (landing, `/clase`, WhatsApp, masterclass, programa, Whop) y una línea de por qué existe cada una.
  6. **Lo que funcionó y lo que mejoramos.**
  7. **Lo que viene:** Fase 2 y fecha de la siguiente edición.
- **Reglas:** sin reparto ni datos internos, cifras redondas y claras, una idea por bloque, sin mayúsculas sostenidas, legible en el móvil.
- Se crea con `create_project` y un mensaje inicial con los datos, el branding y la estructura. Se revisa con la vista previa antes de compartir.

## Paso 5 — El vídeo de Dani (Loom, 8–12 min)

La skill deja el guion. Dani graba la pantalla recorriendo la página de resultados y cada pieza del lanzamiento:

| Min | Qué cuenta |
|---|---|
| 0–1 | Gracias y la cifra principal |
| 1–4 | Qué hicimos y **por qué**, pieza a pieza: landing, `/clase`, WhatsApp, masterclass, oferta, programa y Whop |
| 4–7 | Los números: dónde se vendió, qué bono pesó, qué objeción salió más |
| 7–9 | Lo que funcionó y lo que mejoramos en la próxima edición |
| 9–11 | Fase 2: la propuesta y la fecha |
| 11–12 | La petición: permiso para compartir el vídeo en YouTube |

**Mensaje para el creador** (WhatsApp, primera frase en negrita):
```
*[Nombre], aquí tienes los resultados de tu lanzamiento.*

Te he grabado un vídeo explicando todo lo que hicimos, por qué, y lo que vamos a mejorar en la siguiente edición:
[enlace del vídeo]

Y aquí tienes tu página de resultados:
[enlace de la página]

Una pregunta: ¿nos das permiso para publicar este vídeo en YouTube como caso de éxito? Si prefieres que no, no pasa nada.
```

## Paso 6 — Cerrar el círculo

- Ficha del creador → "📝 Debriefing": enlaces de la página y del vídeo, las respuestas (objeción, bono, opción de pago, directo frente a carrito, Samantha), el permiso de YouTube y la decisión de Fase 2.
- "🎯 Objetivos y números": la fila "📊 Real".
- Proyecto de Claude del creador: subir el debriefing en `.md` (base de la oferta v2).
- Si da permiso de YouTube: tarea para Dani con la skill `publicar-video-youtube`.

## Resumen al terminar
```
🏁 Debriefing de [creador]
💰 Facturación ...... [€] · [n] ventas · ticket [€]
🎯 Objetivo ........ [€] → [cumplido / no, por X]
📈 Conversión ...... [x %] registros · [x %] asistentes
📊 Página ........... [enlace]
🎥 Vídeo ........... [pendiente de grabar / enlace]
🚀 Fase 2 .......... [sí / no]
```

## 🎨 Estándar Notion (todas las páginas)
- **Arriba, un callout de resumen** con lo esencial en 2–3 líneas.
- **Encabezados de color** con emoji (`## 🎯 Título {color="blue"}`).
- **Tablas** para comparar y **toggles** para lo largo: nunca muros de texto.
- **Callouts con propósito:** azul para información, amarillo para entregables o avisos, verde para lo listo y gris para notas.
- Una idea por bloque, frases cortas y sin mayúsculas sostenidas.