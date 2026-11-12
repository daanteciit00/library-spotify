LIBRARY v2 — biblioteca musical personal

Incluye:
- Login Spotify OAuth 2.0 PKCE (sin Client Secret en el navegador).
- Contadores interactivos para álbumes, EP, sencillos, compilaciones y playlists.
- Clasificación complementaria de MusicBrainz para lanzamientos con tipo ambiguo.
- Ficha interna para álbumes: portada, fecha, duración total, géneros/etiquetas y tracklist.
- Ficha interna para playlists: descripción, propietario, duración y tracklist cuando Spotify permite leer sus elementos.
- Enlaces externos a Spotify y búsqueda de Genius, sin extraer letras ni anotaciones protegidas.
- Sesión por pestaña mediante sessionStorage.

IMPORTANTE PARA DESPLEGAR
Esta versión necesita Netlify Functions para consultar MusicBrainz respetando su User-Agent. No basta con arrastrar solamente index.html: despliega la carpeta completa mediante un repositorio Git conectado a Netlify o mediante Netlify CLI.

Spotify Redirect URI:
https://TU-SITIO.netlify.app/
Debe coincidir exactamente con la URL de producción y también con la URL configurada en Spotify Developer Dashboard.

Scopes solicitados:
user-read-private user-library-read playlist-read-private playlist-read-collaborative

Notas:
- Spotify clasifica el lanzamiento como album/single/compilation; MusicBrainz puede aportar EP y tipos secundarios. Las coincidencias dudosas se dejan sin clasificar.
- MusicBrainz puede no tener todos los lanzamientos o etiquetas; la falta de datos no se rellena inventando géneros.
- Genius se abre como fuente de consulta; no se extraen letras ni anotaciones automáticamente.
- Algunas playlists seguidas pueden no permitir leer sus canciones mediante la API. Las playlists propias/colaborativas son el caso compatible.
