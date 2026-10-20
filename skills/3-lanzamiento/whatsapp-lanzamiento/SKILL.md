---
name: "whatsapp-lanzamiento"
description: "Escribe todos los mensajes de la comunidad de WhatsApp de un lanzamiento Shivalink en la voz del creador: vídeo de bienvenida y 14 días para que activen el recordatorio de la clase, el día del webinar, el bono de acción rápida y los 3 días hasta el cierre. Úsala con \"WhatsApp de X\", \"mensajes de WhatsApp de X\" o \"secuencia de WhatsApp de X\"."
---

# WhatsApp del lanzamiento — la sala de dentro

**Analogía.** Instagram es el escaparate; la comunidad de WhatsApp es la sala de dentro. Quien entra ya ha levantado la mano. Aquí no se grita: se habla como un amigo, se despierta la curiosidad y se acompaña hasta la caja. WhatsApp se abre el 85–98 % de las veces: cada mensaje se lee, así que cada mensaje tiene que merecerlo.

> "Todo el mundo persigue el sí. Yo agoto los no." — Jason

**El objetivo de cada etapa (una sola acción por etapa):**

| Etapa | Días | La única acción que pedimos |
|---|---|---|
| Antes de la clase | D−14 → D−1 | **Activar el recordatorio** en `[dominio-del-creador]/clase` |
| Día de la clase | D0 | Entrar en directo y, al abrir el carrito, comprar con el bono del directo |
| Bono de acción rápida | D+1 | Comprar hoy para quedarse el bono (caduca D+1 23:59) |
| Hasta el cierre | D+2 → D+4 | Comprar antes del cierre (D+4 23:59), cada día desde un ángulo distinto |
| Cierre | D+5 | Apuntarse a la lista de espera |

**Cuándo**

| Hito | Día | Quién |
|---|---|---|
| Mensajes, guion del vídeo y audios, con esta skill | D−18 | Dani |
| Aprobados por el creador (casilla en su ficha) | D−16 | Creador |
| Vídeo de bienvenida grabado y en `06` | D−16 | Creador |
| Antes de la clase y D0 programados en SendFlow | D−15 | Ange |
| Audios grabados y en `06` (todos de una vez) | D−12 | Creador |
| Resultado de la encuesta copiado a la ficha | D−8 | Ange |
| D+1 → D+5 programados con el enlace de la página de venta | D−3 | Ange |

**Qué no hace:** no diseña la oferta (`oferta-creador`) ni el webinar (`masterclass-venta`). Aquí se **acompaña** hasta la clase y se **agotan los no** en el carrito.

---

## Antes de todo · Las reglas del juego
Leer con `notion-fetch` la sección "⚙️ Reglas que leen las skills" de **📜 Reglas del juego** (`3f4ee17cdf7e81e1a301ececd78e87c6`). Si algo de esta skill choca con esa página, gana la página. Si no carga, se sigue con esta skill y se avisa a Dani.

## Paso 0 — Leer al creador en Notion (siempre primero)

| Subpágina | Qué se saca |
|---|---|
| 🎙️ **Tono** | Tú o usted, muletillas, cómo llama a su gente, palabras prohibidas, líneas rojas |
| 💎 **Oferta v1 aprobada** | Promesa, método y pilares, avatar, las 5 objeciones, ⏳ los tres cierres, 🛒 mapa del carrito, 🎥 webinar (título, 3 creencias, palabra clave de Flap Class), garantía, precio y plazos |
| 🏗️ **Programa** | Nombre, número de sesiones, fecha de la S01 |
| 🔗 **Enlaces** | `[dominio]/clase`, enlace del directo, página de venta, enlace de Samantha, repetición |
| 🛒 **Modo de compra** | De la oferta: checkout (< 997 €) o llamada con Samantha (≥ 997 €) |
| 🎨 **Marca y diseño** | Plan de stories, si existe: WhatsApp sigue el mismo hilo con otro ángulo |
| **Ficha** | Fecha y hora del D0 en España y LatAm, país principal del público |

Además: casos y testimonios reales (`05`) y frases literales del avatar en las transcripciones.

