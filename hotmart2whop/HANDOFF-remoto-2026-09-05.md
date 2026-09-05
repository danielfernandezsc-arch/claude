# Lánzate y Maquilla · Hotmart → Whop · handoff (sesión remota, 5 sep 2026)

## Hecho en Whop (cuenta andreanmakeup.com · biz_Q96zSuaHHEbFU4)
- Experiencia Courses: exp_1Qt6DP7uAx282B
- Curso OCULTO creado: **Lánzate y Maquilla** → cors_yV0wRT7QL0ArF (idioma es)
  - chap_xdLAIMQM3rSzJ · Módulo 1 · La base del maquillaje y el kit mínimo
      - lesn_CTQZXR6DsFGDi · placeholder oculto "Clase 1 · pendiente"
  - chap_bg9mVJrOj8wSh · Módulo 2 · Los looks para ganar 10 clientas en tiempo récord
  - chap_qTzThWjBcMDbM · Módulo 4 · Look completo I
  - chap_wzQduDGMTfbSX · Módulo 5 · Look completo II
- Ya existía (creado 11:52 por la sesión local): cors_pykyHSIxDF5lD "Masterclass: Todo Sobre Brochas",
  oculto, 1 lección con vídeo Mux en estado "created". No tocado.

## Bloqueado desde el contenedor remoto
1. Hotmart: la Biblioteca de Vídeos está detrás del login de Andrea en TU Chrome. Aquí no hay sesión.
2. Whop API: course-lessons_update acepta `mux_asset_id`, pero no existe endpoint público para crear el asset Mux
   (subir vídeo). El vídeo se sube desde el panel web de Whop (así se hizo con "Brochas").
3. El plan (lanzate-y-maquilla-plan.md) y HANDOFF.md viven en el scratchpad de la sesión local 0f32aefc…;
   este contenedor no los ve. Los títulos de las 15 clases no están en Notion/Drive ni en la web pública.

## Siguiente paso (sesión local con Chrome)
Por cada una de las 15 clases: descargar de Hotmart → crear lección en el capítulo que toque
(course-lessons_create, lesson_type video) → subir el mp4 desde el panel de Whop (Courses › Lánzate y Maquilla › lección).
Reparto Notion: Módulos 1-2 (semana 1) · Módulos 4-5 (semana 2). Módulos 3 y 6 NO se migran.
