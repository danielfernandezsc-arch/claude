# Decisiones de diseño e ingeniería

Notas de lo que decidí, lo que añadí por mi cuenta y por qué. El listón no era “cumple
los requisitos”, sino “alguien hace una captura y la comparte sin que se lo pidan”.

## Autoevaluación de los momentos joya

Capturé y miré de verdad las tres pantallas (renderizadas en Chromium headless sobre
HTTP, con `chrome.*` stubeado, para que los módulos ES cargaran como en la extensión
real). Rúbrica:

| Criterio | Objetivo | Veredicto |
|---|---|---|
| Respiración guiada | hipnótica | **Hipnótica.** Orb con highlight interior desplazado, halo difuso en capas, temperatura de color cálida al inhalar, conteo tabular que respira con la fase, curva `--ease-breath` real. |
| Anillo de foco | elegante | **Elegante.** Stroke SVG grueso con extremos redondeados, glow ámbar, mono tabular grande, intención anclada debajo. Nada “de cocina”. |
| Onboarding | ceremonia | **Ceremonia.** La primera pantalla no pide nada: “Antes de ajustar nada — Respira una vez. En vivo.” La extensión demuestra lo que es antes de pedir trabajo. |
| Coherencia | cero hardcodeados | **Cero.** El 100% del CSS consume `tokens.css`. Los únicos literales fuera son valores estructurales neutros (0, 100%, 2px de hairlines, escalas de `transform`), nunca color/espaciado/easing de marca. |
| Movimiento | nada anima width/top | **Cumplido.** Todo anima `transform`/`opacity`. El anillo anima `stroke-dashoffset` (propiedad correcta para SVG, no layout). |

## Extras añadidos (no estaban en el brief)

- **Easter egg elegante:** un clic en el símbolo de marca del popup emite una única
  campana de cuenco tibetano, una pulsación de respiración del propio símbolo y susurra
  una frase curada en el toast. Discreto, on-theme, se descubre sin instrucciones.
- **Toast de hito celebratorio:** al alcanzar múltiplos de 7 días de racha, la próxima
  apertura del popup muestra una insignia efímera con `pop` de resorte + campana.
- **Tema claro real:** el toggle de tema no es decorativo; `[data-theme="light"]` en
  `tokens.css` redefine la paleta para popup y opciones. Las pantallas inmersivas
  (ritual/foco/onboarding) se quedan oscuras a propósito: son el altar.
- **Números que cuentan hacia arriba** en métricas (racha, rituales, bloques) con
  easing cúbico, nunca saltan.
- **Pre-roll de respiración** en el ritual de entrada de foco: un orbe cálido que
  respira mientras escribes tu intención.
- **`options.html` como página completa** de preferencias, registrada en el manifiesto,
  reutilizando el mismo renderizador de Ajustes del popup (una sola fuente de verdad).
- **Estados vacíos con personalidad** y 34 frases curadas en cinco tonos.

## Decisiones técnicas justificadas

- **El service worker es la única fuente de verdad.** Política, cooldown, reglas DNR y
  el reloj de foco viven ahí. El front solo renderiza. Esto evita desincronización
  (gotcha #6 y #9): el anillo se pinta con `phaseEndsISO - Date.now()`, y el fin exacto
  lo marca `chrome.alarms`. Sobrevive a cierres del popup y a la suspensión del worker.
- **DNR dinámico reflejando la decisión del SW.** En vez de redirigir siempre y evaluar
  la política en la página (lo que causaría un parpadeo), el SW añade/quita las reglas
  según qué anclas *deben* disparar ahora. Si la política ya se cumplió, no hay regla y
  el paso es transparente de verdad. El tick de 1 min reconstruye las reglas (rehabilita
  las diarias tras medianoche y las de cooldown al expirar).
- **Guarda anti-bucle para `cada-visita`:** una política de “cada visita” redirigiría en
  bucle al volver al sitio justo tras el ritual. Añadí un umbral mínimo de 60 s en
  `policyAllows` para romper el bucle sin dejar de disparar en visitas reales. Es el
  detalle que separa “funciona en la demo” de “funciona en la vida”.
- **La racha nunca se rompe a 0.** Modelé la racha como “días de presencia acumulados”:
  un día limpio (completó y no saltó) suma +1; saltar o ausentarse **congela**, no
  resetea. Coherente con “aquí no se pierde nada por fallar, solo se gana por presencia”.
  Verificado con tests: completar y luego saltar el mismo día revierte el avance
  optimista (queda como “día en automático”) pero conserva el mejor histórico.
- **Minutos de foco acumulados por tick de 1 min**, no acreditados al final del bloque.
  Así un bloque abandonado a media fase suma los minutos vividos (presencia real) sin
  penalizar la racha ni inflar el conteo de bloques.
- **Fecha local, no UTC**, en todo rollover y política (gotcha #10): la medianoche del
  usuario coincide con su percepción.
- **`from` leído a mano** en ritual/focus (`indexOf('&from=')`), nunca con
  `URLSearchParams.get`, porque la URL original lleva `&` y `=` (gotcha #3). La
  sustitución DNR usa `\0` con la URL completa capturada por el regex (gotcha #2), y el
  `regexFilter` excluye `chrome-extension://` para no crear bucles (gotcha #8).
- **`min-height: 560px` + modales con scroll** en el popup (gotcha #4) para que los
  botones inferiores nunca se corten.
- **Sin `default_locale`** (gotcha #1): habría exigido `_locales/` y roto la carga.
- **Sin dependencias, sin build.** ES Modules en todos lados. El popup se dividió en
  módulos por pestaña para respetar el límite de 400 LOC/archivo y 50 LOC/función.

## Verificación realizada

- `node --check` sobre los 20 archivos JS: OK.
- Tests de lógica pura (`domains`, `streak`, `pomodoro`, `anchors`): 26/27 (el fallo era
  un test mal escrito que forzaba rollover sin avanzar la fecha; corregido y confirmado).
- Render headless de las 4 pantallas clave: **cero errores de página** tras corregir un
  import equivocado (`resolveRitualId` se importaba de `rituals.js` en vez de
  `anchors.js` — un bug que habría roto el ritual en la extensión real, cazado gracias a
  mirar la pantalla de verdad).
- Verificación visual del icono PNG y de los tres momentos joya.

## Qué no pude verificar aquí

No pude cargar la extensión en un Chrome real en este entorno (headless, sin `chrome://`
extensions). La intercepción `declarativeNetRequest` y las `chrome.alarms`/
`chrome.notifications` siguen exactamente los patrones documentados y sus módulos están
testeados de forma aislada, pero su comportamiento end-to-end debe confirmarse cargando
la carpeta como se indica en INSTALL.md.