Si la oferta no está aprobada, se para y se avisa a Dani. Lo que falte se marca `[PENDIENTE: …]`. Nunca se inventan testimonios, cifras ni plazas.

---

## Las reglas del copy (no se rompen)

1. **La regla del uno.** Un mensaje = una idea, un objetivo, una acción. Si pides dos cosas, no hacen ninguna. (Masterson: 91 de las 100 mejores cartas giraban sobre una sola idea.)
2. **Como un amigo, no como una marca.** Si no se lo dirías así a alguien en persona, se reescribe. Se lee en voz alta antes de darlo por bueno.
3. **Las 3 preguntas de Harry Dry** para cada frase importante:
   - ¿Se puede **ver**? ("a las 11 de la noche delante del portátil", no "agotada").
   - ¿Se puede **comprobar**? (cifras, días, nombres; no adjetivos).
   - ¿**Solo lo puede decir este creador**? (su historia, su método, sus casos).
4. **Gancho → cuerpo → acción.** La primera frase hace parar; el cuerpo da una pizca de oro o toca el dolor; la acción lleva contexto y un porqué ("actívalo ahora, que el directo no se repite").
5. **Vende el agujero, no el taladro.** Habla del resultado y de cómo se siente, no de módulos ni horas.
6. **Imágenes mentales.** El lector tiene que verse dentro de la escena: el antes con sus palabras y el después con detalles concretos.
7. **Justifica siempre:** por qué tú, por qué ahora y por qué creerlo.
8. **Escasez solo si es real.** Lo que caduca, caduca a su hora.

## Las reglas de WhatsApp (para no quemar el número)

1. **Comunidad, no grupo:** solo escriben los administradores, caben hasta 2.000 personas, los números de los miembros no se ven y se bloquea menos.
2. **Contexto antes de cada enlace.** Nunca un enlace suelto. El enlace va en su propia línea, al final.
3. **Sin mayúsculas sostenidas, sin urgencia de teletienda** ("ÚLTIMA OPORTUNIDAD", "¡¡compra ya!!") y sin emojis de alarma repetidos (🚨🔥⚠️). Máximo 3 emojis por mensaje.
4. **Formatos mezclados:** vídeo, audio, imagen, encuesta y texto. Nunca 3 días seguidos del mismo formato.
5. **Variar:** no repetir la misma frase ni el mismo enlace con el mismo texto dos días seguidos.
6. **Invitar a responder** con encuestas (en una comunidad los miembros no escriben, pero sí votan).
7. **Ritmo:** 1 mensaje al día antes de la clase. Velocidad de envío **lenta** en SendFlow.
8. **Que guarden el número:** el D−14 se envía la tarjeta de contacto. Ayuda a que los mensajes lleguen.

## El formato (WhatsApp)

| Qué | Cómo se escribe | Para qué |
|---|---|---|
| **Negrita** | `*así*` (un asterisco a cada lado) | La primera frase de cada mensaje y, como mucho, otra frase clave |
| **Cursiva** | `_así_` (un guion bajo a cada lado) | Lo que piensa el avatar (`_¿y si a mí no me funciona?_`), citas y matices |
| Párrafos | 1–3 líneas, con una línea en blanco entre ellos | Que se lea de un vistazo en el móvil |
| Largo | 50–120 palabras; los recordatorios, menos de 40 | WhatsApp no es un email |
| Enlace | En su propia línea, al final, con contexto antes | Clics y menos bloqueos |

Nunca dobles asteriscos, almohadillas ni guiones de lista de markdown: en WhatsApp se ven como símbolos. Negrita y cursiva nunca en la misma frase. Firmado como el creador, nunca como la agencia.

---

## Paso 1 — Cuatro decisiones antes de escribir

1. **El gancho del vídeo de bienvenida:** la frase de dolor con la que abre el creador (sus palabras literales).
2. **El porqué del recordatorio:** la razón real para no perderse el directo (el bono del directo solo para quien esté en vivo, preguntas respondidas en directo…).
3. **La encuesta (D−11):** "¿Qué es lo que más te frena hoy con [tema]?" con 4 opciones sacadas de las 5 objeciones. El resultado alimenta el Acto 1 de la masterclass y el carrito.
4. **El hilo de las 3 creencias:** vehículo, interna y externa. Cada una tiene su día de curiosidad, sin dar el "cómo" (eso es la clase).

