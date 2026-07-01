/* messages.js — curated phrases (affirmations + empty states) & pickRandom. */

/** Affirmations / readings. Max 100 chars, no emojis, no Instagram motivation. */
export const AFFIRMATIONS = [
  // — Contemplativo —
  "El momento que tienes delante es el único que existe.",
  "Respirar es lo más honesto que harás en todo el día.",
  "Nada de lo que importa ocurre con prisa.",
  "El silencio también es una respuesta.",
  "Estás aquí. Con eso basta para empezar.",
  "Lo que persigues no cabe en una pestaña más.",
  "Entre estímulo y reacción hay un espacio. Vive ahí un segundo.",
  // — Práctico —
  "Respira una vez antes de abrir el correo. Solo una.",
  "Antes de leer, decide qué venías a hacer.",
  "Una intención clara ahorra media hora de deriva.",
  "Cierra los ojos tres segundos. El mundo espera.",
  "Suelta los hombros. Ya estaban tensos, ¿verdad?",
  "Nombra la única tarea. Las demás pueden esperar turno.",
  "Bebe agua. Tu cerebro te lo agradecerá luego.",
  // — Empático —
  "No pasa nada por llegar disperso. Aquí vuelves a ti.",
  "Si hoy cuesta más, cuesta más. Sigues estando.",
  "No tienes que estar en calma. Solo tienes que notar.",
  "Volver a empezar cuenta como empezar.",
  "El cansancio no te descalifica. Respira con él.",
  "Perderse es humano. Reencontrarse, también.",
  // — Directo —
  "Entras con intención o entras en automático. Elige.",
  "Esa notificación puede esperar sesenta segundos.",
  "Decide tú el tono del día antes de que lo decida la bandeja.",
  "El foco no se encuentra, se protege.",
  "Menos pestañas, más presencia.",
  "Haz una cosa. Termínala. Luego hablamos.",
  // — Humor seco —
  "Hola otra vez. ¿Vienes presente o vienes de paso?",
  "Sí, la bandeja seguirá llena en un minuto. Respira.",
  "El algoritmo puede esperar. Tú, quizá no tanto.",
  "Abrir esto por inercia es un deporte. Hoy no compites.",
  "Enhorabuena, has llegado. Ahora llega de verdad.",
  "Otra vez aquí. Al menos esta vez lo sabes.",
  "El scroll infinito es infinito. Tu atención, no.",
  "Podrías estar en automático. Qué aburrido sería."
];

/** Empty-state lines with personality — no sad voids. */
export const EMPTY_STATES = [
  "Aún no hay altares. Elige tu primera web ancla y empecemos.",
  "Silencio de campanario. Añade una web para que suene.",
  "El mapa está en blanco. Un ritual y aparece la primera barra.",
  "Nada pendiente hoy. Raro y hermoso a la vez.",
  "Tu biblioteca respira despacio. Crea un ritual cuando quieras."
];

/** Pick a pseudo-random element. Optional seed keeps a value stable per key. */
export function pickRandom(list, seed) {
  if (!list || !list.length) return "";
  if (seed === undefined) return list[Math.floor(Math.random() * list.length)];
  let h = 0;
  const s = String(seed);
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return list[h % list.length];
}
