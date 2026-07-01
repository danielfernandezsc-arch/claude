# Ritualist

**Tus webs de cada día, convertidas en pequeños altares. Entra con presencia, no en automático.**

Ritualist es una extensión de Chrome (Manifest V3, sin dependencias) que convierte
los sitios que ya visitas a diario en disparadores de micro-rituales de presencia,
e incluye un modo de **bloques de foco** (estilo Pomodoro) enmarcado por rituales de
entrada y cierre.

Los recordatorios por horario fallan porque la vida no se rige por alarmas. Pero todos
abrimos las mismas webs cada día de forma casi ritual. Ritualist ancla el hábito al
**gesto** (abrir una web) en lugar del **reloj**: el navegador deja de ser donde pierdes
presencia y pasa a ser el campanario que suena cuando entras al templo.

## Qué hace

- **Webs ancla configurables.** Al abrir Gmail, tu banco, LinkedIn, etc., Ritualist
  intercepta el momento con una pantalla breve a pantalla completa: una respiración,
  una intención, una pregunta, un gesto consciente de 30–90 s. Después, paso libre.
- **Biblioteca de rituales.** Secuencias de 1–5 pasos: respiración guiada, intención,
  afirmación, pausa cronometrada, checklist. Crea, edita, duplica, reordena.
- **Anti-fatiga.** Política por web: cada visita · una vez al día · cada N horas ·
  solo la primera del día. Si ya se cumplió, abrir la web no dispara nada.
- **Bloques de foco.** 25/5/15 configurables, con ritual de entrada (respiración +
  intención) y de cierre (pausa + checklist). El anillo descuenta fluido y **sobrevive
  a cerrar el popup**: la verdad del cronómetro vive en el service worker.
- **Gamificación de presencia.** Racha que premia la constancia y **nunca castiga**
  (saltar no rompe la racha), rituales completados, bloques de foco y un mapa de
  presencia de 7 días.
- **Sonido sintetizado en código** (Web Audio): cuenco tibetano al cerrar, tono de
  aliento durante la respiración, click al avanzar. Cero archivos de audio.

## Los tres momentos joya

1. **La respiración guiada** — círculo que respira con una curva orgánica, halo en
   capas, temperatura de color que cambia entre fases, conteo sincronizado.
2. **El anillo del bloque de foco** — progreso SVG con extremos redondeados, glow del
   color de acento, cronómetro mono con dígitos tabulares.
3. **El onboarding como ceremonia** — la primera pantalla no pide configurar nada:
   invita a respirar una vez en vivo antes de tocar ajustes.

## Arquitectura (breve)

- `background.js` — service worker: **única fuente de verdad** del cronómetro
  (`chrome.alarms` + `phaseEndsISO`), de las reglas `declarativeNetRequest` (redirección
  a `ritual.html`/`focus.html`) y de la evaluación de política/cooldown.
- `utils/` — módulos puros y testeables: `storage` (esquema + migraciones), `anchors`
  (disparo), `pomodoro` (máquina de estados), `streak` (rollover + racha), `domains`,
  `rituals`, `sound`, `messages`.
- `tokens.css` — **todos** los design tokens. Ningún valor de color/espaciado/easing
  está hardcodeado fuera de aquí.
- Las UI (`popup`, `ritual`, `focus`, `onboarding`, `options`) solo **renderizan** lo
  que el service worker decide.

## Privacidad

Todo vive en `chrome.storage.local`. No hay servidores, no hay telemetría, no hay red
salvo los favicons de Google y las fuentes de Google Fonts. Exporta/importa tus datos
como JSON desde Ajustes.

## Instalación

Ver [INSTALL.md](INSTALL.md). Se carga como extensión descomprimida; no requiere build.