---

## Paso 2 — Los mensajes

Horarios en las dos zonas: **España / LatAm**. Se programa a la hora del país principal del público y se cita la otra.

### Etapa 1 · Antes de la clase (D−14 → D−1): que activen el recordatorio
**1 mensaje al día.** Todos terminan con la misma acción, dicha cada vez de forma distinta: **activar el recordatorio en `[dominio]/clase`**. Se alternan dos ejes: **dolor** (que se sientan vistos) y **curiosidad** (un bucle abierto que solo se cierra en la clase).

| Día | Eje | Formato | Qué lleva |
|---|---|---|---|
| D−14 | **Bienvenida** | 🎥 **Vídeo del creador** + texto | "Activa el recordatorio" (guion abajo) · después, tarjeta de contacto: "guarda este número para que te lleguen los avisos" |
| D−13 | Dolor 1 | Texto | Espejo: el día a día del avatar con sus palabras literales (imagen mental) |
| D−12 | Curiosidad 1 | Texto | Creencia de vehículo: "el error que comete casi todo el mundo con [tema]"… sin decir cuál |
| D−11 | **Encuesta** | Encuesta | "¿Qué es lo que más te frena hoy?" (4 opciones) + "en la clase respondo a la más votada" |
| D−10 | Historia | 🎙️ Audio + texto corto | El quiebre del creador en 40 s: día, hora, lugar |
| D−9 | Dolor 2 | Texto | El coste de seguir igual: qué pasa dentro de 6 meses si nada cambia, sin culpa |
| D−8 | Curiosidad 2 | Imagen + texto | Creencia interna: "no es que no seas capaz…" + un dato que se puede comprobar |
| D−7 | Prueba | Captura + texto | Caso real de alguien como el avatar, con cifra `[CASO REAL]` |
| D−6 | Dolor 3 | Texto | "_Lo he intentado todo_": no fallaste tú, falló el enfoque |
| D−5 | Curiosidad 3 | Texto | Creencia externa + los 3 bloques de la clase con nombre (bucle abierto) |
| D−4 | Resultado de la encuesta | Texto | "Ganó [opción]. Esto es lo que te voy a enseñar sobre eso el [día]" |
| D−3 | El porqué del directo | 🎙️ Audio + texto · 📅 evento | El bono del directo: qué es y por qué solo para quien esté en vivo · después, el **evento de WhatsApp** de la clase ("asistiré / no asistiré"): WhatsApp avisa solo antes de empezar |
| D−2 | Agenda | Texto | Fecha, hora en las dos zonas, qué preparar (papel y boli, 90 minutos sin interrupciones) |
| D−1 | Mañana | 🎥 Vídeo corto (20 s) o audio | "Mañana a esta hora…" + último aviso para activar el recordatorio |

**Guion del vídeo de bienvenida (D−14), 30–45 s, grabado con el móvil:**
```
🎥 Vídeo de bienvenida · 30–45 s
Cómo grabarlo: vertical, de cerca, con luz natural y sin leer. Como si se lo dijeras a una amiga.

[0–5 s · gancho]    "[Frase de dolor con sus palabras]."
[5–10 s · quién]    "Soy [nombre] y llevo [X] años ayudando a [avatar] a [resultado]."
[10–25 s · clase]   "El [día] a las [hora] hago una clase en directo donde te enseño [promesa concreta]."
[25–35 s · acción]  "Debajo de este vídeo tienes un enlace. Entra y activa el recordatorio para que no se te pase."
[35–45 s · porqué]  "[Porqué real: el bono del directo / lo que solo pasa en vivo]. Nos vemos dentro."
```
**Texto que acompaña al vídeo:**
```
*[Bienvenida / Bienvenido], [como llama a su gente]. Antes de nada, mira este vídeo.*

El [día] a las [hora España] / [hora LatAm] te espero en directo para enseñarte [promesa].

Para que no se te pase, activa aquí el recordatorio (tardas 10 segundos):
[dominio]/clase
```

