---
name: "pagina-venta"
description: "Crea en Lovable la página de venta del programa de un creador Shivalink con foco en el bono de acción rápida de 24 h y pop-up de nombre, correo y teléfono antes de Whop; cruza con compradores y deja los carritos abandonados para Carina."
---

# Página de venta — el escaparate que recoge el calor del webinar

**Analogía.** El webinar enciende el fuego; la página de venta es la chimenea que lo mantiene vivo hasta el D+4. Y el pop-up es la libreta en la puerta: quien entra deja su nombre, así que nadie que se acerca al fuego se va sin que lo llamemos.

**Cuándo**

| Hito | Día | Quién |
|---|---|---|
| Página creada y oculta | D−4 | Dani (con esta skill) |
| Aprobación del creador | D−3 | Creador |
| Compra de prueba (con el pop-up) | D−3 | Carina |
| Se publica (en la oferta del webinar) | D0 | Dani |
| Fase del bono de acción rápida | D0 → D+1 23:59 | Automática |
| Cruce de carritos abandonados | D0 → D+4, 2 veces al día | Esta skill + Carina |
| Cierre del carrito | D+4 23:59 | Automática |

**La regla de los 997 € (cambia el botón, no la página):**

| Precio | Qué hace el botón tras el pop-up | Texto del botón del pop-up |
|---|---|---|
| **Menos de 997 €** | Abre el **checkout de Whop** del plan elegido | "Continuar al pago seguro" |
| **997 € o más** | Abre el **calendario de Samantha** para agendar la llamada | "Reservar mi llamada" |

El modo se lee de la oferta ("🛒 Modo de compra") y va en una sola constante del código (`MODO_COMPRA = "checkout" | "llamada"`).

**Qué no hace:** no diseña la oferta (`oferta-creador`) ni crea los planes de Whop (`estructura-producto` / paso 20). Aquí la oferta se **cuenta**, con las mismas cifras.

---

## Antes de todo · Las reglas del juego
Leer con `notion-fetch` la sección "⚙️ Reglas que leen las skills" de **📜 Reglas del juego** (`3f4ee17cdf7e81e1a301ececd78e87c6`). Si algo de esta skill choca con esa página, gana la página. Si no carga, se sigue con esta skill y se avisa a Dani.

## Paso 0 — Leer la ficha (nada se inventa)
- **💎 Oferta v1 aprobada:** promesa, vehículo y pilares, núcleo, bonos con valor, escalera de anclas, garantía, objeciones, los tres cierres y 🎤 La oferta contada.
- **🗓️ Fechas y enlaces:** D0, bono del directo (D0 23:59), **bono de acción rápida (D+1 23:59)**, cierre (D+4 23:59), S01, y los **enlaces de Whop** (pago único y plazos).
- **🎨 Branding:** se trabaja sobre el proyecto de su landing en Lovable.
- **Testimonios reales** de `05. Testimonios` (nombre o inicial, punto de partida y resultado con cifra).
- **🎙️ Tono:** la página habla con su voz.

Si falta la oferta aprobada o los enlaces de Whop, se para y se avisa a Dani. Lo que falte se marca `[PENDIENTE]`.

## Paso 1 — La estructura (móvil primero)
Se escribe palabra por palabra en la voz del creador. Un botón de compra cada 2–3 bloques.

1. **Barra fija arriba:** "🎁 Bono de acción rápida · termina en [cuenta atrás]" + botón.
2. **Hero:** la promesa ("cómo [resultado] en [tiempo] sin [obstáculo]"), foto del creador y botón "Quiero entrar".
3. **El bono de acción rápida, protagonista:** qué es, qué objeción mata, su valor, **por qué solo 24 h** (el porqué real) y la fecha exacta: "hasta el [lunes] a las 23:59 (España) · [hora] (Colombia)". Mientras siga activo el bono del directo (hasta D0 23:59), se muestra encima con su propia cuenta atrás.
4. **Esto es para ti si… / no es para ti si…**
5. **El problema y el enemigo:** el método viejo que ya probaron.
6. **El vehículo:** nombre del método y sus pilares ("esto no es un curso de X, es Y").
7. **El núcleo:** piezas con nombre, cada una con 3 beneficios. "Así es tu semana dentro."
8. **Testimonios reales con cifra** (nunca inventados ni de IA).
9. **Los bonos:** cada uno con nombre, la objeción que mata, su valor y cuándo caduca.
10. **Escalera de anclas:** coste de seguir igual → resultado → 1:1 del creador → alternativas → precio normal → **tu inversión hoy**.
11. **Dos opciones de pago:** pago único y plazos (cuota redonda). Nada más. Con ≥ 997 € se muestran igual, y el botón es "Reservar mi llamada con Samantha": en la llamada se elige la opción.
12. **Garantía** con condición y porqué.
13. **Preguntas frecuentes:** las 8 que siempre salen y las 5 objeciones de la oferta.
14. **Los dos caminos:** solo frente a conmigo, y el botón final.
15. **Pie:** "¿Dudas? Habla 15 minutos con Samantha" (enlace de llamadas). Solo con < 997 €; con ≥ 997 € toda la página ya lleva a ella.

Reglas: cifras idénticas a Whop, slides, WhatsApp y contrato · sin mayúsculas sostenidas · sin promesas que el programa no cumpla · cuenta atrás en la hora de España con la equivalencia de Colombia.

