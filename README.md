# Directes en català
 
[Twitch.cat](https://twitch.cat/) - El portal dels directes en català.

### Missió

Ser streamer en català és complicat: Twitch no té interfície en el nostre idioma i és difícil ser descobert. Twitch.cat vol fer més fàcil trobar directes en català, creant una xarxa d’oferta i demanda.

### Estructura

El codi està penjat a un repositori de GitHub. Qualsevol el pot millorar i penjar la seva còpia. El projecte està configurat en un docker compose amb dues parts:

- API: Un contenidor que serveix una API feta en Go.
- Front-end: Un contenidor de la interfície feta amb Next.js i shadcn/ui.

### Funcions

- [x] Consultar canals en directe.
- [x] Mode fosc.
- [x] Opció per obrir el directe també a una instància de [SafeTwitch](https://codeberg.org/SafeTwitch/safetwitch).
- [x] Estadístiques públiques amb Umami.
- [x] Traduir el nom d’algunes categories com ara “Just Chatting” o “Sports”.
- [x] Ocultar etiquetes redundants com serien “Català”, “catalan” o “Catalunya”.
- [x] Filtre per amagar canals incorrectes i apartar els de poca interacció.
- [ ] Possibilitat d'intal·lar com a aplicació-web (PWA).
- [ ] Una part que enllaci a altres serveis que recomanen contingut en català.
- [ ] Una part on descobrir streamers que no estan en directe. Per exemple una llista dels streamers que més creixen.
- [ ] (No sé si és possible) Que es pugui iniciar sessió i importar les subscripcions, de manera que a la part superior apareguin els canals seguits que estan en directe.

### Filtre

- Els canals que no són en català s'amaguen. El filtre fa servir la llista api/llista_eliminats.txt.
- Els canals sense interacció van al final de la pàgina, a la categoria "Altres". La llista es troba a api/llista_altres.txt.

També es pot demanar de filtrar un canal a la pàgina [twitch.cat/informa](https://twitch.cat/informa)

### Contacte

Qualsevol cosa contacteu per Matrix a [@angeldenom:matrix.org](https://matrix.to/#/@angeldenom:matrix.org)