### Etapa 2 · Día de la clase (D0): 5 mensajes
| Hora | Mensaje |
|---|---|
| 09:00 | *Hoy es el día*: hora en las dos zonas, enlace del directo y el bono del directo (solo en vivo) |
| −60 min | "En una hora empezamos": prepara papel y boli · enlace |
| −5 min | 🎙️ Audio de 15 s: "Estoy entrando, te espero dentro" · enlace |
| Al abrir el carrito | *El carrito está abierto*: palabra clave + enlace de la página de venta + "el bono del directo es tuyo si entras antes de las 23:59" (con ≥ 997 €: "si reservas tu llamada antes de las 23:59") |
| 22:00 | "Quedan 2 horas para el bono del directo": lo que se pierde a las 00:00 · enlace de la página de venta |

### Etapa 3 · Bono de acción rápida (D+1): 3–5 mensajes
Todo el día gira sobre **un solo motivo para decidir hoy**: el bono de acción rápida, que caduca el **D+1 a las 23:59**.

| Hora | Mensaje |
|---|---|
| 09:00 | La repetición ya está disponible **48 h** (hasta el D+2 a las 23:59) + qué es el bono de acción rápida y hasta cuándo dura |
| 13:00 | El porqué real del bono (por qué solo hoy) + qué consigue quien lo tiene (imagen mental) |
| 18:00 | La pregunta que más se repitió en el directo, respondida + el bono · 🎙️ audio |
| 21:00 *(opcional)* | Quedan 3 horas para el bono: qué se pierde a las 00:00 |
| 23:00 *(opcional)* | "Última hora con el bono": corto, sin dramatismo |

### Etapa 4 · Hasta el cierre (D+2 → D+4): la oferta desde 3 ángulos
Cada día, **un ángulo distinto de la misma oferta** y una objeción del mapa del carrito que se agota:

| Día | Ángulo | Objeción que se agota | Mensajes |
|---|---|---|---|
| D+2 | **El resultado:** "¿funcionará para mí?" | Miedo a que no funcione | 09:00 caso de su mismo perfil `[CASO REAL]` · 18:00 la garantía contada con su porqué + "la repetición se va esta noche a las 23:59" |
| D+3 | **La inversión:** cuánto cuesta de verdad | Dinero y tiempo | 09:00 coste de seguir igual frente a la cuota, plazos · 18:00 cuánto tiempo pide a la semana + lo que hacemos por ti · 🎙️ audio |
| D+4 | **La decisión:** hoy cierra | Indecisión | 09:00 lo que se pierde a las 00:00 · 14:00 los dos caminos (por tu cuenta o conmigo) · 20:00 preguntas frecuentes + cierre por opciones · 23:00 "última hora" |

**Reglas del carrito (D0 → D+4):**
- **Un solo enlace: la página de venta.** Nunca el checkout de Whop directo: así todos pasan por el pop-up (nombre, correo y teléfono) y nadie que duda se nos escapa sin que Carina pueda escribirle.
- **La regla de los 997 € cambia la llamada a la acción:**
  - **< 997 €:** "entra aquí" → página → pop-up → checkout. Una vez al día, la puerta a Samantha: "¿Tienes una duda concreta? Habla 15 minutos con Samantha:" + enlace.
  - **≥ 997 €:** "reserva tu llamada" → página → pop-up → calendario de Samantha. Los bonos se ganan por la hora en que se agenda.
- **Bienvenida al comprador en menos de 1 h:** en cuanto Whop avisa de una compra, Carina le escribe por privado con la plantilla "Bienvenida al comprador" (vídeo del creador, lección 0 de Whop, su bono y la fecha de la S01). Comprar tiene que sentirse como entrar a casa, no como pagar una factura.
- **Quien compra sale de la venta:** cada mañana Ange saca de la comunidad del lanzamiento a los compradores del día anterior y los pasa al grupo de alumnos. Así nadie que ya está dentro recibe mensajes de venta.
- **Sin prueba social en el grupo** en este primer lanzamiento: la hace el creador en sus stories.

