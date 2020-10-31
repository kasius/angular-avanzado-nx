# Práctica para curso avanzado de Angular

## Requerimientos funcionales

Explorar la información abierta y disponible en el [API del Banco Mundial](https://datahelpdesk.worldbank.org/knowledgebase/articles/898581-api-basic-call-structures).


### Home page

- Ver regiones geográficas continentales:

- A partir de : http://api.worldbank.org/v2/region/?format=json

- Filtrando para ver aquellas que tengan `id` numérico

- Navegar hacia la página de una región: `region/:code`

### Página para una región continental

- Ver los datos básicos del continente y los países pertenecientes.

- A partir de : http://api.worldbank.org/v2/region/ECS/country?per_page=1000&format=json

- Navegar hacia la página de un país: `country/:id`

### Página para un país

- Ver los datos básicos de un país

- A partir de : http://api.worldbank.org/V2/country/ESP?format=json

- Navegar hacia su región continental : `region/:code`

---

## Requerimientos NO funcionales

## Mínimo

- Mono repositorio generado con las herramientas de [Nx.dev](https://nx.dev/angular)

- AL menos una aplicación y una librería

- Testing unitario de al menos un componente y un servicio

- Testing _e2e_ de una página

- Uso de la estrategia de detección de cambios **_OnPush_**.

- Uso del patrón _Container Presenter_.

## Plus

- Almacén centralizado del estado mediante **_NgRx_**.

- Características **_PWA_**

- Traducible

## Extra

- Una landing page _SEO friendly_ generada con **_SSR_** que muestre la lista de continentes.

- Un _**WebComponent**_ con datos de un según su código. `<wbde-country id="ESP"></wbde-country>`

- Una aplicación web estándar (sin Angular) que use el anterior componente.

