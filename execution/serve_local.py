#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

# Change to the parent directory (portfolio root) so we serve the correct files.
# This script is located in execution/, we want to serve from ../
script_dir = os.path.dirname(os.path.realpath(__file__))
portfolio_root = os.path.dirname(script_dir)
os.chdir(portfolio_root)

# Basic configuration (Fallback if .env logic is not needed right now)
PORT = int(os.environ.get('PORT', 8000))

Handler = http.server.SimpleHTTPRequestHandler

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"🚀 Server in ascolto su: http://localhost:{PORT}")
        print(f"📂 Cartella servita: {portfolio_root}")
        print("Premi Ctrl+C per fermare il server.")
        httpd.serve_forever()
except OSError as e:
    print(f"❌ Errore: {e}")
    sys.exit(1)
except KeyboardInterrupt:
    print("\n🛑 Server fermato.")
    sys.exit(0)