**Carritos abandonados (Carina, 1 a 1):** quien deja nombre, correo y teléfono en el pop-up y no compra recibe un mensaje privado de Carina (el cruce lo hace `pagina-venta`). Con ≥ 997 €, quien tuvo llamada y no compró es de Samantha, no de Carina. La skill deja 2 plantillas en la voz del equipo del creador, sin presión:
```
1 · El mismo día
*Hola, [nombre]. Soy Carina, del equipo de [creador].*
Vi que empezaste a inscribirte en [programa] y no terminaste. ¿Te quedó alguna duda? Te ayudo por aquí.

2 · Antes de cada cierre (D+1 y D+4)
*[Nombre], te escribo porque esta noche a las 23:59 [lo que caduca].*
Si quieres, lo resolvemos ahora: [enlace de la página de venta]. Y si tienes una duda concreta, Samantha te atiende 15 minutos: [enlace]
```

### Etapa 5 · Cierre (D+5): 1 mensaje
**10:00 · Gracias:** gracias de verdad, qué viene para los que entraron (S01 el D+7) y **lista de espera** de la próxima edición para los demás. El downsell, si existe, nunca se anuncia aquí. La comunidad se mantiene viva con algún mensaje de valor de vez en cuando: será la primera audiencia del siguiente lanzamiento.

**Total:** unos 31–35 mensajes, 1 vídeo de bienvenida, 1 vídeo corto y 5–6 audios.

---

## Paso 3 — Cómo se entrega cada mensaje

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
D−13 · Dolor 1 · [hora España] / [hora LatAm] · Texto
Objetivo: que se sientan vistos y activen el recordatorio
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*Son las 11 de la noche y otra vez estás mirando el techo.*

Has hecho todo "bien": [lo que ya probó]. Y aun así: _¿por qué sigo igual?_

No es falta de ganas. Es que nadie te ha enseñado [la pieza que falta].

