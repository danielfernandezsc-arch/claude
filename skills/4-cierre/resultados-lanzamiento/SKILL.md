---
name: "resultados-lanzamiento"
description: "Cierra un lanzamiento Shivalink sin reunión: convierte el CSV de ventas de Whop en una página de resultados muy visual en Lovable con el branding del creador, deja el guion del vídeo de Dani y le pide su testimonio. Úsala con \"resultados de X\", \"cierra el lanzamiento de X\" o al pasar el CSV de Whop de un creador."
---

# Resultados y testimonio — el trofeo, no el informe

**Analogía.** Un informe se archiva; un trofeo se enseña. Esta página es el trofeo del creador: la abre, la enseña a su pareja, la comparte en stories. Y quien acaba de levantar el trofeo es quien mejor cuenta lo que vivió: ese es el momento de pedirle su testimonio.

**Sin reunión y sin cuestionario.** El cierre son tres piezas: una página, un vídeo y una petición.

| Hito | Día | Quién |
|---|---|---|
| Exportar el CSV de ventas de Whop y subirlo a su Drive | D+5 | Carina |
| Página de resultados en Lovable (con esta skill) | D+6 | Dani |
| Vídeo al creador + petición de testimonio | D+7 | Dani |
| Testimonio grabado | D+7 → D+10 | Creador |

**Qué no hace:** no calcula la liquidación ni el reparto (paso 46 del checklist interno). Nunca aparecen en la página.

---

## Antes de todo · Las reglas del juego
Leer con `notion-fetch` la sección "⚙️ Reglas que leen las skills" de **📜 Reglas del juego** (`3f4ee17cdf7e81e1a301ececd78e87c6`). Si algo de esta skill choca con esa página, gana la página. Si no carga, se sigue con esta skill y se avisa a Dani.

## Paso 1 — Leer el CSV (lo único obligatorio)
1. Pedir el CSV de Whop si no está en el chat o en el Drive del creador.
2. Leerlo con un script (pandas) y mirar las columnas antes de calcular: importe, estado, fecha, plan, reembolso.
3. Solo cuentan los pagos completados. Los reembolsos se restan y se indica la fecha de corte.
4. Datos opcionales, si están a mano en la ficha (si no, se omiten sin pedirlos): registros, asistentes al directo, miembros de la comunidad.

**Privacidad:** nombres, correos y teléfonos de los compradores **nunca salen del script**. A Lovable solo van cifras agregadas.

## Paso 2 — Los números (todo con script, nunca a ojo)
| Métrica | Cálculo |
|---|---|
| 💰 Facturación | Suma de pagos completados, sin reembolsos |
| 🧑‍🎓 Alumnos | Compradores únicos |
| 🎟️ Ticket medio | Facturación / alumnos |
| 📅 Ventas por día | D0 → D+4 (con la fecha del D0 de la ficha) |
| ⏰ Ventas por hora del D0 | El pico del directo |
| ⚡ Bonos | Ventas antes de D0 23:59 (bono del directo) y antes de D+1 23:59 (bono de acción rápida) |
| 💳 Forma de pago | % pago único · % plazos |
| 🎯 Objetivo | Frente a "🎯 Objetivos y números" de la ficha (10.000 €) |
| 📈 Conversión | Solo si hay registros o asistentes |

Se enseñan a Dani en el chat en una tabla, con 3 frases de lectura ("el 62 % compró en el directo"). Sin su OK no se crea la página.

## Paso 3 — La página en Lovable (muy visual)
- **Proyecto nuevo:** `Resultados · [Creador]` con `create_project`. No se toca su landing. Privada: `noindex` y sin enlaces desde su web.
- **Branding:** colores hex y fuentes del bloque "🎨 Branding" de la ficha. Si no está, se leen de `src/styles.css` de su landing.
- **Estilo:** keynote de Apple. Fondo amplio, cifras gigantes, una idea por pantalla, animaciones suaves al hacer scroll (los números cuentan hacia arriba), móvil primero.
- **Estructura:**
  1. **Portada:** "[Programa] · Primera edición" y la facturación en grande, con su foto.
  2. **4 cifras:** alumnos, facturación, ticket medio, objetivo cumplido (✅ o el porcentaje).
  3. **El latido del carrito:** barras de ventas por día D0 → D+4, con los tres cierres marcados.
  4. **La noche del directo:** línea de ventas por hora del D0.
  5. **Cómo compraron:** donut pago único / plazos.
  6. **Lo que construimos juntos:** landing, comunidad, masterclass, programa y Whop, cada uno con una línea y su enlace.
  7. **Lo que viene:** la siguiente edición o la Fase 2 (si pasó de 10.000 €), con la fecha si ya existe.
  8. **Cierre:** una frase de Dani al creador.
- Cifras redondas, sin reparto, sin datos de compradores, sin mayúsculas sostenidas.
- Los datos van como JSON agregado en el mensaje inicial. Se revisa con la vista previa en móvil antes de compartir.

## Paso 4 — El vídeo de Dani (Loom, 5–8 min)
La skill deja el guion. Dani graba la pantalla recorriendo la página:

| Min | Qué cuenta |
|---|---|
| 0–1 | Gracias, con algo concreto que hizo el creador, y la cifra principal |
| 1–3 | Qué construimos y **por qué**, pieza a pieza |
| 3–5 | Los números: cuándo compraron, qué cierre pesó, cómo pagaron |
| 5–6 | Qué haremos aún mejor en la siguiente edición (2–3 cosas) |
| 6–7 | Lo que viene: siguiente edición o Fase 2 |
| 7–8 | La petición: su testimonio en vídeo y permiso para YouTube |

## Paso 5 — La petición de testimonio
Se pide en caliente, el mismo día del vídeo. Mensaje de WhatsApp (primera frase en negrita):
```
*[Nombre], aquí tienes los resultados de tu lanzamiento.*

Te he grabado un vídeo explicando todo lo que hicimos y por qué:
[enlace del vídeo]

Y aquí tienes tu página de resultados:
[enlace de la página]

Te pido un favor: ¿me grabas un vídeo de 60–90 segundos contando tu experiencia? Con el móvil en vertical vale. Te dejo 4 preguntas para guiarte:
1. ¿Cómo estabas antes de empezar?
2. ¿Qué te hizo decidir hacerlo con nosotros?
3. ¿Qué hicimos juntos?
4. ¿Qué resultado tienes hoy y a quién se lo recomendarías?

Y otra pregunta: ¿nos das permiso para publicar mi vídeo y el tuyo en YouTube como caso de éxito? Si prefieres que no, no pasa nada.
```
Si en 3 días no llega, un recordatorio corto y amable. Un solo recordatorio.

## Paso 6 — Cerrar el círculo
- Ficha del creador → "🏁 Resultados y testimonio": enlace de la página, del vídeo y del testimonio, y el permiso de YouTube (sí / no).
- "🎯 Objetivos y números": la fila "📊 Real".
- Testimonio a `05. Testimonios` del Drive de Shivalink y a `auditoria-creadores/references/casos-exito.md` como caso nuevo (con la cifra real).
- Si da permiso: tarea para Dani con `publicar-video-youtube`.
- Lo que haremos mejor: a la retro del equipo (paso 47) y a la oferta v2.

## Resumen al terminar
```
🏁 Resultados de [creador]
💰 Facturación ...... [€] · [n] alumnos · ticket [€]
🎯 Objetivo ........ [€] → [✅ / x %]
📊 Página ........... [enlace]
🎥 Vídeo ........... [pendiente de grabar / enlace]
🗣️ Testimonio ...... pedido · [fecha]
📺 YouTube ......... [sí / no / pendiente]
```