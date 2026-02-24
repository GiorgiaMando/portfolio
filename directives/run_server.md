# Direttiva: Avvio Server Locale (serve_local)

**Obiettivo:** Lanciare un server HTTP locale leggero per testare il sito statico senza incorrere in problemi di CORS.

**Input:** 
- Nessun input obbligatorio.
- Definito da `.env` la porta (di default fallback a 8000 se non specificata).

**Strumento da usare:**
`execution/serve_local.py`

**Output:**
- Stampa la porta del server in ascolto e l'URL
- Resta in esecuzione finché non viene terminato dall'utente (Ctrl+C).

**Casi Limite / Errori Comuni:**
- Porta già in uso: Lo script cercherà di stampare l'errore `OSError: [Errno 98] Address already in use`. Nel caso, l'utente dovrà uccidere il processo o cambiare porta.
