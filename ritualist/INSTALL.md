# Instalar Ritualist

No hay build, ni npm, ni Node. Es una extensión Manifest V3 lista para cargar.

## Cargar como extensión descomprimida

1. Abre Chrome y ve a `chrome://extensions`.
2. Activa el **Modo de desarrollador** (interruptor arriba a la derecha).
3. Pulsa **Cargar descomprimida**.
4. Selecciona la carpeta `ritualist/` (la que contiene `manifest.json`).
5. Fija Ritualist en la barra: icono del puzzle → chincheta junto a “Ritualist”.

Al instalarse se abre una pestaña de **bienvenida** (el onboarding). Vívelo: respira
una vez, elige 1–3 webs ancla y listo.

## Probar en 60 segundos

1. **Vive el onboarding** que se abrió solo: pulsa “Respira conmigo”, deja que el
   círculo te lleve, continúa y elige `gmail.com` como web ancla.
2. Abre el popup (icono en la barra) → pestaña **Webs** → confirma que `gmail.com` está
   en la lista (o añádelo escribiéndolo y pulsando **Añadir**).
3. Abre una pestaña nueva y entra en `https://gmail.com`. Ritualist te embosca con el
   **ritual**: vive la respiración guiada y pulsa “Entrar a gmail.com”.
4. Vuelve al popup → pestaña **Foco** → escribe una intención, elige 25 min y pulsa
   **Empezar bloque de foco**. Verás el **anillo** descontando. Cierra y reabre el popup:
   el tiempo sigue correcto.

## Notas

- La primera vez, algunos favicons pueden tardar un instante en cargar (vienen del
  servicio de Google). Es normal.
- El sonido usa Web Audio; si no oyes nada, revisa que el sonido esté activado en
  **Ajustes** y que la pestaña no esté silenciada por el sistema.
- Los cronómetros de foco usan `chrome.alarms`, cuyo mínimo real es **1 minuto**. Para
  ver el cierre de fase rápido, prueba con un descanso corto o espera al minuto.

## Desinstalar / reiniciar datos

- Ajustes → **Restablecer todo** borra rituales, webs y progreso (con confirmación).
- O elimina la extensión desde `chrome://extensions`.