## Paso 2 — Las dos fases de la página (automáticas)
| Fase | Desde → hasta | Qué cambia |
|---|---|---|
| **1 · Bono de acción rápida** | Publicación (D0) → **D+1 23:59** | Barra, hero y sección 3 con el bono y su cuenta atrás. Hasta D0 23:59 también el bono del directo |
| **2 · Precio de lanzamiento** | D+1 23:59 → **D+4 23:59** | El bono desaparece ("desde el martes, sin [bono]") y la cuenta atrás pasa al cierre del carrito |
| **Cerrado** | Después de D+4 23:59 | Los botones se cambian por "Apúntate a la lista de espera de la próxima edición" |

Las fechas se leen de "🗓️ Fechas y enlaces" y van en una sola constante del código para cambiarlas en un sitio.

## Paso 3 — El pop-up antes de pagar (siempre)
Al pulsar cualquier botón de compra se abre un pop-up; **nadie llega a Whop ni al calendario de Samantha sin dejar sus datos**.
- **Campos obligatorios:** nombre, correo y teléfono con prefijo de país (selector España / Colombia / México / Argentina / otro).
- **Casilla obligatoria:** "Acepto la política de privacidad y que me escriban por WhatsApp sobre mi inscripción" (con enlace a la política).
- **Al enviar:** se guarda en la base de datos de Lovable (tabla `checkout_leads`: nombre, correo, teléfono, plan elegido, modo, fecha y hora, UTM) y:
  - **< 997 €:** se abre el enlace de Whop del plan elegido.
  - **≥ 997 €:** se abre el calendario de Samantha con nombre, correo y teléfono ya rellenados.
- Texto del botón: "Continuar al pago seguro" o "Reservar mi llamada". Debajo: "Tus datos solo se usan para tu inscripción".

## Paso 4 — Construirla en Lovable
1. Partir del proyecto de su landing (`remix_project`) para heredar colores, tipografías y fotos. Nombre: `Venta · [Creador]`.
2. `enable_database` y crear la tabla `checkout_leads`.
3. `send_message` con un solo prompt: estructura del Paso 1 con el copy completo, fases del Paso 2, pop-up del Paso 3, enlaces de Whop, `noindex` y ruta `[dominio]/programa`.
4. Revisar con `get_diff` y la vista previa en móvil.
5. **Oculta hasta el D0:** publicada pero sin enlazar en ningún sitio y sin indexar.

## Paso 5 — Pruebas (antes del D−3)
- Cada botón abre el pop-up y, después, el plan correcto de Whop (o el calendario de Samantha si es ≥ 997 €).
- El registro aparece en `checkout_leads` (`query_database`).
- Las cuentas atrás marcan bien en hora de España y de Colombia.
- Cambio de fase: se simula la fecha para ver la fase 2 y la de cerrado.
- Carina hace la compra de prueba con el pop-up y luego se reembolsa.

## Paso 6 — Enlaces en Notion
- **Ficha del creador → "🗓️ Fechas y enlaces":** 💳 Página de venta: `[url]`.
- **Checklist interno, paso 30:** URL, proyecto de Lovable y "pop-up probado ✅".
- A **Ange** para los WhatsApp del carrito y al **creador** para sus stories (enlace en el sticker).

---

## Carritos abandonados (D0 → D+4, a las 10:00 y a las 20:00 de España)
Con "carritos abandonados de X":
1. **Leer** `checkout_leads` del proyecto de Lovable (`query_database`).
2. **Leer los compradores de Whop** del negocio del creador (`payments_list` o `memberships_list`, desde su proyecto de Claude si el conector va por ahí).
3. **Cruzar** por correo y, si no coincide, por teléfono. Con ≥ 997 €, quien agendó pero no compró tras la llamada va a Samantha (seguimiento), no a Carina.
4. **Resultado en Notion** (página interna del lanzamiento, nunca en la ficha del creador): tabla "🛒 Carritos abandonados" con nombre, teléfono, plan que eligió, hora del intento y estado (`pendiente` · `escrito` · `compró`).
5. **Los que compraron** pasan a `compró` y se añaden a la lista de Ange para sacarlos de la comunidad.
6. **Mensaje para Carina,** con la plantilla de carritos abandonados de `whatsapp-lanzamiento` (primera frase en negrita), uno por persona y personalizado con su nombre y el plan.
7. Al terminar: `🛒 [n] intentos · [n] compraron · [n] por escribir`.

Datos personales: solo en la base de datos de Lovable y en la página interna. Nunca en la ficha del creador ni en la memoria.

## Resumen al terminar
```
💳 Página de venta de [creador]
🔗 URL ........... [dominio]/programa (oculta hasta D0)
🎁 Bono 24 h ..... hasta [lunes] 23:59 (España)
🪟 Pop-up ........ nombre · correo · teléfono · privacidad ✅
💾 Base de datos . checkout_leads ✅
🛒 Compra ....... checkout de Whop (< 997 €) / llamada con Samantha (≥ 997 €) ✅
🧪 Pruebas ....... botones · pop-up · fases · compra de prueba
```

## 🎨 Estándar Notion (todas las páginas)
- **Arriba, un callout de resumen** con lo esencial en 2–3 líneas.
- **Encabezados de color** con emoji (`## 🎯 Título {color="blue"}`).
- **Tablas** para comparar y **toggles** para lo largo: nunca muros de texto.
- Una idea por bloque, frases cortas y sin mayúsculas sostenidas.