El [día] te lo enseño en directo. Activa el recordatorio aquí:
[dominio]/clase
```
Las notas internas (gancho / cuerpo / acción) son solo para Dani y no se publican.

**Guion de audio:**
```
🎙️ Audio · D[n] · [20–45 s]
Cómo grabarlo: [tono, por ejemplo: caminando, como si se lo contaras a una amiga]
"[Texto en su voz, frases cortas, pausas marcadas con —, máximo 6 frases]"
```
El creador graba vídeos y audios con el móvil, sin editar, y los sube a `06. WhatsApp audios y videos` con el nombre `D[n]_video` o `D[n]_audio`. **Todos los audios de una sentada el D−12** (unos 20 min); el vídeo de bienvenida, el D−16; el vídeo corto del D−1, cuando quiera antes del D−2.

⛔ **Checkpoint:** las 4 decisiones, el guion del vídeo y todos los mensajes se enseñan a Dani en el chat. Sin su OK no se publica nada.

---

## Paso 4 — Comprobación antes de entregar
- [ ] Del D−14 al D−1, todos los mensajes piden activar el recordatorio en `[dominio]/clase`, cada día con otras palabras.
- [ ] Ningún precio ni enlace de pago antes de abrir el carrito en el D0.
- [ ] En el carrito, siempre el enlace de la página de venta (nunca Whop directo) y la llamada a la acción según los 997 €.
- [ ] Cada mensaje tiene una sola idea y una sola acción.
- [ ] Primera frase en `*negrita*`; cursivas con `_guion bajo_`; sin markdown de otro tipo.
- [ ] Sin mayúsculas sostenidas, sin urgencia de teletienda, máximo 3 emojis.
- [ ] Formatos mezclados (nunca 3 días seguidos iguales) y contexto antes de cada enlace.
- [ ] Las 5 objeciones se tocan antes de la clase y se agotan en el carrito.
- [ ] Bono del directo D0 23:59 · bono de acción rápida D+1 23:59 · repetición hasta D+2 23:59 · cierre D+4 23:59, idénticos a la oferta v1 y a Whop.
- [ ] Horarios en las dos zonas.
- [ ] Las frases clave pasan las 3 preguntas (¿se ve? ¿se comprueba? ¿solo lo dice él?).
- [ ] Suena al creador: léelo en voz alta con su voz.

---

## Salidas

**1. Subpágina "💬 WhatsApp" de la ficha** (la ve el creador):
1. **Callout verde** con la casilla "✅ Apruebo los mensajes de WhatsApp".
2. **🗓️ Calendario:** tabla con día, hora España / LatAm, etapa, formato y objetivo.
3. **🎥 Tu vídeo de bienvenida:** guion, cómo grabarlo y fecha límite (D−16).
4. **Toggles por etapa y por día** con cada mensaje listo para copiar.
5. **🎙️ Tus audios:** lista con día, duración, guion y fecha límite.
6. **📊 Lo que votó tu comunidad:** Ange pega el resultado de la encuesta el D−8.

**2. Para Ange (callout gris al final):**
- Crear una **comunidad** (no grupo), conectarla a SendFlow y pasar el enlace enmascarado a Dani para la página de gracias.
- Programar a la hora del país principal, con velocidad de envío lenta.
- Si SendFlow permite mensaje de bienvenida al entrar, poner ahí también el vídeo y el texto del D−14 (para quien entra tarde).
- Sustituir antes de programar: `[dominio]/clase`, enlace del directo, enlace de la página de venta, enlace de Samantha, `[CASO REAL]`.
- El **evento de WhatsApp** (D−3) y la **tarjeta de contacto** (D−14): si SendFlow no permite programarlos, se envían a mano desde el móvil del administrador (1 minuto).
- Del D0 al D+4, cada mañana: sacar de la comunidad a los compradores del día anterior y pasarlos al grupo de alumnos.
- Antes de la clase y D0: el D−15. D+1 → D+5: el D−3.
- Cada mañana: comprobar que salió lo del día anterior.
- **Tracking diario (D−14 → D+5):** miembros de la comunidad en el [Excel de tracking](https://docs.google.com/spreadsheets/d/1gw4WMMv9Rgzj_A3dKzZRBz6kDjNh1kA_QJBCOLN-6oY) (pestaña del creador). Alimenta su dashboard en `shivalink.com/cliente-[creador]` y el parte diario.

**3. Para Carina:** las 2 plantillas de carrito abandonado y la de bienvenida al comprador (menos de 1 h), en el checklist interno.

**4. Tareas en la ficha:** vídeo de bienvenida D−16, aprobación D−16, audios D−12, programación D−15 y D−3, resultado de la encuesta D−8.

## Resumen al terminar
```
💬 WhatsApp de [creador] · D0 [fecha]
🎥 Vídeo de bienvenida ... gancho: "[frase]"
🔔 Recordatorio ......... [dominio]/clase
📊 Encuesta (D−11) ...... [pregunta]
📲 Mensajes ............. [n] · 🎙️ audios [n]
⏳ Cierres .............. D0 bono del directo · D+1 bono de acción rápida · D+2 repetición · D+4 carrito (23:59)
🛒 Carrito ............. página de venta · [checkout / llamada con Samantha]
✅ Aprobación: D−16 · Audios: D−12 · SendFlow: D−15 y D−3
```

## Errores fatales
- Un mensaje que pide dos cosas.
- Un enlace suelto, sin contexto.
- Hablar de precio antes de la clase.
- Copiar las stories en vez de profundizarlas.
- Un carrito que repite "compra ya" en vez de dar un ángulo nuevo cada día.
- Escasez que no se cumple.
- Mayúsculas, alarmas y emojis de teletienda.
- Programar de memoria en vez de copiar de la ficha aprobada.
- Mandar al checkout de Whop directo: quien duda se escapa sin dejar sus datos.

## 🎨 Estándar Notion (todas las páginas)
- **Arriba, un callout de resumen** con lo esencial en 2–3 líneas.
- **Encabezados de color** con emoji (`## 🎯 Título {color="blue"}`).
- **Tablas** para comparar y **toggles** para lo largo: nunca muros de texto.
- **Callouts con propósito:** azul para información, amarillo para entregables o avisos, verde para lo listo y gris para notas.
- Una idea por bloque, frases cortas y sin mayúsculas sostenidas.