# Giorgia Mandorino – Brand & Design Guidelines

**Vision:** Elevare il web design attraverso il rigore tecnico e la scienza della comunicazione.
**Vibe:** Digital-Artisan, High-End Tech, Architetturale, Sofisticato.

---

## 1. Identità Core

Il design di Giorgia Mandorino non è solo estetica, è ingegneria della comunicazione. Il portfolio deve trasmettere un senso di "ordine superiore" e precisione millimetrica.

**Caratteristiche del Linguaggio Visivo:**
- **Rigore Matematico:** Allineamenti perfetti, uso di griglie visibili o suggerite.
- **Eleganza High-Tech:** Unire la pulizia del design svizzero con la forza del digitale.
- **Innovazione Consapevole:** Micro-interazioni fluide che guidano l'utente senza distrarlo.

---

## 2. Tipografia (The Pairing)

Utilizziamo un contrasto netto tra la geometria moderna dello Space Grotesk e l'immortalità dell'Helvetica.

### Font Primario: Space Grotesk
- **Utilizzo:** Titoli (H1, H2, H3), Grandi numeri, Label dei bottoni.
- **Pesi:** Bold (700) per impatto, Medium (500) per i sottotitoli.
- **Stile:** `letter-spacing: -0.02em` per un look più compatto e "editoriale".
- **Perché:** Rappresenta l'anima innovativa e tecnica del portfolio.

### Font Secondario: Helvetica Now / Inter
- **Utilizzo:** Testi descrittivi, Body copy, Metadati dei progetti.
- **Pesi:** Regular (400), Light (300).
- **Perché:** Garantisce massima leggibilità e un tono neutro, professionale e autorevole.

---

## 3. Palette Colori (Digital Blueprint)

La palette è focalizzata sul contrasto estremo e sulla saturazione del blu per guidare l'occhio.

| Elemento | Colore | HEX | Feedback Visivo |
| :--- | :--- | :--- | :--- |
| **Sfondo** | Obsidian Black | `#080808` | Profondità e focus sui contenuti |
| **Testo Bold** | Pure White | `#FFFFFF` | Massima leggibilità sui titoli |
| **Testo Body** | Silver Mist | `#A0A0A0` | Riduce l'affaticamento visivo |
| **Accento** | Digital Blue | `#0057FF` | Call to action, Hover, Link attivi |
| **Bordi/Linee** | Dark Slate | `#1A1A1A` | Separatori sottili (1px) |

---

## 4. Componenti e UI Logic

Istruzioni per l'AI nella generazione dei componenti:

- **Bordi:** Utilizzare bordi da `1px solid` nel colore `#1A1A1A` per separare le sezioni.
- **Border Radius:** Angoli quasi netti (`2px` o `4px`) per mantenere un look tecnico "da software".
- **Grid:** Layout basato su una `12-column grid`. Favorire la "Bento Grid" per la sezione dei progetti.
- **Effetti:** Hover state del Blu Digitale con transizione `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Spazi:** Utilizzare un sistema di spacing rigoroso basato su multipli di 8 (8px, 16px, 24px, 32px...).

---

## 5. Visione del Codice

Il codice deve essere pulito come il design. 
- Utilizzare **CSS Variables** per i colori e i font.
- Approccio **Mobile-First**.
- Utilizzo di **Framer Motion** (o simili) per animazioni discrete all'entrata delle sezioni (fade-in + slide-up).